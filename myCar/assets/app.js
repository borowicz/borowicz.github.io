/* global Chart, MyCarData, MyCarI18n */

(function () {
  'use strict';

  const DEFAULT_XML = 'm.xml';
  const LANG_STORAGE = 'mycar_lang';
  const STORE_INDEX = 'mycar_datasets_v1';
  const STORE_XML_PREFIX = 'mycar_xml_';
  const STORE_ACTIVE = 'mycar_active_hash';
  const DATA_CACHE = 'mycar-data-v1';

  const typeColors = {
    refuel: '#3b82f6',
    service_record: '#f59e0b',
    bill: '#10b981',
  };
  const TYPE_KEYS = ['refuel', 'service_record', 'bill'];

  let data = null;
  let view = null;
  let charts = [];
  let lang = 'en';
  let dict = MyCarI18n.LOCALES.en;
  let activeHash = null;
  let rangePreset = 'all';
  let filterTimer = null;
  let syncingSearch = false;
  let statusTimer = null;
  let deferredInstall = null;
  let lastIngestXml = null;
  let lastIngestName = null;

  function t(key, vars) {
    return MyCarI18n.t(dict, key, vars);
  }

  function typeLabel(type) {
    if (type === 'refuel') return t('typeRefuel');
    if (type === 'service_record') return t('typeService');
    if (type === 'bill') return t('typeBill');
    return type;
  }

  function money(n, currency) {
    const cur = currency || (data && data.currency) || 'EUR';
    try {
      return new Intl.NumberFormat(dict.locale, {
        style: 'currency',
        currency: cur,
        maximumFractionDigits: 2,
      }).format(Number(n) || 0);
    } catch {
      return (
        new Intl.NumberFormat(dict.locale, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(Number(n) || 0) +
        ' ' +
        cur
      );
    }
  }

  function num(n, d) {
    return new Intl.NumberFormat(dict.locale, {
      maximumFractionDigits: d,
      minimumFractionDigits: d,
    }).format(Number(n) || 0);
  }

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function byteSize(n) {
    const v = Number(n) || 0;
    if (v < 1024) return v + ' B';
    if (v < 1024 * 1024) return (v / 1024).toFixed(1) + ' KB';
    return (v / (1024 * 1024)).toFixed(2) + ' MB';
  }

  // ── storage ────────────────────────────────────────────────────────

  function readIndex() {
    try {
      const raw = localStorage.getItem(STORE_INDEX);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  function writeIndex(list) {
    localStorage.setItem(STORE_INDEX, JSON.stringify(list));
  }

  function getXmlByHash(hash) {
    try {
      return localStorage.getItem(STORE_XML_PREFIX + hash);
    } catch (_) {
      return null;
    }
  }

  function setActiveHash(hash) {
    activeHash = hash || null;
    try {
      if (hash) localStorage.setItem(STORE_ACTIVE, hash);
      else localStorage.removeItem(STORE_ACTIVE);
    } catch (_) {
      /* ignore */
    }
  }

  function removeOldestDataset(exceptHash) {
    const index = readIndex()
      .slice()
      .sort((a, b) =>
        String(a.lastOpenedAt || a.loadedAt || '').localeCompare(
          String(b.lastOpenedAt || b.loadedAt || '')
        )
      );
    const victim = index.find((x) => x.hash !== exceptHash) || index[0];
    if (!victim) return null;
    try {
      localStorage.removeItem(STORE_XML_PREFIX + victim.hash);
    } catch (_) {
      /* ignore */
    }
    writeIndex(readIndex().filter((x) => x.hash !== victim.hash));
    return victim;
  }

  function persistXml(hash, xmlText, meta) {
    const tryWrite = () => {
      localStorage.setItem(STORE_XML_PREFIX + hash, xmlText);
      let index = readIndex().filter((x) => x.hash !== hash);
      index.unshift(meta);
      while (index.length > 20) {
        const dropped = index.pop();
        try {
          localStorage.removeItem(STORE_XML_PREFIX + dropped.hash);
        } catch (_) {
          /* ignore */
        }
      }
      writeIndex(index);
    };

    try {
      tryWrite();
      return { ok: true };
    } catch (e1) {
      // quota — drop oldest and retry a few times
      let removed = [];
      for (let i = 0; i < 5; i++) {
        const v = removeOldestDataset(hash);
        if (!v) break;
        removed.push(v.source || v.hash.slice(0, 8));
        try {
          tryWrite();
          return { ok: true, removed: removed };
        } catch (_) {
          /* retry */
        }
      }
      return { ok: false, error: e1, removed: removed };
    }
  }

  async function cacheXmlInSw(hash, xmlText, sourceName) {
    if (!('caches' in window)) return;
    try {
      const cache = await caches.open(DATA_CACHE);
      const url = new URL('./cached-data/' + hash + '.xml', location.href).href;
      const res = new Response(xmlText, {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'X-MyCar-Source': sourceName || 'data.xml',
        },
      });
      await cache.put(url, res);
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_XML',
          hash: hash,
          source: sourceName || 'data.xml',
          xml: xmlText,
        });
      }
    } catch (e) {
      console.warn('SW data cache failed', e);
    }
  }

  function datasetLabel(meta) {
    const src = meta.source || 'data.xml';
    const from = meta.periodFrom ? String(meta.periodFrom).slice(0, 10) : '';
    const to = meta.periodTo ? String(meta.periodTo).slice(0, 10) : '';
    const period = from && to ? from + ' → ' + to : from || to || '';
    const loaded = meta.loadedAt ? String(meta.loadedAt).slice(0, 10) : '';
    const car =
      meta.carName && meta.carName !== '—' ? meta.carName + ' · ' : '';
    const n = meta.entryCount != null ? meta.entryCount + ' ' + t('entriesUnit') : '';
    const size = meta.bytes != null ? byteSize(meta.bytes) : '';
    const parts = [car + src];
    if (period) parts.push(period);
    else if (loaded) parts.push(loaded);
    if (n) parts.push(n);
    if (size) parts.push(size);
    return parts.join(' · ');
  }

  function fillSavedSelect() {
    const sel = document.getElementById('savedDataSelect');
    if (!sel) return;
    const list = readIndex()
      .slice()
      .sort((a, b) =>
        String(b.lastOpenedAt || b.loadedAt || '').localeCompare(
          String(a.lastOpenedAt || a.loadedAt || '')
        )
      );
    const current = activeHash || sel.value;
    sel.innerHTML = '';
    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = '—';
    sel.appendChild(empty);
    list.forEach((meta) => {
      const opt = document.createElement('option');
      opt.value = meta.hash;
      opt.textContent = datasetLabel(meta);
      sel.appendChild(opt);
    });
    if (current && Array.from(sel.options).some((o) => o.value === current)) {
      sel.value = current;
    }
    const del = document.getElementById('deleteSavedBtn');
    if (del) del.hidden = !sel.value;
    updateOfflineBanner();
  }

  function showStatus(msg, isError, opts) {
    opts = opts || {};
    const el = document.getElementById('errorBox');
    if (!el) return;
    if (statusTimer) clearTimeout(statusTimer);
    if (!msg) {
      el.hidden = true;
      el.innerHTML = '';
      el.classList.remove('status-ok');
      return;
    }
    el.hidden = false;
    el.classList.toggle('status-ok', !isError);
    el.innerHTML = msg;
    if (opts.autoHide !== false && !isError) {
      statusTimer = setTimeout(() => {
        if (el.classList.contains('status-ok')) {
          el.hidden = true;
          el.innerHTML = '';
          el.classList.remove('status-ok');
        }
      }, opts.timeout || 6000);
    }
  }

  function showError(msg) {
    if (statusTimer) clearTimeout(statusTimer);
    const el = document.getElementById('errorBox');
    el.classList.remove('status-ok');
    el.hidden = !msg;
    el.textContent = msg ? t('loadError') + msg : '';
  }

  function showAlreadySavedToast(hash) {
    const short = hash.slice(0, 12) + '…';
    const html =
      escapeHtml(t('alreadySaved')) +
      ' <code class="hash-code">' +
      escapeHtml(short) +
      '</code> ' +
      '<button type="button" class="linkish" id="toastForceOpen">' +
      escapeHtml(t('openAnyway')) +
      '</button> · ' +
      '<button type="button" class="linkish" id="toastShowHash">' +
      escapeHtml(t('showHash')) +
      '</button>';
    showStatus(html, false, { autoHide: false });
    const force = document.getElementById('toastForceOpen');
    const show = document.getElementById('toastShowHash');
    if (force) {
      force.addEventListener('click', () => {
        if (lastIngestXml != null) {
          ingestXml(lastIngestXml, lastIngestName || 'data.xml', {
            force: true,
          });
        }
      });
    }
    if (show) {
      show.addEventListener('click', () => {
        showStatus(
          escapeHtml(t('fullHash')) + ': <code class="hash-code">' + escapeHtml(hash) + '</code>',
          false,
          { timeout: 10000 }
        );
      });
    }
  }

  async function ingestXml(xmlText, sourceName, opts) {
    opts = opts || {};
    lastIngestXml = xmlText;
    lastIngestName = sourceName;
    const hash = await MyCarData.hashText(xmlText);
    const index = readIndex();
    const existing = index.find((x) => x.hash === hash);
    const dashboard = MyCarData.parseMyCarXml(xmlText, sourceName || 'data.xml');
    const periodFrom = dashboard.summary && dashboard.summary.dateFrom;
    const periodTo = dashboard.summary && dashboard.summary.dateTo;
    const hasPeriod = !!(periodFrom || periodTo);
    const nowIso = new Date().toISOString();
    const bytes = new Blob([xmlText]).size;
    const entryCount = dashboard.summary ? dashboard.summary.entryCount : 0;

    const meta = {
      hash: hash,
      source: sourceName || 'data.xml',
      periodFrom: hasPeriod ? periodFrom : null,
      periodTo: hasPeriod ? periodTo : null,
      loadedAt: existing && existing.loadedAt ? existing.loadedAt : nowIso,
      lastOpenedAt: nowIso,
      carName: (dashboard.summary && dashboard.summary.carName) || '',
      entryCount: entryCount,
      bytes: bytes,
    };

    if (existing && !opts.force) {
      existing.source = meta.source;
      existing.periodFrom = meta.periodFrom || existing.periodFrom;
      existing.periodTo = meta.periodTo || existing.periodTo;
      existing.carName = meta.carName || existing.carName;
      existing.entryCount = entryCount;
      existing.bytes = bytes;
      existing.lastOpenedAt = nowIso;
      if (!existing.loadedAt) existing.loadedAt = nowIso;
      writeIndex(
        index.map((x) => (x.hash === hash ? existing : x))
      );
      if (!getXmlByHash(hash)) {
        const r = persistXml(hash, xmlText, existing);
        if (!r.ok) {
          showStatus(
            escapeHtml(t('quotaFull')) +
              ' <button type="button" class="linkish" id="toastDropOld">' +
              escapeHtml(t('deleteOldest')) +
              '</button>',
            true,
            { autoHide: false }
          );
          wireQuotaButton(hash, xmlText, existing);
        }
      }
      await cacheXmlInSw(hash, xmlText, meta.source);
      setActiveHash(hash);
      applyDashboard(dashboard);
      fillSavedSelect();
      if (!opts.silent) showAlreadySavedToast(hash);
      return { hash: hash, reused: true, dashboard: dashboard };
    }

    if (opts.force && existing) {
      meta.loadedAt = nowIso;
    }

    const result = persistXml(hash, xmlText, meta);
    if (!result.ok) {
      setActiveHash(null);
      applyDashboard(dashboard);
      fillSavedSelect();
      showStatus(
        escapeHtml(t('quotaFull')) +
          (result.removed && result.removed.length
            ? ' (' + escapeHtml(t('removedSets') + ': ' + result.removed.join(', ')) + ')'
            : '') +
          ' <button type="button" class="linkish" id="toastDropOld">' +
          escapeHtml(t('deleteOldest')) +
          '</button>',
        true,
        { autoHide: false }
      );
      wireQuotaButton(hash, xmlText, meta);
      return { hash: hash, reused: false, dashboard: dashboard, storageError: true };
    }

    if (result.removed && result.removed.length && !opts.silent) {
      showStatus(
        escapeHtml(t('savedOk')) +
          ' · ' +
          escapeHtml(t('removedSets') + ': ' + result.removed.join(', ')),
        false
      );
    } else if (!opts.silent) {
      showStatus(escapeHtml(t('savedOk')), false);
    }

    await cacheXmlInSw(hash, xmlText, meta.source);
    setActiveHash(hash);
    applyDashboard(dashboard);
    fillSavedSelect();
    return { hash: hash, reused: false, dashboard: dashboard };
  }

  function wireQuotaButton(hash, xmlText, meta) {
    const btn = document.getElementById('toastDropOld');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const removed = [];
      for (let i = 0; i < 3; i++) {
        const v = removeOldestDataset(hash);
        if (!v) break;
        removed.push(v.source || v.hash.slice(0, 8));
      }
      const r = persistXml(hash, xmlText, meta);
      if (r.ok) {
        await cacheXmlInSw(hash, xmlText, meta.source);
        setActiveHash(hash);
        fillSavedSelect();
        showStatus(
          escapeHtml(t('savedOk')) +
            (removed.length
              ? ' · ' + escapeHtml(t('removedSets') + ': ' + removed.join(', '))
              : ''),
          false
        );
      } else {
        showStatus(escapeHtml(t('quotaFull')), true);
      }
    });
  }

  function loadFromStorage(hash) {
    const xml = getXmlByHash(hash);
    if (!xml) {
      writeIndex(readIndex().filter((x) => x.hash !== hash));
      fillSavedSelect();
      showStatus(t('loadError') + 'missing storage entry', true);
      return false;
    }
    const meta = readIndex().find((x) => x.hash === hash);
    const source = (meta && meta.source) || 'stored.xml';
    try {
      const dashboard = MyCarData.parseMyCarXml(xml, source);
      if (meta) {
        meta.lastOpenedAt = new Date().toISOString();
        meta.entryCount = dashboard.summary.entryCount;
        meta.bytes = new Blob([xml]).size;
        const idx = readIndex();
        const i = idx.findIndex((x) => x.hash === hash);
        if (i >= 0) {
          idx[i] = meta;
          writeIndex(idx);
        }
      }
      setActiveHash(hash);
      applyDashboard(dashboard);
      fillSavedSelect();
      cacheXmlInSw(hash, xml, source);
      showStatus('');
      return true;
    } catch (err) {
      showStatus(t('loadError') + (err.message || String(err)), true);
      return false;
    }
  }

  function deleteActiveSaved() {
    const hash = document.getElementById('savedDataSelect').value || activeHash;
    if (!hash) return;
    const index = readIndex().filter((x) => x.hash !== hash);
    writeIndex(index);
    try {
      localStorage.removeItem(STORE_XML_PREFIX + hash);
    } catch (_) {
      /* ignore */
    }
    if ('caches' in window) {
      caches.open(DATA_CACHE).then((c) => {
        c.delete(new URL('./cached-data/' + hash + '.xml', location.href).href);
      });
    }
    if (activeHash === hash) {
      setActiveHash(null);
      const next = index[0];
      if (next) loadFromStorage(next.hash);
      else {
        data = null;
        view = null;
        document.getElementById('dashboard').hidden = true;
        fillSavedSelect();
        loadFromUrl(DEFAULT_XML);
      }
    } else {
      fillSavedSelect();
    }
  }

  // ── UI helpers ─────────────────────────────────────────────────────

  function updateOfflineBanner() {
    const el = document.getElementById('offlineBanner');
    if (!el) return;
    const n = readIndex().length;
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
    if (offline) {
      el.hidden = false;
      el.textContent = t('offlineBadge', { n: n });
    } else if (n > 0) {
      el.hidden = false;
      el.textContent = t('localSetsBadge', { n: n });
      el.classList.add('info-banner');
    } else {
      el.hidden = true;
      el.classList.remove('info-banner');
    }
  }

  function setLoading(on) {
    document.getElementById('loadingBox').hidden = !on;
    document.getElementById('dashboard').hidden = on || !data;
  }

  function getSearchText() {
    return (
      document.getElementById('quickSearch').value.trim() ||
      document.getElementById('filterSearch').value.trim()
    ).toLowerCase();
  }

  function isFiltered() {
    return !!(
      document.getElementById('filterType').value ||
      (document.getElementById('filterCar') &&
        document.getElementById('filterCar').value) ||
      document.getElementById('filterYear').value ||
      document.getElementById('filterMonth').value ||
      getSearchText() ||
      rangePreset !== 'all'
    );
  }

  function filterEntries(entries) {
    let dateFrom = null;
    let dateTo = null;
    if (rangePreset !== 'all' && data && data.summary) {
      const days =
        rangePreset === '30' ? 30 : rangePreset === '90' ? 90 : rangePreset === '365' ? 365 : 0;
      const bounds = MyCarData.rangeFromDateTo(data.summary.dateTo, days);
      dateFrom = bounds.dateFrom || null;
      dateTo = bounds.dateTo || null;
    }
    return MyCarData.filterEntries(entries, {
      type: document.getElementById('filterType').value || null,
      car:
        document.getElementById('filterCar') &&
        document.getElementById('filterCar').value
          ? document.getElementById('filterCar').value
          : null,
      year: document.getElementById('filterYear').value || null,
      month: document.getElementById('filterMonth').value || null,
      search: getSearchText() || null,
      dateFrom: dateFrom,
      dateTo: dateTo,
    });
  }

  function rebuildView() {
    if (!data) return;
    view = MyCarData.reaggregate(data, filterEntries(data.entries));
  }

  function destroyCharts() {
    charts.forEach((c) => {
      try {
        c.destroy();
      } catch (_) {
        /* ignore */
      }
    });
    charts = [];
  }

  function applyStaticI18n() {
    document.documentElement.lang = dict.code;
    document.getElementById('uiTitle').textContent = t('title');
    document.getElementById('uiSubtitle').textContent = t('subtitle');
    document.getElementById('uiLanguageLabel').textContent = t('language');
    const savedLbl = document.getElementById('uiSavedDataLabel');
    if (savedLbl) savedLbl.textContent = t('savedData');
    const delBtn = document.getElementById('deleteSavedBtn');
    if (delBtn) delBtn.textContent = t('deleteSaved');
    const inst = document.getElementById('installBtn');
    if (inst) inst.textContent = t('installApp');
    document.getElementById('uiChooseXml').textContent = t('chooseXml');
    document.getElementById('reloadDefault').textContent = t('reloadDefault');
    document.getElementById('loadingBox').textContent = t('loading');
    document.getElementById('uiQuickSearchLabel').textContent = t('quickSearch');
    document.getElementById('quickSearch').placeholder = t('quickSearchPh');
    document.getElementById('uiQuickSearchHint').textContent = t('quickSearchHint');
    document.getElementById('clearFilters').textContent = t('clearFilters');
    document.getElementById('uiChartMonthly').textContent = t('chartMonthly');
    document.getElementById('uiChartPie').textContent = t('chartPie');
    document.getElementById('uiChartPrice').textContent = t('chartPrice');
    document.getElementById('uiChartConsumption').textContent = t('chartConsumption');
    setText('uiChartRolling3', t('chartRolling3'));
    setText('uiChartRolling12', t('chartRolling12'));
    setText('uiByGarage', t('byGarage'));
    setText('uiByBillType', t('byBillType'));
    setText('uiThGarage', t('garage'));
    setText('uiThGarageCount', '#');
    setText('uiThGarageCost', t('thCost'));
    setText('uiThBillType', t('thType'));
    setText('uiThBillCount', '#');
    setText('uiThBillCost', t('thCost'));
    document.getElementById('uiEntries').textContent = t('entries');
    document.getElementById('uiFilterType').textContent = t('filterType');
    setText('uiFilterCar', t('filterCar'));
    setText('uiFilterYear', t('filterYear'));
    document.getElementById('uiFilterMonth').textContent = t('filterMonth');
    document.getElementById('uiFilterSearch').textContent = t('filterSearch');
    document.getElementById('filterSearch').placeholder = t('filterSearchPh');
    document.getElementById('uiThDate').textContent = t('thDate');
    document.getElementById('uiThType').textContent = t('thType');
    document.getElementById('uiThOdo').textContent = t('thOdo');
    document.getElementById('uiThDesc').textContent = t('thDesc');
    document.getElementById('uiThCost').textContent = t('thCost');
    document.getElementById('uiThCar').textContent = t('thCar');
    document.getElementById('uiFooter').textContent = t('footer') + ' ';
    const playLink = document.getElementById('footerPlayLink');
    if (playLink) playLink.textContent = t('footerPlay');

    const typeSel = document.getElementById('filterType');
    const typeVal = typeSel.value;
    typeSel.innerHTML =
      '<option value="">' +
      escapeHtml(t('all')) +
      '</option>' +
      '<option value="refuel">' +
      escapeHtml(t('typeRefuel')) +
      '</option>' +
      '<option value="service_record">' +
      escapeHtml(t('typeService')) +
      '</option>' +
      '<option value="bill">' +
      escapeHtml(t('typeBill')) +
      '</option>';
    typeSel.value = typeVal;

    renderQuickTypeChips();
    renderRangeChips();
    fillSavedSelect();
    updateOfflineBanner();
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function fillLangSelect() {
    const sel = document.getElementById('langSelect');
    sel.innerHTML = '';
    MyCarI18n.LANG_META.forEach((item) => {
      const opt = document.createElement('option');
      opt.value = item.code;
      opt.textContent = item.label;
      sel.appendChild(opt);
    });
    sel.value = lang;
  }

  function setLanguage(code, opts) {
    const next = MyCarI18n.LOCALES[code] ? code : 'en';
    lang = next;
    dict = MyCarI18n.LOCALES[lang];
    try {
      localStorage.setItem(LANG_STORAGE, lang);
    } catch (_) {
      /* ignore */
    }
    if (!opts || opts.updateUrl !== false) {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    }
    fillLangSelect();
    applyStaticI18n();
    if (data) {
      fillYearFilter();
      fillMonthFilter();
      fillCarFilter();
      refreshDashboard();
    }
  }

  function renderQuickTypeChips() {
    const root = document.getElementById('quickTypeChips');
    const current = document.getElementById('filterType').value;
    const chips = [
      { value: '', label: t('all') },
      { value: 'refuel', label: t('typeRefuel') },
      { value: 'service_record', label: t('typeService') },
      { value: 'bill', label: t('typeBill') },
    ];
    root.innerHTML = chips
      .map(
        (c) =>
          '<button type="button" class="type-chip' +
          (c.value === current ? ' active' : '') +
          '" data-type="' +
          escapeHtml(c.value) +
          '">' +
          escapeHtml(c.label) +
          '</button>'
      )
      .join('');
  }

  function renderRangeChips() {
    const root = document.getElementById('quickRangeChips');
    if (!root) return;
    const chips = [
      { value: 'all', label: t('rangeAll') },
      { value: '30', label: t('range30') },
      { value: '90', label: t('range90') },
      { value: '365', label: t('range365') },
    ];
    root.innerHTML = chips
      .map(
        (c) =>
          '<button type="button" class="type-chip' +
          (c.value === rangePreset ? ' active' : '') +
          '" data-range="' +
          escapeHtml(c.value) +
          '">' +
          escapeHtml(c.label) +
          '</button>'
      )
      .join('');
  }

  function renderMeta() {
    if (!view) return;
    const s = view.summary;
    const chips = document.getElementById('metaChips');
    const period =
      s.dateFrom && s.dateTo
        ? '<span class="chip">' +
          escapeHtml(t('chipPeriod')) +
          ': <strong>' +
          escapeHtml(String(s.dateFrom).slice(0, 10)) +
          ' → ' +
          escapeHtml(String(s.dateTo).slice(0, 10)) +
          '</strong></span>'
        : '';
    const filteredChip = isFiltered()
      ? '<span class="chip chip-filter">' +
        escapeHtml(t('chipFiltered')) +
        ': <strong>' +
        escapeHtml(t('filteredOn')) +
        '</strong></span>'
      : '';
    const hashChip = activeHash
      ? '<span class="chip">hash: <strong>' +
        escapeHtml(activeHash.slice(0, 10)) +
        '…</strong></span>'
      : '';

    chips.innerHTML =
      '<span class="chip">' +
      escapeHtml(t('chipFile')) +
      ': <strong>' +
      escapeHtml(data.source) +
      '</strong></span>' +
      '<span class="chip">' +
      escapeHtml(t('chipCar')) +
      ': <strong>' +
      escapeHtml(s.carName || '—') +
      '</strong></span>' +
      period +
      '<span class="chip">' +
      escapeHtml(t('chipCurrency')) +
      ': <strong>' +
      escapeHtml(data.currency) +
      '</strong></span>' +
      hashChip +
      filteredChip;

    document.title = t('titleDoc', { car: s.carName || 'myCar' });
    document.getElementById('footerSource').textContent = data.source;
  }

  function renderCards() {
    if (!view) return;
    const s = view.summary;
    const cur = data.currency;
    const root = document.getElementById('cards');
    const items = [
      {
        label: t('cardOps'),
        value: money(s.opsCost, cur),
        hint: t('cardOpsHint'),
      },
      {
        label: t('cardFuel'),
        value: money(s.fuelCost, cur),
        hint: t('cardFuelHint', {
          qty: num(s.fuelQuantity, 1),
          n: s.counts.refuel || 0,
        }),
      },
      {
        label: t('cardService'),
        value: money(s.serviceCost, cur),
        hint: t('cardServiceHint', { n: s.counts.service_record || 0 }),
      },
      {
        label: t('cardBill'),
        value: money(s.billCost, cur),
        hint: t('cardBillHint', { n: s.counts.bill || 0 }),
      },
      {
        label: t('cardKm'),
        value: num(s.kmDriven, 0) + ' km',
        hint: t('cardKmHint', {
          from: num(s.odoMin, 0),
          to: num(s.odoMax, 0),
        }),
      },
      {
        label: t('cardCons'),
        value: s.avgConsumption != null ? num(s.avgConsumption, 2) + ' L' : '—',
        hint: t('cardConsHint'),
      },
      {
        label: t('cardCostKm'),
        value: s.costPerKm != null ? num(s.costPerKm, 3) + ' ' + cur : '—',
        hint: t('cardCostKmHint'),
      },
      {
        label: t('cardPurchase'),
        value: money(s.purchaseCost, cur),
        hint: t('cardPurchaseHint', { total: money(s.totalCost, cur) }),
      },
    ];
    root.innerHTML = items
      .map(
        (c) =>
          '<div class="card"><span class="label">' +
          escapeHtml(c.label) +
          '</span><div class="value">' +
          escapeHtml(c.value) +
          '</div><div class="hint">' +
          escapeHtml(c.hint) +
          '</div></div>'
      )
      .join('');
  }

  function initCharts() {
    destroyCharts();
    if (!view) return;
    if (typeof Chart === 'undefined') {
      showError(t('chartCdnError'));
      return;
    }
    Chart.defaults.font.family =
      'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    Chart.defaults.color = '#64748b';

    const currency = data.currency || 'EUR';
    const months = Object.keys(view.monthly || {});
    const monthly = view.monthly || {};

    charts.push(
      new Chart(document.getElementById('chartMonthly'), {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: typeLabel('refuel'),
              data: months.map((m) => monthly[m].refuel),
              backgroundColor: typeColors.refuel,
              stack: 'cost',
            },
            {
              label: typeLabel('service_record'),
              data: months.map((m) => monthly[m].service_record),
              backgroundColor: typeColors.service_record,
              stack: 'cost',
            },
            {
              label: typeLabel('bill'),
              data: months.map((m) => monthly[m].bill),
              backgroundColor: typeColors.bill,
              stack: 'cost',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                footer: (items) => {
                  const total = items.reduce((sum, i) => sum + i.parsed.y, 0);
                  return t('chartSum') + ': ' + money(total, currency);
                },
                label: (ctx) =>
                  ctx.dataset.label + ': ' + money(ctx.parsed.y, currency),
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: { maxRotation: 60, autoSkip: true, maxTicksLimit: 16 },
            },
            y: {
              stacked: true,
              ticks: { callback: (v) => num(v, 0) },
              title: { display: true, text: currency },
            },
          },
        },
      })
    );

    const byType = view.byType || {};
    const pieKeys = TYPE_KEYS.filter((k) => (byType[k] || 0) > 0);
    const keys = pieKeys.length ? pieKeys : TYPE_KEYS;
    charts.push(
      new Chart(document.getElementById('chartPie'), {
        type: 'doughnut',
        data: {
          labels: keys.map((k) => typeLabel(k)),
          datasets: [
            {
              data: keys.map((k) => byType[k] || 0),
              backgroundColor: keys.map((k) => typeColors[k] || '#94a3b8'),
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const val = ctx.parsed;
                  const sum = ctx.dataset.data.reduce((a, b) => a + b, 0) || 1;
                  return (
                    ctx.label +
                    ': ' +
                    money(val, currency) +
                    ' (' +
                    num((100 * val) / sum, 1) +
                    '%)'
                  );
                },
              },
            },
          },
        },
      })
    );

    const fuel = (view.fuelSeries || []).filter((r) => r.unitPrice != null);
    charts.push(
      new Chart(document.getElementById('chartPrice'), {
        type: 'line',
        data: {
          labels: fuel.map((r) => String(r.date).slice(0, 10)),
          datasets: [
            {
              label: t('chartPriceLabel'),
              data: fuel.map((r) => r.unitPrice),
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              fill: true,
              tension: 0.25,
              pointRadius: 0,
              pointHitRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => money(ctx.parsed.y, currency) + ' / L',
              },
            },
          },
          scales: {
            y: {
              ticks: { callback: (v) => num(v, 2) },
              title: { display: true, text: currency + ' / L' },
            },
          },
        },
      })
    );

    const cons = (view.fuelSeries || []).filter((r) => r.consumption != null);
    charts.push(
      new Chart(document.getElementById('chartConsumption'), {
        type: 'line',
        data: {
          labels: cons.map((r) => String(r.date).slice(0, 10)),
          datasets: [
            {
              label: t('chartConsLabel'),
              data: cons.map((r) => r.consumption),
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              fill: true,
              tension: 0.25,
              pointRadius: 0,
              pointHitRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => num(ctx.parsed.y, 2) + ' L/100 km',
              },
            },
          },
          scales: {
            y: {
              ticks: { callback: (v) => num(v, 1) },
              title: { display: true, text: 'L / 100 km' },
            },
          },
        },
      })
    );

    function lineChart(id, series, color, fill) {
      const el = document.getElementById(id);
      if (!el) return;
      const pts = series || [];
      charts.push(
        new Chart(el, {
          type: 'line',
          data: {
            labels: pts.map((r) => r.month),
            datasets: [
              {
                label: t('chartRollingLabel'),
                data: pts.map((r) => r.totalCost),
                borderColor: color,
                backgroundColor: fill,
                fill: true,
                tension: 0.25,
                pointRadius: 0,
                pointHitRadius: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => money(ctx.parsed.y, currency),
                },
              },
            },
            scales: {
              y: {
                ticks: { callback: (v) => num(v, 0) },
                title: { display: true, text: currency },
              },
            },
          },
        })
      );
    }
    lineChart('chartRolling3', view.rolling3, '#14b8a6', 'rgba(20,184,166,0.12)');
    lineChart('chartRolling12', view.rolling12, '#0ea5e9', 'rgba(14,165,233,0.12)');

    function barGroup(id, rows, color) {
      const el = document.getElementById(id);
      if (!el) return;
      const top = (rows || []).slice(0, 12);
      charts.push(
        new Chart(el, {
          type: 'bar',
          data: {
            labels: top.map((r) => r.name),
            datasets: [
              {
                label: t('thCost'),
                data: top.map((r) => r.cost),
                backgroundColor: color,
              },
            ],
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => money(ctx.parsed.x, currency),
                },
              },
            },
            scales: {
              x: {
                ticks: { callback: (v) => num(v, 0) },
              },
            },
          },
        })
      );
    }
    barGroup('chartGarage', view.byGarage, '#f59e0b');
    barGroup('chartBillType', view.byBillType, '#10b981');
  }

  function renderGroupTable(bodyId, rows) {
    const tbody = document.getElementById(bodyId);
    if (!tbody) return;
    const list = rows || [];
    if (!list.length) {
      tbody.innerHTML =
        '<tr><td colspan="3" class="empty">' +
        escapeHtml(t('emptyResults')) +
        '</td></tr>';
      return;
    }
    tbody.innerHTML = list
      .map(
        (r) =>
          '<tr><td>' +
          escapeHtml(r.name) +
          '</td><td class="num">' +
          r.count +
          '</td><td class="num">' +
          money(r.cost) +
          '</td></tr>'
      )
      .join('');
  }

  function availableYears() {
    const years = new Set();
    (data.months || []).forEach((m) => {
      const y = String(m).slice(0, 4);
      if (/^\d{4}$/.test(y)) years.add(y);
    });
    return Array.from(years).sort().reverse();
  }

  function fillYearFilter() {
    const sel = document.getElementById('filterYear');
    if (!sel || !data) return;
    const current = sel.value;
    sel.innerHTML = '<option value="">' + escapeHtml(t('all')) + '</option>';
    availableYears().forEach((y) => {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      sel.appendChild(opt);
    });
    if (current && Array.from(sel.options).some((o) => o.value === current)) {
      sel.value = current;
    }
  }

  function fillMonthFilter() {
    const sel = document.getElementById('filterMonth');
    if (!sel || !data) return;
    const current = sel.value;
    const yearFilter = document.getElementById('filterYear').value;
    sel.innerHTML = '<option value="">' + escapeHtml(t('all')) + '</option>';
    let months = (data.months || []).slice();
    if (yearFilter) months = months.filter((m) => String(m).startsWith(yearFilter));
    months
      .slice()
      .reverse()
      .forEach((m) => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        sel.appendChild(opt);
      });
    if (current && Array.from(sel.options).some((o) => o.value === current)) {
      sel.value = current;
    } else {
      sel.value = '';
    }
  }

  function fillCarFilter() {
    const wrap = document.getElementById('filterCarWrap');
    const sel = document.getElementById('filterCar');
    if (!sel || !data) return;
    const cars = data.cars || [];
    if (cars.length <= 1) {
      if (wrap) wrap.hidden = true;
      sel.value = '';
      return;
    }
    if (wrap) wrap.hidden = false;
    const current = sel.value;
    sel.innerHTML = '<option value="">' + escapeHtml(t('all')) + '</option>';
    cars.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    });
    if (current && Array.from(sel.options).some((o) => o.value === current)) {
      sel.value = current;
    }
  }

  function renderTable() {
    if (!view) return;
    const tbody = document.getElementById('entriesBody');
    const rows = view.entries || [];
    document.getElementById('entriesCount').textContent = t('entriesCount', {
      n: rows.length,
    });
    if (!rows.length) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="empty">' +
        escapeHtml(t('emptyResults')) +
        '</td></tr>';
      return;
    }
    const frag = document.createDocumentFragment();
    const limit = 500;
    rows.slice(0, limit).forEach((r) => {
      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td class="mono">' +
        escapeHtml(r.date) +
        '</td>' +
        '<td><span class="badge badge-' +
        escapeHtml(r.type) +
        '">' +
        escapeHtml(typeLabel(r.type)) +
        '</span></td>' +
        '<td class="num">' +
        (r.odometer ? num(r.odometer, 0) + ' km' : '—') +
        '</td>' +
        '<td>' +
        escapeHtml(r.description || '—') +
        (r.note && r.note !== r.description
          ? '<div class="muted small">' + escapeHtml(r.note) + '</div>'
          : '') +
        '</td>' +
        '<td class="num">' +
        money(r.cost) +
        '</td>' +
        '<td class="muted">' +
        escapeHtml(r.car || '') +
        '</td>';
      frag.appendChild(tr);
    });
    tbody.innerHTML = '';
    tbody.appendChild(frag);
    if (rows.length > limit) {
      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td colspan="6" class="muted small">' +
        escapeHtml(t('tableTruncated', { shown: limit, total: rows.length })) +
        '</td>';
      tbody.appendChild(tr);
    }
  }

  function refreshDashboard() {
    if (!data) return;
    rebuildView();
    renderMeta();
    renderCards();
    renderQuickTypeChips();
    renderRangeChips();
    initCharts();
    renderGroupTable('garageBody', view.byGarage);
    renderGroupTable('billTypeBody', view.byBillType);
    renderTable();
  }

  function scheduleRefresh() {
    if (filterTimer) clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      filterTimer = null;
      refreshDashboard();
    }, 120);
  }

  function syncSearchInputs(sourceId) {
    if (syncingSearch) return;
    syncingSearch = true;
    const quick = document.getElementById('quickSearch');
    const filter = document.getElementById('filterSearch');
    if (sourceId === 'quickSearch') filter.value = quick.value;
    else if (sourceId === 'filterSearch') quick.value = filter.value;
    syncingSearch = false;
  }

  function clearFilters() {
    document.getElementById('filterType').value = '';
    const car = document.getElementById('filterCar');
    if (car) car.value = '';
    document.getElementById('filterYear').value = '';
    document.getElementById('filterMonth').value = '';
    document.getElementById('filterSearch').value = '';
    document.getElementById('quickSearch').value = '';
    rangePreset = 'all';
    fillMonthFilter();
    renderRangeChips();
    refreshDashboard();
  }

  function applyDashboard(dashboard) {
    data = dashboard;
    setLoading(false);
    fillYearFilter();
    fillMonthFilter();
    fillCarFilter();
    refreshDashboard();
  }

  async function loadFromUrl(url) {
    setLoading(true);
    showError('');
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(t('fileHttpError', { status: res.status, url: url }));
      }
      const text = await res.text();
      const name = url.split('/').pop() || url;
      await ingestXml(text, name, { silent: url === DEFAULT_XML });
    } catch (err) {
      data = null;
      view = null;
      setLoading(false);
      document.getElementById('dashboard').hidden = true;
      let msg = (err && err.message) || String(err);
      if (location.protocol === 'file:') msg += t('fileProtocolHint');
      showError(msg);
    }
  }

  function loadFromFile(file) {
    setLoading(true);
    showError('');
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await ingestXml(String(reader.result || ''), file.name);
      } catch (err) {
        data = null;
        view = null;
        setLoading(false);
        document.getElementById('dashboard').hidden = true;
        showError(err.message || String(err));
      }
    };
    reader.onerror = () => {
      setLoading(false);
      showError(t('fileReadError'));
    };
    reader.readAsText(file, 'UTF-8');
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .then((reg) => {
          reg.addEventListener('updatefound', () => {
            const worker = reg.installing;
            if (!worker) return;
            worker.addEventListener('statechange', () => {
              if (
                worker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                showUpdateToast(reg);
              }
            });
          });
        })
        .catch((err) => console.warn('SW registration failed', err));
    });
  }

  function showUpdateToast(reg) {
    let bar = document.getElementById('updateBanner');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'updateBanner';
      bar.className = 'offline-banner update-banner';
      document
        .getElementById('loadingBox')
        .parentNode.insertBefore(bar, document.getElementById('loadingBox'));
    }
    bar.hidden = false;
    bar.innerHTML =
      '<span>' +
      escapeHtml(t('updateAvailable')) +
      '</span> <button type="button" class="ghost-btn update-btn" id="updateReloadBtn">' +
      escapeHtml(t('updateReload')) +
      '</button>';
    document.getElementById('updateReloadBtn').addEventListener('click', () => {
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    });
  }

  function wireInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstall = e;
      const btn = document.getElementById('installBtn');
      if (btn) btn.hidden = false;
    });
    window.addEventListener('appinstalled', () => {
      deferredInstall = null;
      const btn = document.getElementById('installBtn');
      if (btn) btn.hidden = true;
    });
    const btn = document.getElementById('installBtn');
    if (btn) {
      btn.addEventListener('click', async () => {
        if (!deferredInstall) return;
        deferredInstall.prompt();
        try {
          await deferredInstall.userChoice;
        } catch (_) {
          /* ignore */
        }
        deferredInstall = null;
        btn.hidden = true;
      });
    }
  }

  function wireUi() {
    ['filterType', 'filterMonth', 'filterCar'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', scheduleRefresh);
    });
    document.getElementById('filterYear').addEventListener('change', () => {
      fillMonthFilter();
      scheduleRefresh();
    });
    document.getElementById('filterSearch').addEventListener('input', (ev) => {
      syncSearchInputs(ev.target.id);
      scheduleRefresh();
    });
    document.getElementById('quickSearch').addEventListener('input', (ev) => {
      syncSearchInputs(ev.target.id);
      scheduleRefresh();
    });
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    document.getElementById('quickTypeChips').addEventListener('click', (ev) => {
      const btn = ev.target.closest('[data-type]');
      if (!btn) return;
      document.getElementById('filterType').value =
        btn.getAttribute('data-type') || '';
      scheduleRefresh();
    });
    const rangeRoot = document.getElementById('quickRangeChips');
    if (rangeRoot) {
      rangeRoot.addEventListener('click', (ev) => {
        const btn = ev.target.closest('[data-range]');
        if (!btn) return;
        rangePreset = btn.getAttribute('data-range') || 'all';
        renderRangeChips();
        scheduleRefresh();
      });
    }
    document.getElementById('langSelect').addEventListener('change', (ev) => {
      setLanguage(ev.target.value);
    });
    document.getElementById('savedDataSelect').addEventListener('change', (ev) => {
      const hash = ev.target.value;
      const del = document.getElementById('deleteSavedBtn');
      if (del) del.hidden = !hash;
      if (!hash) return;
      if (hash === activeHash && data) return;
      setLoading(true);
      loadFromStorage(hash);
      setLoading(false);
    });
    document.getElementById('deleteSavedBtn').addEventListener('click', deleteActiveSaved);
    document.getElementById('fileInput').addEventListener('change', (ev) => {
      const file = ev.target.files && ev.target.files[0];
      if (file) loadFromFile(file);
    });
    document.getElementById('reloadDefault').addEventListener('click', () => {
      document.getElementById('fileInput').value = '';
      loadFromUrl(DEFAULT_XML);
    });
    document.addEventListener('keydown', (ev) => {
      const tag = (ev.target && ev.target.tagName) || '';
      const typing =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        (ev.target && ev.target.isContentEditable);
      if (ev.key === '/' && !typing && !ev.metaKey && !ev.ctrlKey && !ev.altKey) {
        ev.preventDefault();
        const qs = document.getElementById('quickSearch');
        qs.focus();
        qs.select();
      }
      if (ev.key === 'Escape') {
        const qs = document.getElementById('quickSearch');
        const fs = document.getElementById('filterSearch');
        if (document.activeElement === qs || document.activeElement === fs) {
          if (qs.value || fs.value) {
            qs.value = '';
            fs.value = '';
            scheduleRefresh();
          } else {
            qs.blur();
            fs.blur();
          }
          ev.preventDefault();
        }
      }
    });
    window.addEventListener('online', updateOfflineBanner);
    window.addEventListener('offline', updateOfflineBanner);
  }

  document.addEventListener('DOMContentLoaded', () => {
    lang = MyCarI18n.detectLang();
    dict = MyCarI18n.LOCALES[lang] || MyCarI18n.LOCALES.en;
    fillLangSelect();
    applyStaticI18n();
    wireUi();
    wireInstallPrompt();
    registerServiceWorker();
    updateOfflineBanner();

    const params = new URLSearchParams(location.search);
    const file = params.get('file');
    setLanguage(lang, { updateUrl: true });
    fillSavedSelect();

    if (file) {
      loadFromUrl(file);
      return;
    }

    let lastHash = null;
    try {
      lastHash = localStorage.getItem(STORE_ACTIVE);
    } catch (_) {
      lastHash = null;
    }
    if (lastHash && getXmlByHash(lastHash)) {
      setLoading(true);
      if (!loadFromStorage(lastHash)) loadFromUrl(DEFAULT_XML);
      else setLoading(false);
      return;
    }
    const index = readIndex();
    if (index.length && getXmlByHash(index[0].hash)) {
      setLoading(true);
      if (!loadFromStorage(index[0].hash)) loadFromUrl(DEFAULT_XML);
      else setLoading(false);
      return;
    }
    loadFromUrl(DEFAULT_XML);
  });
})();
