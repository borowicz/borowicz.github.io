/**
 * myCar XML parser + analytics (browser).
 * Mirrors the PHP MyCarData logic for pure client-side use.
 */
(function (global) {
  'use strict';

  function text(el, name) {
    if (!el) return '';
    const node = el.getElementsByTagName(name)[0];
    return node ? (node.textContent || '').trim() : '';
  }

  function toFloat(value) {
    if (value == null || value === '') return 0;
    return parseFloat(String(value).replace(',', '.')) || 0;
  }

  function fmtNum(n, decimals) {
    return Number(n).toFixed(decimals);
  }

  function uniqueTimestamp(dateStr, bucket) {
    // Normalize "YYYY-MM-DD HH:mm" → ISO-like for Date.parse
    let normalized = String(dateStr || '').trim().replace(' ', 'T');
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(normalized)) {
      normalized += ':00';
    }
    let ts = Date.parse(normalized);
    if (Number.isNaN(ts)) {
      ts = Date.parse(dateStr);
    }
    if (Number.isNaN(ts)) {
      ts = Date.now();
    }
    // second precision (same idea as PHP strtotime)
    ts = Math.floor(ts / 1000);
    while (bucket[ts] != null) {
      ts += 1;
    }
    return ts;
  }

  function childrenNamed(root, name) {
    return Array.from(root.getElementsByTagName(name)).filter(
      (n) => n.parentNode === root
    );
  }

  /**
   * @param {string} xmlText
   * @param {string} [sourceName]
   */
  function parseMyCarXml(xmlText, sourceName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');
    const parseError = doc.getElementsByTagName('parsererror')[0];
    if (parseError) {
      throw new Error(
        'Nieprawidłowy XML: ' + (parseError.textContent || '').slice(0, 200)
      );
    }

    const root = doc.documentElement;
    if (!root || root.tagName.toLowerCase() !== 'mycar') {
      // still allow if structure is similar
    }

    const preferences = {};
    const prefsNode = childrenNamed(root, 'preferences')[0];
    if (prefsNode) {
      Array.from(prefsNode.children).forEach((child) => {
        preferences[child.tagName] = (child.textContent || '').trim();
      });
    }

    let currency = preferences.prefsCurrency || 'EUR';

    const carNode = childrenNamed(root, 'car')[0];
    const car = {
      name: carNode ? text(carNode, 'name') : '',
      price: carNode ? toFloat(text(carNode, 'price')) : 0,
      initialCost: carNode ? toFloat(text(carNode, 'initial_cost')) : 0,
      tankSize: carNode ? toFloat(text(carNode, 'tank_size')) : 0,
      year: carNode ? text(carNode, 'year') : '',
    };

    /** @type {Record<number, object>} */
    const bucket = {};

    childrenNamed(root, 'refuel').forEach((node) => {
      const date = text(node, 'refuelDate');
      const ts = uniqueTimestamp(date, bucket);
      const qty = toFloat(text(node, 'quantity'));
      const price = toFloat(text(node, 'price'));
      const odo = toFloat(text(node, 'distance'));
      const cost = Math.round(qty * price * 100) / 100;

      bucket[ts] = {
        id: ts,
        type: 'refuel',
        date,
        month: date.slice(0, 7),
        car: text(node, 'car_name') || car.name || '',
        odometer: odo,
        cost,
        quantity: qty,
        unitPrice: price,
        description: fmtNum(qty, 2) + ' L × ' + fmtNum(price, 3),
        note: text(node, 'note'),
        fuelType: text(node, 'fuel_type'),
        refuelType: text(node, 'refuel_type'),
        station: text(node, 'fuel_station'),
      };
    });

    childrenNamed(root, 'service_record').forEach((node) => {
      const date = text(node, 'date');
      const ts = uniqueTimestamp(date, bucket);
      const cats = text(node, 'service_categories');
      const note = text(node, 'note');
      const garage = text(node, 'garage');

      bucket[ts] = {
        id: ts,
        type: 'service_record',
        date,
        month: date.slice(0, 7),
        car: text(node, 'carName') || text(node, 'car_name') || car.name || '',
        odometer: toFloat(text(node, 'odometer')),
        cost: toFloat(text(node, 'cost')),
        quantity: null,
        unitPrice: null,
        description: cats !== '' ? cats : note,
        note,
        garage,
        categories: cats,
      };
    });

    childrenNamed(root, 'bill').forEach((node) => {
      const date = text(node, 'date');
      const ts = uniqueTimestamp(date, bucket);
      const billType = text(node, 'bill_type_name');
      const note = text(node, 'note');
      const odoRaw = toFloat(text(node, 'odometer'));

      bucket[ts] = {
        id: ts,
        type: 'bill',
        date,
        month: date.slice(0, 7),
        car: text(node, 'car_name') || car.name || '',
        odometer: odoRaw || null,
        cost: toFloat(text(node, 'cost')),
        quantity: null,
        unitPrice: null,
        description: billType !== '' ? billType : note,
        note,
        billType,
      };
    });

    const entries = Object.keys(bucket)
      .map(Number)
      .sort((a, b) => b - a)
      .map((k) => bucket[k]);

    const fuelSeries = buildFuelSeries(entries);
    const summary = buildSummary(entries, car, fuelSeries);
    const monthly = buildMonthlySeries(entries);

    return {
      source: sourceName || 'm.xml',
      currency,
      car,
      preferences,
      summary,
      monthly,
      fuelSeries,
      byType: {
        refuel: summary.fuelCost,
        service_record: summary.serviceCost,
        bill: summary.billCost,
      },
      entries,
      months: Object.keys(monthly),
      types: ['refuel', 'service_record', 'bill'],
    };
  }

  function buildFuelSeries(entries) {
    const refuels = entries
      .filter((e) => e.type === 'refuel')
      .slice()
      .sort((a, b) => String(a.date).localeCompare(String(b.date)));

    const series = [];
    let prev = null;

    refuels.forEach((r) => {
      const item = {
        date: r.date,
        month: r.month,
        odometer: r.odometer,
        quantity: r.quantity,
        unitPrice: r.unitPrice,
        cost: r.cost,
        km: null,
        consumption: null,
      };

      if (prev) {
        const km = Number(r.odometer) - Number(prev.odometer);
        const qty = Number(r.quantity);
        if (km > 10 && km < 2500 && qty > 0) {
          item.km = Math.round(km * 10) / 10;
          item.consumption = Math.round((100 * qty) / km * 100) / 100;
        }
      }

      series.push(item);
      prev = r;
    });

    return series;
  }

  function buildSummary(entries, car, fuelSeries) {
    let fuelCost = 0;
    let serviceCost = 0;
    let billCost = 0;
    let fuelQty = 0;
    const counts = { refuel: 0, service_record: 0, bill: 0 };
    const odos = [];
    const dates = [];

    entries.forEach((e) => {
      counts[e.type] = (counts[e.type] || 0) + 1;
      const cost = Number(e.cost) || 0;

      if (e.type === 'refuel') {
        fuelCost += cost;
        fuelQty += Number(e.quantity) || 0;
        if (e.odometer) odos.push(Number(e.odometer));
      } else if (e.type === 'service_record') {
        serviceCost += cost;
        if (e.odometer) odos.push(Number(e.odometer));
      } else {
        billCost += cost;
      }

      if (e.date) dates.push(e.date);
    });

    odos.sort((a, b) => a - b);
    dates.sort();

    const odoMin = odos.length ? odos[0] : 0;
    const odoMax = odos.length ? odos[odos.length - 1] : 0;
    const km = Math.max(0, odoMax - odoMin);
    const opsCost = fuelCost + serviceCost + billCost;
    const purchase = (car.price || 0) + (car.initialCost || 0);

    const consValues = fuelSeries
      .map((r) => r.consumption)
      .filter((v) => v != null);
    const avgConsumption =
      consValues.length > 0
        ? Math.round(
            (consValues.reduce((a, b) => a + b, 0) / consValues.length) * 100
          ) / 100
        : null;

    return {
      carName: car.name || '—',
      entryCount: entries.length,
      counts,
      fuelCost: Math.round(fuelCost * 100) / 100,
      serviceCost: Math.round(serviceCost * 100) / 100,
      billCost: Math.round(billCost * 100) / 100,
      opsCost: Math.round(opsCost * 100) / 100,
      purchaseCost: Math.round(purchase * 100) / 100,
      totalCost: Math.round((opsCost + purchase) * 100) / 100,
      fuelQuantity: Math.round(fuelQty * 100) / 100,
      odoMin,
      odoMax,
      kmDriven: Math.round(km),
      costPerKm: km > 0 ? Math.round((opsCost / km) * 1000) / 1000 : null,
      avgConsumption,
      dateFrom: dates[0] || null,
      dateTo: dates.length ? dates[dates.length - 1] : null,
    };
  }

  function buildMonthlySeries(entries) {
    /** @type {Record<string, any>} */
    const months = {};

    entries.forEach((e) => {
      const m = e.month;
      if (!months[m]) {
        months[m] = {
          refuel: 0,
          service_record: 0,
          bill: 0,
          total: 0,
          odoMin: null,
          odoMax: null,
        };
      }
      const cost = Number(e.cost) || 0;
      months[m][e.type] = (months[m][e.type] || 0) + cost;
      months[m].total += cost;

      const odo = e.odometer != null ? Number(e.odometer) : 0;
      if (odo > 0) {
        months[m].odoMin =
          months[m].odoMin == null ? odo : Math.min(months[m].odoMin, odo);
        months[m].odoMax =
          months[m].odoMax == null ? odo : Math.max(months[m].odoMax, odo);
      }
    });

    const keys = Object.keys(months).sort();
    /** @type {Record<string, any>} */
    const out = {};
    keys.forEach((key) => {
      const row = months[key];
      let km = null;
      if (
        row.odoMin != null &&
        row.odoMax != null &&
        row.odoMax > row.odoMin
      ) {
        km = Math.round(row.odoMax - row.odoMin);
      }
      out[key] = {
        refuel: Math.round(row.refuel * 100) / 100,
        service_record: Math.round(row.service_record * 100) / 100,
        bill: Math.round(row.bill * 100) / 100,
        total: Math.round(row.total * 100) / 100,
        km,
      };
    });
    return out;
  }

  /**
   * Rebuild analytics for a filtered subset of entries.
   * Keeps car / currency / source / full month list for filters.
   */
  function reaggregate(dashboard, entries) {
    const list = Array.isArray(entries) ? entries : [];
    const fuelSeries = buildFuelSeries(list);
    const summary = buildSummary(list, dashboard.car || {}, fuelSeries);
    const monthly = buildMonthlySeries(list);

    return {
      source: dashboard.source,
      currency: dashboard.currency,
      car: dashboard.car,
      preferences: dashboard.preferences,
      summary,
      monthly,
      fuelSeries,
      byType: {
        refuel: summary.fuelCost,
        service_record: summary.serviceCost,
        bill: summary.billCost,
      },
      entries: list,
      months: dashboard.months || Object.keys(monthly),
      types: dashboard.types || ['refuel', 'service_record', 'bill'],
    };
  }

  global.MyCarData = { parseMyCarXml, reaggregate };
})(typeof window !== 'undefined' ? window : globalThis);
