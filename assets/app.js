// Switched On picks: loads data/products.json and data/config.json,
// then picks a "Pick of the day" and orders the shortlist by today's date (UK time).
(function () {
  const CATS = { 'home-cinema': 'Home cinema', 'smart-home': 'Smart home', 'gadgets': 'Gadgets' };
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Today's date in the UK, as YYYY-MM-DD, so everyone sees the same pick on the same day.
  function ukDate(d = new Date()) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  }
  function prettyDate(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
      .format(new Date(Date.UTC(y, m - 1, d))).toUpperCase();
  }
  // Small seeded random generator: same seed, same order, all day.
  function seeded(str) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    let a = h1 >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(list, rand) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  function amazonUrl(p, cfg) {
    const domain = cfg.amazonDomain || 'www.amazon.co.uk';
    const tag = (cfg.amazonTag || '').trim();
    const url = p.asin
      ? new URL(`https://${domain}/dp/${encodeURIComponent(p.asin)}`)
      : new URL(`https://${domain}/s`);
    if (!p.asin) url.searchParams.set('k', p.amazonQuery || p.name);
    if (tag) url.searchParams.set('tag', tag);
    return url.toString();
  }

  function cardHTML(p, cfg, big) {
    const cat = CATS[p.category] || '';
    const badge = p.badge ? `<span class="badge">${esc(p.badge)}</span>` : '';
    const src = p.source && p.source.url
      ? `<p class="src">SOURCE: <a href="${esc(p.source.url)}" rel="noopener" target="_blank">${esc(p.source.name)}</a></p>` : '';
    const H = 'h3';
    // A real product photo if one has been added (your own, or one you have permission to use);
    // otherwise the original illustration for that kind of kit.
    const art = p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" decoding="async"
           onerror="this.parentNode.classList.remove('photo');this.replaceWith(document.createRange().createContextualFragment(window.kitArt('${esc(p.kit)}')))">
         ${p.imageCredit ? `<span class="credit">${esc(p.imageCredit)}</span>` : ''}`
      : window.kitArt(p.kit);
    return `
      <div class="art${p.image ? ' photo' : ''}">${badge}${art}</div>
      <div class="body">
        <p class="cat">${esc(cat)}</p>
        <${H}>${esc(p.name)}</${H}>
        <p class="bestfor">${esc(p.bestFor)}</p>
        <p class="why">${esc(p.why)}</p>
        ${src}
        <a class="btn" href="${esc(amazonUrl(p, cfg))}" rel="sponsored nofollow noopener" target="_blank">
          Check price on Amazon <span class="arr" aria-hidden="true">→</span>
        </a>
      </div>`;
  }

  function render(data, cfg) {
    const today = ukDate();
    $('today').textContent = prettyDate(today);
    $('updated').textContent = data.updated ? prettyDate(data.updated) : '—';
    $('year').textContent = today.slice(0, 4);
    if (cfg.instagram) {
      $('igLink').href = `https://www.instagram.com/${encodeURIComponent(cfg.instagram)}/`;
      $('igLink').textContent = '@' + cfg.instagram;
    }

    // This week
    const wk = data.thisWeek;
    if (wk && wk.headline) {
      $('weekLabel').textContent = wk.label || 'THIS WEEK';
      $('weekHeadline').textContent = wk.headline;
      let note = esc(wk.note || '');
      (wk.links || []).forEach((l) => {
        note = note.replace(esc(l.text), `<a href="${esc(l.url)}" rel="noopener" target="_blank">${esc(l.text)}</a>`);
      });
      $('weekNote').innerHTML = note;
      $('weekWrap').hidden = false;
    }

    // Order everything by today's seed. The first one is the pick of the day.
    const products = (data.products || []).filter((p) => p && p.name);
    if (!products.length) { $('potd').innerHTML = '<div class="body"><p class="lede">New picks are on the way.</p></div>'; return; }
    // Pick of the day walks through a shuffled copy of the list, so every product
    // gets a turn before any repeats. The shortlist is reshuffled every day.
    const [y, m, d] = today.split('-').map(Number);
    const day = Math.floor(Date.UTC(y, m - 1, d) / 86400000);
    const sorted = products.slice().sort((a, b) => String(a.id).localeCompare(String(b.id)));
    const cycle = Math.floor(day / sorted.length);
    const pick = shuffle(sorted, seeded('cycle-' + cycle))[day % sorted.length];
    $('potd').innerHTML = cardHTML(pick, cfg, true);

    const rest = shuffle(sorted.filter((p) => p !== pick), seeded('day-' + today));
    const grid = $('grid');
    function show(cat) {
      const list = cat === 'all' ? rest : rest.filter((p) => p.category === cat);
      grid.innerHTML = list.map((p) => `<article class="card">${cardHTML(p, cfg, false)}</article>`).join('')
        || '<p class="lede">Nothing in this category today.</p>';
    }
    document.querySelectorAll('.chip').forEach((b) => b.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      show(b.dataset.cat);
    }));
    show('all');
  }

  const get = (u) => fetch(u, { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); });
  Promise.all([get('data/products.json'), get('data/config.json').catch(() => ({}))])
    .then(([data, cfg]) => render(data, cfg))
    .catch(() => { $('potd').innerHTML = '<div class="body"><p class="lede">Couldn\'t load today\'s picks. Try refreshing.</p></div>'; });
})();
