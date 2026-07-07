// NEONPLAY — asosiy interaktivlik
(function(){
  const gameGrid = document.getElementById('gameGrid');
  const featuredGrid = document.getElementById('featuredGrid');
  const footerGamesList = document.getElementById('footerGamesList');
  const resultsCount = document.getElementById('resultsCount');
  const searchInput = document.getElementById('searchInput');
  const chipRow = document.getElementById('chipRow');
  const gameCountEl = document.getElementById('gameCount');

  let activeCategory = 'all';
  let searchTerm = '';

  const catLabels = {
    arcade: 'Arcade', puzzle: 'Bulmoqchi', classic: 'Klassik', reflex: 'Tezkorlik'
  };

  function tagBadge(tag){
    if(tag === 'new') return `<span class="tag-new">YANGI</span>`;
    if(tag === 'hot') return `<span class="tag-new tag-hot">MASHHUR</span>`;
    return '';
  }

  function cardHTML(game){
    const tag = game.tags && game.tags[0] ? tagBadge(game.tags[0]) : '';
    return `
    <article class="game-card" data-id="${game.id}" tabindex="0" role="button" aria-label="${game.title} o'yinini ochish">
      <div class="game-thumb" style="background:linear-gradient(160deg, ${game.grad[0]}, ${game.grad[1]})">
        ${tag}
        <div class="play-badge">
          <svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        </div>
        ${game.icon}
      </div>
      <div class="game-info">
        <h3>${game.title}</h3>
        <div class="game-meta">
          <span>${catLabels[game.category]}</span>
          <span class="rating"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9-6.2-3.3-6.2 3.3 1.2-6.9-5-4.9 6.9-1z"/></svg>${game.rating}</span>
        </div>
      </div>
    </article>`;
  }

  function featuredHTML(game){
    return `
    <article class="game-card" data-id="${game.id}" tabindex="0" role="button" aria-label="${game.title} o'yinini ochish">
      <div class="game-thumb" style="background:linear-gradient(160deg, ${game.grad[0]}, ${game.grad[1]})">
        ${game.tags[0] ? tagBadge(game.tags[0]) : ''}
        ${game.icon}
      </div>
      <div class="game-info">
        <h3>${game.title}</h3>
        <p>${game.desc}</p>
        <span class="mini-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
          O'ynash
        </span>
      </div>
    </article>`;
  }

  function render(){
    const filtered = GAMES.filter(g => {
      const matchCat = activeCategory === 'all' || g.category === activeCategory;
      const matchSearch = !searchTerm || g.title.toLowerCase().includes(searchTerm) || g.desc.toLowerCase().includes(searchTerm);
      return matchCat && matchSearch;
    });

    gameGrid.innerHTML = filtered.length
      ? filtered.map(cardHTML).join('')
      : `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--muted);">
           Hech narsa topilmadi. Boshqa so'z bilan qidirib ko'ring 🔍
         </div>`;

    resultsCount.textContent = `${filtered.length} ta o'yin topildi`;

    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => openGame(card.dataset.id));
      card.addEventListener('keydown', e => { if(e.key === 'Enter') openGame(card.dataset.id); });
    });
  }

  function renderFeatured(){
    const featured = [...GAMES].sort((a,b)=>b.rating-a.rating).slice(0,2);
    featuredGrid.innerHTML = featured.map(featuredHTML).join('');
    featuredGrid.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => openGame(card.dataset.id));
    });
  }

  function renderFooterList(){
    footerGamesList.innerHTML = GAMES.slice(0,5).map(g =>
      `<li><a href="#" data-open="${g.id}">${g.title}</a></li>`
    ).join('');
    footerGamesList.querySelectorAll('[data-open]').forEach(a=>{
      a.addEventListener('click', e=>{ e.preventDefault(); openGame(a.dataset.open); });
    });
  }

  // ---- Category chips ----
  chipRow.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if(!chip) return;
    chipRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCategory = chip.dataset.cat;
    render();
  });

  document.querySelectorAll('[data-cat-link]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const cat = a.dataset.catLink;
      activeCategory = cat;
      chipRow.querySelectorAll('.chip').forEach(c=>{
        c.classList.toggle('active', c.dataset.cat === cat);
      });
      render();
      document.getElementById('games').scrollIntoView({behavior:'smooth'});
    });
  });

  // ---- Search ----
  searchInput.addEventListener('input', e => {
    searchTerm = e.target.value.trim().toLowerCase();
    render();
  });

  // ---- Random game ----
  document.getElementById('randomGameBtn').addEventListener('click', e => {
    e.preventDefault();
    const pick = GAMES[Math.floor(Math.random()*GAMES.length)];
    openGame(pick.id);
  });

  // ---- Game player overlay ----
  const overlay = document.getElementById('playerOverlay');
  const gameFrame = document.getElementById('gameFrame');
  const playerTitle = document.getElementById('playerTitle');

  function openGame(id){
    const game = GAMES.find(g => g.id === id);
    if(!game) return;
    playerTitle.textContent = game.title;
    gameFrame.src = game.file;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeGame(){
    overlay.classList.remove('open');
    gameFrame.src = '';
    document.body.style.overflow = '';
  }

  document.getElementById('closePlayerBtn').addEventListener('click', closeGame);
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && overlay.classList.contains('open')) closeGame(); });

  document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const wrap = document.querySelector('.player-frame-wrap');
    if(document.fullscreenElement){
      document.exitFullscreen();
    } else {
      wrap.requestFullscreen?.();
    }
  });

  // ---- Live online counter (cosmetic, signature touch) ----
  let count = 2481;
  const counterEl = document.getElementById('onlineCounter');
  setInterval(() => {
    count += Math.floor(Math.random()*9) - 3;
    if(count < 1800) count = 1800;
    counterEl.textContent = count.toLocaleString('en-US').replace(/,/g,' ');
  }, 2200);

  // ---- init ----
  gameCountEl.textContent = GAMES.length;
  renderFeatured();
  renderFooterList();
  render();
})();
