/* global Chart, MyCarData, MyCarI18n */

(function () {
  'use strict';

  const DEFAULT_XML = 'm.xml';
  const LANG_STORAGE = 'mycar_lang';

  const typeColors = {
    refuel: '#3b82f6',
    service_record: '#f59e0b',
    bill: '#10b981',
  };

  const TYPE_KEYS = ['refuel', 'service_record', 'bill'];

  /** @type {object | null} */
  let data = null;
  /** @type {object | null} */
  let view = null;
  /** @type {Chart[]} */
  let charts = [];
  /** @type {string} */
  let lang = 'en';
  /** @type {object} */
  let dict = MyCarI18n.LOCALES.en;

  let filterTimer = null;
  let syncingSearch = false;

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

  function showError(msg) {
    const el = document.getElementById('errorBox');
    el.hidden = !msg;
    el.textContent = msg ? t('loadError') + msg : '';
  }

  function updateOfflineBanner() {
    const el = document.getElementById('offlineBanner');
    if (!el) return;
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
    el.hidden = !offline;
    if (offline) {
      el.textContent = t('offline');
    }
  }

  function setLoading(on) {
    document.getElementById('loadingBox').hidden = !on;
    document.getElementById('dashboard').hidden = on || !data;
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    // PWA requires secure context (https or localhost)
    if (!window.isSecureContext) return;

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
        .catch((err) => {
          console.warn('SW registration failed', err);
        });
    });
  }

  function showUpdateToast(reg) {
    let bar = document.getElementById('updateBanner');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'updateBanner';
      bar.className = 'offline-banner update-banner';
      const loading = document.getElementById('loadingBox');
      loading.parentNode.insertBefore(bar, loading);
    }
    bar.hidden = false;
    bar.innerHTML =
      '<span>' +
      escapeHtml(t('updateAvailable')) +
      '</span> <button type="button" class="ghost-btn update-btn" id="updateReloadBtn">' +
      escapeHtml(t('updateReload')) +
      '</button>';
    const btn = document.getElementById('updateReloadBtn');
    btn.addEventListener('click', () => {
      if (reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      window.location.reload();
    });
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

  function getSearchText() {
    return (
      document.getElementById('quickSearch').value.trim() ||
      document.getElementById('filterSearch').value.trim()
    ).toLowerCase();
  }

  function isFiltered() {
    return !!(
      document.getElementById('filterType').value ||
      document.getElementById('filterMonth').value ||
      getSearchText()
    );
  }

  function filterEntries(entries) {
    const typeFilter = document.getElementById('filterType').value;
    const monthFilter = document.getElementById('filterMonth').value;
    const search = getSearchText();

    let rows = entries || [];
    if (typeFilter) rows = rows.filter((r) => r.type === typeFilter);
    if (monthFilter) rows = rows.filter((r) => r.month === monthFilter);
    if (search) {
      rows = rows.filter((r) => {
        const hay = [
          r.description,
          r.note,
          r.type,
          typeLabel(r.type),
          r.car,
          r.garage,
          r.billType,
          r.station,
          r.date,
          r.month,
          r.odometer != null ? String(r.odometer) : '',
          r.cost != null ? String(r.cost) : '',
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(search);
      });
    }
    return rows;
  }

  function rebuildView() {
    if (!data) return;
    const filtered = filterEntries(data.entries);
    view = MyCarData.reaggregate(data, filtered);
  }

  function applyStaticI18n() {
    document.documentElement.lang = dict.code;
    document.getElementById('uiTitle').textContent = t('title');
    document.getElementById('uiSubtitle').textContent = t('subtitle');
    document.getElementById('uiLanguageLabel').textContent = t('language');
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
    document.getElementById('uiEntries').textContent = t('entries');
    document.getElementById('uiFilterType').textContent = t('filterType');
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
    updateOfflineBanner();

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
      fillMonthFilter();
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
              ticks: {
                maxRotation: 60,
                minRotation: 0,
                autoSkip: true,
                maxTicksLimit: 16,
              },
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
    const typeKeys = TYPE_KEYS.filter((k) => (byType[k] || 0) > 0);
    const pieKeys = typeKeys.length ? typeKeys : TYPE_KEYS;

    charts.push(
      new Chart(document.getElementById('chartPie'), {
        type: 'doughnut',
        data: {
          labels: pieKeys.map((k) => typeLabel(k)),
          datasets: [
            {
              data: pieKeys.map((k) => byType[k] || 0),
              backgroundColor: pieKeys.map((k) => typeColors[k] || '#94a3b8'),
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
                  const sum =
                    ctx.dataset.data.reduce((a, b) => a + b, 0) || 1;
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
              pointRadius: fuel.length < 40 ? 2 : 0,
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
              pointRadius: cons.length < 40 ? 2 : 0,
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
  }

  function fillMonthFilter() {
    const sel = document.getElementById('filterMonth');
    const current = sel.value;
    sel.innerHTML = '<option value="">' + escapeHtml(t('all')) + '</option>';
    (data.months || [])
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
    }
  }

  function renderTable() {
    if (!view) return;

    const tbody = document.getElementById('entriesBody');
    const rows = view.entries || [];
    const countEl = document.getElementById('entriesCount');
    countEl.textContent = t('entriesCount', { n: rows.length });

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
        escapeHtml(
          t('tableTruncated', { shown: limit, total: rows.length })
        ) +
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
    initCharts();
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
    if (sourceId === 'quickSearch') {
      filter.value = quick.value;
    } else if (sourceId === 'filterSearch') {
      quick.value = filter.value;
    }
    syncingSearch = false;
  }

  function clearFilters() {
    document.getElementById('filterType').value = '';
    document.getElementById('filterMonth').value = '';
    document.getElementById('filterSearch').value = '';
    document.getElementById('quickSearch').value = '';
    refreshDashboard();
  }

  function applyDashboard(dashboard) {
    data = dashboard;
    showError('');
    setLoading(false);
    fillMonthFilter();
    refreshDashboard();
  }

  async function loadFromUrl(url) {
    setLoading(true);
    showError('');
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(
          t('fileHttpError', { status: res.status, url: url })
        );
      }
      const text = await res.text();
      const name = url.split('/').pop() || url;
      applyDashboard(MyCarData.parseMyCarXml(text, name));
    } catch (err) {
      data = null;
      view = null;
      setLoading(false);
      document.getElementById('dashboard').hidden = true;
      let msg = (err && err.message) || String(err);
      if (location.protocol === 'file:') {
        msg += t('fileProtocolHint');
      }
      showError(msg);
    }
  }

  function loadFromFile(file) {
    setLoading(true);
    showError('');
    const reader = new FileReader();
    reader.onload = () => {
      try {
        applyDashboard(
          MyCarData.parseMyCarXml(String(reader.result || ''), file.name)
        );
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

  function wireUi() {
    ['filterType', 'filterMonth'].forEach((id) => {
      const el = document.getElementById(id);
      el.addEventListener('change', scheduleRefresh);
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
      document.getElementById('filterType').value = btn.getAttribute('data-type') || '';
      scheduleRefresh();
    });

    document.getElementById('langSelect').addEventListener('change', (ev) => {
      setLanguage(ev.target.value);
    });

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
        return;
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
  }

  document.addEventListener('DOMContentLoaded', () => {
    lang = MyCarI18n.detectLang();
    dict = MyCarI18n.LOCALES[lang] || MyCarI18n.LOCALES.en;
    fillLangSelect();
    applyStaticI18n();
    wireUi();

    window.addEventListener('online', updateOfflineBanner);
    window.addEventListener('offline', updateOfflineBanner);
    updateOfflineBanner();
    registerServiceWorker();

    const params = new URLSearchParams(location.search);
    const file = params.get('file');
    // ensure lang is in URL without full reload
    setLanguage(lang, { updateUrl: true });
    loadFromUrl(file || DEFAULT_XML);
  });
})();
