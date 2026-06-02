/* ============================================================
   SPOTIFY-STYLE MUSIC PLAYER  |  script.js
   ============================================================ */

'use strict';

/* ---- Playlist Data ---- */
const SONGS = [
  { title: 'Chill Lofi Vibes',  artist: 'Lo-Fi Dreams',       album: 'Night Sessions',   src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', color: '#7c3aed', emoji: '🌙' },
  { title: 'Electric Pulse',    artist: 'Synthwave Studio',    album: 'Neon City',        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', color: '#be185d', emoji: '⚡' },
  { title: 'Ocean Drive',       artist: 'Coastal Beats',       album: 'Sunset Horizon',   src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', color: '#0369a1', emoji: '🌊' },
  { title: 'Golden Hour',       artist: 'Ambient Lab',         album: 'Daybreak',         src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', color: '#b45309', emoji: '🌅' },
  { title: 'Deep Forest',       artist: 'Nature Sounds',       album: 'Wilderness',       src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', color: '#065f46', emoji: '🌿' },
  { title: 'City Nights',       artist: 'Urban Echo',          album: 'Metropolis',       src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', color: '#1e1b4b', emoji: '🏙️' },
  { title: 'Cosmic Drift',      artist: 'Stargazer',           album: 'Galaxies',         src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', color: '#4c1d95', emoji: '🌌' },
  { title: 'Rainy Day Jazz',    artist: 'Blue Note Sessions',  album: 'Café Moments',     src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', color: '#164e63', emoji: '☔' },
  { title: 'Summer Breeze',     artist: 'Sol Crest',           album: 'Island Time',      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', color: '#0d9488', emoji: '🍹' },
  { title: 'Retro Rewind',      artist: '8-Bit Retro',         album: 'Pixel World',      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', color: '#db2777', emoji: '👾' },
  { title: 'Mountain Flight',   artist: 'Echoes of Sky',       album: 'High Peaks',       src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', color: '#4f46e5', emoji: '🏔️' },
  { title: 'Midnight Jazz Café', artist: 'Sax Collective',      album: 'Late Night Jazz',  src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', color: '#854d0e', emoji: '🎷' },
  { title: 'Cyberpunk Riot',    artist: 'Neon Grid',           album: 'Gridrunner',       src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', color: '#e11d48', emoji: '🕶️' },
  { title: 'Healing Waters',    artist: 'Spiritual Flow',      album: 'Tranquility',      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', color: '#0891b2', emoji: '🧘' },
  { title: 'Groove Machine',    artist: 'Funk Syndicate',      album: 'Bassline Paradise', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', color: '#ea580c', emoji: '🕺' },
  { title: 'Ethereal Space',    artist: 'Solaris',             album: 'Nebula Tour',      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', color: '#6366f1', emoji: '🛰️' }
];

/* ---- DOM References ---- */
const audio           = document.getElementById('audioPlayer');
const playPauseBtn    = document.getElementById('playPauseBtn');
const playIcon        = document.getElementById('playIcon');
const pauseIcon       = document.getElementById('pauseIcon');
const prevBtn         = document.getElementById('prevBtn');
const nextBtn         = document.getElementById('nextBtn');
const shuffleBtn      = document.getElementById('shuffleBtn');
const repeatBtn       = document.getElementById('repeatBtn');
const muteBtn         = document.getElementById('muteBtn');
const volIcon         = document.getElementById('volIcon');

const progressTrack   = document.getElementById('progressTrack');
const progressFill    = document.getElementById('progressFill');
const progressThumb   = document.getElementById('progressThumb');
const currentTimeEl   = document.getElementById('currentTime');
const totalDurEl      = document.getElementById('totalDuration');

const volumeTrack     = document.getElementById('volumeTrack');
const volumeFill      = document.getElementById('volumeFill');
const volumeThumb     = document.getElementById('volumeThumb');
const volLabel        = document.getElementById('volLabel');

// Main panel
const songTitle       = document.getElementById('songTitle');
const songArtist      = document.getElementById('songArtist');
const songAlbum       = document.getElementById('songAlbum');
const albumImg        = document.getElementById('albumImg');
const mainGradient    = document.getElementById('mainGradient');

// Bottom playbar
const albumImgBar     = document.getElementById('albumImgBar');
const barSongTitleEl  = document.getElementById('barSongTitle');
const barArtistEl     = document.getElementById('barArtist');

// Right panel now playing elements
const rightPanelArt    = document.getElementById('rightPanelArt');
const rightPanelTitle  = document.getElementById('rightPanelTitle');
const rightPanelArtist = document.getElementById('rightPanelArtist');
const queueList       = document.getElementById('queueList');

// App wrapper (carries is-playing class)
const playerCard      = document.getElementById('playerCard');
const playlistEl      = document.getElementById('playlist');
const playlistPanel   = document.getElementById('playlistPanel');
const togglePLBtn     = document.getElementById('togglePlaylistBtn');
const closeQueueBtn   = document.getElementById('closeQueueBtn');
const autoplayToggle  = document.getElementById('autoplayToggle');
const bodyPlayBtn     = document.getElementById('bodyPlayBtn');
const heartBtn        = document.getElementById('heartBtn');
const heartBtn2       = document.getElementById('heartBtn2');

/* ---- State ---- */
let currentIndex = 0;
let isShuffle    = false;
let isRepeat     = false;
let isMuted      = false;
let prevVolume   = 0.8;
let isLiked      = false;
let isDraggingProgress = false;
let isDraggingVolume   = false;
let shuffleOrder = [];

// Search State
let isSearchMode = false;
let searchResults = [];

// Playlist State
let playlists = {
  liked: {
    id: 'liked',
    title: 'Liked Songs',
    desc: 'Your personal collection of favorite tracks.',
    coverColor: 'linear-gradient(135deg, #450e75 0%, #190530 100%)',
    emoji: '💖',
    songs: []
  },
  all: {
    id: 'all',
    title: 'All Songs',
    desc: 'All available vibes in your library.',
    coverColor: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
    emoji: '🎵',
    songs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  },
  lofi: {
    id: 'lofi',
    title: 'Chill Lofi Vibes',
    desc: 'Smooth chill beats to relax, study, or sleep.',
    coverColor: 'linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)',
    emoji: '🌙',
    songs: [0, 4, 7, 13]
  },
  synth: {
    id: 'synth',
    title: 'Synth & Retro Beats',
    desc: 'Vibrant neon waves and upbeat electronic rhythms.',
    coverColor: 'linear-gradient(135deg, #be185d 0%, #31111d 100%)',
    emoji: '⚡',
    songs: [1, 2, 9, 12]
  },
  smooth: {
    id: 'smooth',
    title: 'Golden & Smooth',
    desc: 'Warm harmonies, acoustic paths, and ambient groove.',
    coverColor: 'linear-gradient(135deg, #b45309 0%, #271302 100%)',
    emoji: '🌅',
    songs: [3, 5, 6, 8, 10, 11, 14, 15]
  }
};
let activePlaylistId = 'all';
const durationCache = {};

/* ---- Utility ---- */
function fmt(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function getRandomColor() {
  const colors = ['#7c3aed', '#be185d', '#0369a1', '#b45309', '#065f46', '#1e1b4b', '#4c1d95', '#164e63', '#0d9488', '#db2777', '#4f46e5', '#e11d48', '#0891b2', '#ea580c', '#6366f1'];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* ---- Generate SVG album art ---- */
function makeSVGArt(song) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <defs><radialGradient id="g" cx="35%" cy="35%" r="70%">
      <stop offset="0%" stop-color="${song.color}"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient></defs>
    <rect width="200" height="200" fill="url(#g)"/>
    <text x="100" y="115" font-size="64" text-anchor="middle" dominant-baseline="middle">${song.emoji}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/* ---- Generate Playlist Cover Art ---- */
function makePlaylistSVGArt(playlist) {
  let fillStr = '#1db954';
  let defsStr = '';
  if (playlist.coverColor.startsWith('linear-gradient')) {
    const matches = playlist.coverColor.match(/#[0-9a-fA-F]{3,8}/g);
    if (matches && matches.length >= 2) {
      defsStr = `<defs><linearGradient id="g-${playlist.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${matches[0]}"/>
        <stop offset="100%" stop-color="${matches[1]}"/>
      </linearGradient></defs>`;
      fillStr = `url(#g-${playlist.id})`;
    }
  } else {
    fillStr = playlist.coverColor;
  }

  const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    ${defsStr}
    <rect width="200" height="200" fill="${fillStr}"/>
    <text x="100" y="115" font-size="64" text-anchor="middle" dominant-baseline="middle">${playlist.emoji}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(finalSvg)));
}

/* ---- Build Sidebar Playlists ---- */
function buildSidebarPlaylists() {
  playlistEl.innerHTML = '';
  Object.values(playlists).forEach(pl => {
    const li = document.createElement('li');
    li.className = 'playlist-item' + (pl.id === activePlaylistId ? ' active' : '');
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', pl.id === activePlaylistId ? 'true' : 'false');
    li.dataset.id = pl.id;

    const count = pl.songs.length;
    li.innerHTML = `
      <img class="pl-thumb" src="${makePlaylistSVGArt(pl)}" alt="${pl.title}" />
      <div class="pl-info">
        <div class="pl-title">${pl.title}</div>
        <div class="pl-artist">Playlist • ${count} ${count === 1 ? 'song' : 'songs'}</div>
      </div>
    `;
    li.addEventListener('click', () => selectPlaylist(pl.id));
    playlistEl.appendChild(li);
  });
}

/* ---- Cache Durations for Main Track List ---- */
function cacheAllDurations() {
  SONGS.forEach((song, i) => {
    const tmp = new Audio();
    tmp.preload = 'metadata';
    tmp.src = song.src;
    tmp.addEventListener('loadedmetadata', () => {
      durationCache[i] = fmt(tmp.duration);
      if (playlists[activePlaylistId]?.songs.includes(i)) {
        renderTrackTable();
      }
    });
  });
}

/* ---- Render Tracklist Table ---- */
function renderTrackTable() {
  const tableEl = document.getElementById('trackTable');
  if (!tableEl) return;
  
  const songs = getActivePlaylistSongs();
  if (songs.length === 0) {
    tableEl.innerHTML = `
      <div style="padding: 48px 32px; text-align: center; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 8px; color: var(--text-sub);">This playlist is empty</p>
        <p style="font-size: 0.85rem;">Add songs by clicking the "+" button next to any track in "All Songs".</p>
      </div>
    `;
    return;
  }
  
  let html = `
    <div class="track-table-header">
      <div class="track-index-col">#</div>
      <div>Title</div>
      <div>Album</div>
      <div style="text-align: center;">Add</div>
      <div style="text-align: right; padding-right: 16px;">Duration</div>
    </div>
  `;
  
  songs.forEach((songIdx, i) => {
    const song = SONGS[songIdx];
    const isCurrent = songIdx === currentIndex;
    const isSongPlaying = isCurrent && !audio.paused;
    const isSongLiked = playlists.liked.songs.includes(songIdx);
    const durText = durationCache[songIdx] || '—';
    
    html += `
      <div class="track-row ${isCurrent ? 'active' : ''}" data-index="${songIdx}">
        <div class="track-index-col">
          <span class="track-index-num">${i + 1}</span>
          <span class="track-play-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              ${isSongPlaying ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>' : '<path d="M8 5v14l11-7z"/>'}
            </svg>
          </span>
        </div>
        <div class="track-title-info">
          <img class="track-main-thumb" src="${makeSVGArt(song)}" alt="" />
          <div class="track-text">
            <div class="track-title">${song.title}</div>
            <div class="track-artist-name">${song.artist}</div>
          </div>
        </div>
        <div class="track-album-col">${song.album}</div>
        <div class="track-action-col" style="justify-content: center;">
          <button class="track-btn add-to-pl-btn" data-index="${songIdx}" title="Add to Playlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
        <div class="track-duration-col">
          <button class="track-btn track-heart-btn ${isSongLiked ? 'liked' : ''}" data-index="${songIdx}">
            <svg viewBox="0 0 24 24" fill="${isSongLiked ? 'var(--green)' : 'none'}" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <span>${durText}</span>
        </div>
      </div>
    `;
  });
  
  tableEl.innerHTML = html;
  
  // Attach listeners to rows
  tableEl.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('.track-btn')) return;
      const idx = parseInt(row.dataset.index);
      if (idx === currentIndex) {
        if (audio.paused) playSong();
        else pauseSong();
      } else {
        loadSong(idx, true);
      }
    });
  });
  
  // Attach listeners to heart buttons in tracks
  tableEl.querySelectorAll('.track-heart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index);
      toggleLikeForSong(idx);
    });
  });
  
  // Attach listeners to Add buttons
  tableEl.querySelectorAll('.add-to-pl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index);
      showDropdownMenu(idx, btn);
    });
  });
}

/* ---- Select Playlist ---- */
function selectPlaylist(playlistId, shouldPushState = true) {
  exitSearchMode();
  activePlaylistId = playlistId;
  
  document.querySelectorAll('.playlist-item').forEach(item => {
    const isActive = item.dataset.id === playlistId;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  
  const pl = playlists[playlistId];
  updateHeroForPlaylist(pl);
  renderTrackTable();
  updateQueue();

  if (shouldPushState) {
    pushHistoryState({ type: 'playlist', id: playlistId });
  }
}

/* ---- Update Hero Panel for Active Playlist ---- */
function updateHeroForPlaylist(playlist) {
  albumImg.src = makePlaylistSVGArt(playlist);
  document.querySelector('.hero-type').textContent = 'PLAYLIST';
  songTitle.textContent = playlist.title;
  
  const count = playlist.songs.length;
  songArtist.textContent = playlist.desc;
  songAlbum.textContent = `${count} ${count === 1 ? 'song' : 'songs'}`;
  
  mainGradient.style.background = playlist.coverColor;
}

/* ---- Dropdown Management ---- */
function closeAllDropdowns() {
  const dropdownIds = [
    'playlistDropdown',
    'playlistOptionsDropdown',
    'menuDropdown',
    'browseDropdown',
    'notificationsDropdown',
    'friendActivityDropdown',
    'profileDropdown'
  ];
  dropdownIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
  });
}

function toggleDropdown(dropdownId, anchorEl, alignRight = false) {
  const targetDropdown = document.getElementById(dropdownId);
  if (!targetDropdown) return;
  
  const isCurrentlyOpen = targetDropdown.classList.contains('show');
  
  closeAllDropdowns();
  
  if (!isCurrentlyOpen) {
    const rect = anchorEl.getBoundingClientRect();
    if (alignRight) {
      targetDropdown.style.left = 'auto';
      targetDropdown.style.right = `${window.innerWidth - rect.right}px`;
    } else {
      targetDropdown.style.left = `${rect.left}px`;
      targetDropdown.style.right = 'auto';
    }
    targetDropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;
    targetDropdown.classList.add('show');
  }
}

/* ---- Add to Playlist Dropdown Menu ---- */
function showDropdownMenu(songIdx, buttonEl) {
  closeAllDropdowns();
  const dropdown = document.getElementById('playlistDropdown');
  if (!dropdown) return;
  
  dropdown.innerHTML = '<div class="dropdown-header">Add to Playlist</div>';
  
  let count = 0;
  Object.values(playlists).forEach(pl => {
    if (pl.id === 'all' || pl.id === 'liked') return;
    
    const inPlaylist = pl.songs.includes(songIdx);
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.textContent = inPlaylist ? `✓ ${pl.title}` : pl.title;
    item.addEventListener('click', () => {
      if (inPlaylist) {
        const pos = pl.songs.indexOf(songIdx);
        pl.songs.splice(pos, 1);
        showToast(`Removed from ${pl.title}`);
      } else {
        pl.songs.push(songIdx);
        showToast(`Added to ${pl.title}`);
      }
      dropdown.classList.remove('show');
      buildSidebarPlaylists();
      renderTrackTable();
      updateQueue();
    });
    dropdown.appendChild(item);
    count++;
  });
  
  if (count === 0) {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.style.color = 'var(--text-muted)';
    item.textContent = 'Create a playlist first';
    item.addEventListener('click', () => {
      dropdown.classList.remove('show');
      openCreatePlaylistModal();
    });
    dropdown.appendChild(item);
  }
  
  const rect = buttonEl.getBoundingClientRect();
  dropdown.style.left = `${rect.left - 140}px`;
  dropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;
  dropdown.classList.add('show');
}

/* ---- Playlist CRUD Operations ---- */
function createPlaylist(name) {
  if (!name) return;
  const id = 'custom-' + Date.now();
  playlists[id] = {
    id: id,
    title: name,
    desc: 'A custom playlist created by you.',
    coverColor: `linear-gradient(135deg, ${getRandomColor()} 0%, #121212 100%)`,
    emoji: '🎶',
    songs: []
  };
  buildSidebarPlaylists();
  selectPlaylist(id);
}

/* ---- Toast Notification ---- */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ---- Create Playlist Modal Dialog ---- */
const playlistModal = document.getElementById('playlistModal');
const playlistInput = document.getElementById('playlistInput');
const createPlaylistBtn = document.getElementById('createPlaylistBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const createModalBtn = document.getElementById('createModalBtn');

function openCreatePlaylistModal() {
  playlistModal.classList.remove('hidden');
  playlistInput.value = '';
  playlistInput.focus();
}

function closeCreatePlaylistModal() {
  playlistModal.classList.add('hidden');
}

if (createPlaylistBtn) createPlaylistBtn.addEventListener('click', openCreatePlaylistModal);
if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeCreatePlaylistModal);
if (createModalBtn) {
  createModalBtn.addEventListener('click', () => {
    const name = playlistInput.value.trim();
    if (name) {
      createPlaylist(name);
      closeCreatePlaylistModal();
      showToast(`Playlist "${name}" created!`);
    }
  });
}
if (playlistInput) {
  playlistInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      createModalBtn.click();
    }
  });
}

/* ---- Update Queue Panel ---- */
function updateQueue() {
  const songs = getActivePlaylistSongs();
  
  const song = SONGS[currentIndex];
  const art  = makeSVGArt(song);

  // Now playing section
  if (rightPanelArt)    rightPanelArt.src            = art;
  if (rightPanelTitle)  rightPanelTitle.textContent  = song.title;
  if (rightPanelArtist) rightPanelArtist.textContent = song.artist;

  // Next up list (only if queueList element exists)
  if (!queueList) return;

  if (songs.length === 0) {
    queueList.innerHTML = '';
    return;
  }
  
  queueList.innerHTML = '';
  const count = songs.length;
  const pos = songs.indexOf(currentIndex);
  if (pos === -1) return;
  
  for (let offset = 1; offset <= Math.min(count - 1, 6); offset++) {
    const idx = songs[(pos + offset) % count];
    const next = SONGS[idx];
    const li   = document.createElement('li');
    li.className = 'queue-item';
    li.innerHTML = `
      <img class="queue-thumb" src="${makeSVGArt(next)}" alt="${next.title}" />
      <div class="queue-info">
        <div class="queue-title">${next.title}</div>
        <div class="queue-artist">${next.artist}</div>
      </div>
    `;
    li.addEventListener('click', () => loadSong(idx, true));
    queueList.appendChild(li);
  }
}

/* ---- Load Song ---- */
function loadSong(index, autoPlay = false) {
  currentIndex = ((index % SONGS.length) + SONGS.length) % SONGS.length;
  const song = SONGS[currentIndex];
  const art  = makeSVGArt(song);

  document.title = `${song.title} — Vibe`;

  // Bottom playbar
  albumImgBar.src           = art;
  barSongTitleEl.textContent = song.title;
  barArtistEl.textContent    = song.artist;

  // Audio
  audio.src = song.src;
  audio.load();

  // Reset progress
  progressFill.style.width    = '0%';
  progressThumb.style.left    = '0%';
  currentTimeEl.textContent   = '0:00';
  totalDurEl.textContent      = '0:00';

  // Update liked state
  isLiked = playlists.liked.songs.includes(currentIndex);
  updateHeartBtns();

  // Update queue
  updateQueue();
  
  // Refresh active highlighting in track table
  renderTrackTable();

  if (autoPlay) playSong();
  else pauseVisuals();
}

/* ---- Play / Pause ---- */
function playSong() {
  audio.play().catch(() => {});
  playerCard.classList.add('is-playing');
  playIcon.classList.add('hidden');
  pauseIcon.classList.remove('hidden');
  playPauseBtn.setAttribute('aria-label', 'Pause');
  bodyPlayBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  renderTrackTable();
}

function pauseSong() {
  audio.pause();
  pauseVisuals();
}

function pauseVisuals() {
  playerCard.classList.remove('is-playing');
  playIcon.classList.remove('hidden');
  pauseIcon.classList.add('hidden');
  playPauseBtn.setAttribute('aria-label', 'Play');
  bodyPlayBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M8 5v14l11-7z"/></svg>`;
  renderTrackTable();
}

/* ---- Heart / Like ---- */
function updateHeartBtns() {
  const svg = isLiked
    ? `<svg viewBox="0 0 24 24" fill="${getComputedStyle(document.documentElement).getPropertyValue('--green') || '#1DB954'}" width="16" height="16"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  if (heartBtn) heartBtn.innerHTML = svg;
  if (heartBtn2) {
    heartBtn2.innerHTML = svg;
    heartBtn2.classList.toggle('active', isLiked);
  }
}

function toggleLike() {
  toggleLikeForSong(currentIndex);
}

function toggleLikeForSong(idx) {
  const likedSongs = playlists.liked.songs;
  const listPos = likedSongs.indexOf(idx);
  
  let nowLiked = false;
  if (listPos === -1) {
    likedSongs.push(idx);
    nowLiked = true;
    showToast(`Added to Liked Songs`);
  } else {
    likedSongs.splice(listPos, 1);
    showToast(`Removed from Liked Songs`);
  }
  
  if (idx === currentIndex) {
    isLiked = nowLiked;
    updateHeartBtns();
  }
  
  buildSidebarPlaylists();
  renderTrackTable();
}

function getActivePlaylistSongs() {
  if (isSearchMode) {
    return searchResults;
  }
  return playlists[activePlaylistId]?.songs || [];
}

/* ---- Next / Prev ---- */
function getNextIndex() {
  const songs = getActivePlaylistSongs();
  if (songs.length === 0) return currentIndex;
  
  if (isShuffle) {
    if (!shuffleOrder.length) rebuildShuffle();
    return shuffleOrder.pop();
  }
  
  const pos = songs.indexOf(currentIndex);
  if (pos === -1) return songs[0];
  return songs[(pos + 1) % songs.length];
}

function getPrevIndex() {
  const songs = getActivePlaylistSongs();
  if (songs.length === 0) return currentIndex;
  
  if (isShuffle) {
    return songs[Math.floor(Math.random() * songs.length)];
  }
  
  const pos = songs.indexOf(currentIndex);
  if (pos === -1) return songs[0];
  return songs[(pos - 1 + songs.length) % songs.length];
}

function rebuildShuffle() {
  const songs = getActivePlaylistSongs();
  shuffleOrder = songs.filter(idx => idx !== currentIndex);
  for (let i = shuffleOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleOrder[i], shuffleOrder[j]] = [shuffleOrder[j], shuffleOrder[i]];
  }
}

/* ---- Progress ---- */
function setProgressFromEvent(e) {
  const rect  = progressTrack.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  if (audio.duration) audio.currentTime = ratio * audio.duration;
  updateProgress(ratio);
}
function updateProgress(ratio) {
  const pct = (ratio * 100).toFixed(2) + '%';
  progressFill.style.width = pct;
  progressThumb.style.left = pct;
  progressTrack.setAttribute('aria-valuenow', Math.round(ratio * 100));
}

audio.addEventListener('timeupdate', () => {
  if (isDraggingProgress || !audio.duration) return;
  updateProgress(audio.currentTime / audio.duration);
  currentTimeEl.textContent = fmt(audio.currentTime);
  totalDurEl.textContent    = fmt(audio.duration);
});
audio.addEventListener('loadedmetadata', () => { totalDurEl.textContent = fmt(audio.duration); });
audio.addEventListener('ended', () => {
  if (isRepeat) { audio.currentTime = 0; playSong(); }
  else if (autoplayToggle.checked) loadSong(getNextIndex(), true);
  else pauseVisuals();
});

progressTrack.addEventListener('mousedown', e => {
  e.preventDefault();
  isDraggingProgress = true;
  progressTrack.classList.add('active');
  setProgressFromEvent(e);
});
document.addEventListener('mousemove', e => {
  if (isDraggingProgress) setProgressFromEvent(e);
});
document.addEventListener('mouseup', () => {
  if (isDraggingProgress) {
    isDraggingProgress = false;
    progressTrack.classList.remove('active');
  }
});
progressTrack.addEventListener('touchstart', e => {
  isDraggingProgress = true;
  progressTrack.classList.add('active');
  setProgressFromEvent(e.touches[0]);
}, { passive: true });
document.addEventListener('touchmove', e => {
  if (isDraggingProgress) setProgressFromEvent(e.touches[0]);
}, { passive: true });
document.addEventListener('touchend', () => {
  if (isDraggingProgress) {
    isDraggingProgress = false;
    progressTrack.classList.remove('active');
  }
});
progressTrack.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
  if (e.key === 'ArrowLeft')  audio.currentTime = Math.max(0, audio.currentTime - 5);
});

/* ---- Volume ---- */
function setVolume(val) {
  val = Math.min(1, Math.max(0, val));
  audio.volume = val;
  const pct = (val * 100).toFixed(0) + '%';
  volumeFill.style.width  = pct;
  volumeThumb.style.left  = pct;
  volLabel.textContent    = Math.round(val * 100) + '%';
  volumeTrack.setAttribute('aria-valuenow', Math.round(val * 100));
  updateVolIcon(val);
  if (val > 0) { isMuted = false; audio.muted = false; prevVolume = val; }
}
function setVolumeFromEvent(e) {
  const rect  = volumeTrack.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  setVolume(ratio);
}
function updateVolIcon(val) {
  const volWaves = document.getElementById('volWaves');
  if (!volWaves) return;
  if (isMuted || val === 0) {
    volWaves.setAttribute('d', '');
  } else if (val < 0.5) {
    volWaves.setAttribute('d', 'M15.54 8.46a5 5 0 0 1 0 7.07');
  } else {
    volWaves.setAttribute('d', 'M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14');
  }
}

volumeTrack.addEventListener('mousedown', e => {
  e.preventDefault();
  isDraggingVolume = true;
  volumeTrack.classList.add('active');
  setVolumeFromEvent(e);
});
document.addEventListener('mousemove', e => {
  if (isDraggingVolume) setVolumeFromEvent(e);
});
document.addEventListener('mouseup', () => {
  if (isDraggingVolume) {
    isDraggingVolume = false;
    volumeTrack.classList.remove('active');
  }
});
volumeTrack.addEventListener('touchstart', e => {
  isDraggingVolume = true;
  volumeTrack.classList.add('active');
  setVolumeFromEvent(e.touches[0]);
}, { passive: true });
document.addEventListener('touchmove', e => {
  if (isDraggingVolume) setVolumeFromEvent(e.touches[0]);
}, { passive: true });
document.addEventListener('touchend', () => {
  if (isDraggingVolume) {
    isDraggingVolume = false;
    volumeTrack.classList.remove('active');
  }
});
volumeTrack.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') setVolume(audio.volume + 0.05);
  if (e.key === 'ArrowLeft')  setVolume(audio.volume - 0.05);
});

/* ---- Button Listeners ---- */
playPauseBtn.addEventListener('click', () => { if (audio.paused) playSong(); else pauseSong(); });
bodyPlayBtn.addEventListener('click', () => {
  const songs = getActivePlaylistSongs();
  if (songs.length === 0) return;
  if (songs.includes(currentIndex)) {
    if (audio.paused) playSong();
    else pauseSong();
  } else {
    loadSong(songs[0], true);
  }
});

prevBtn.addEventListener('click', () => {
  if (audio.currentTime > 3) audio.currentTime = 0;
  else loadSong(getPrevIndex(), !audio.paused);
});
nextBtn.addEventListener('click', () => loadSong(getNextIndex(), !audio.paused));

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
  shuffleBtn.setAttribute('aria-pressed', isShuffle);
  if (isShuffle) rebuildShuffle();
});
repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle('active', isRepeat);
  repeatBtn.setAttribute('aria-pressed', isRepeat);
});
muteBtn.addEventListener('click', () => {
  if (isMuted) { isMuted = false; audio.muted = false; setVolume(prevVolume || 0.8); }
  else { isMuted = true; audio.muted = true; updateVolIcon(0); volumeFill.style.width = '0%'; volumeThumb.style.left = '0%'; volLabel.textContent = '0%'; }
});

togglePLBtn.addEventListener('click', () => {
  const isVisible = playlistPanel.classList.toggle('visible');
  togglePLBtn.classList.toggle('active', isVisible);
});
if (closeQueueBtn) {
  closeQueueBtn.addEventListener('click', () => {
    playlistPanel.classList.remove('visible');
    togglePLBtn.classList.remove('active');
  });
}

if (heartBtn)  heartBtn.addEventListener('click', toggleLike);
if (heartBtn2) heartBtn2.addEventListener('click', toggleLike);

// Right playbar additional buttons
const lyricsBtn = document.getElementById('lyricsBtn');
if (lyricsBtn) {
  lyricsBtn.addEventListener('click', () => {
    showToast('Lyrics not available for this track');
  });
}

const connectDeviceBtn = document.getElementById('connectDeviceBtn');
if (connectDeviceBtn) {
  connectDeviceBtn.addEventListener('click', () => {
    showToast('Device connected: Web Player');
  });
}

const miniplayerBtn = document.getElementById('miniplayerBtn');
if (miniplayerBtn) {
  miniplayerBtn.addEventListener('click', () => {
    showToast('Miniplayer activated');
  });
}

const fullscreenBtn = document.getElementById('fullscreenBtn');
if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => {
          fullscreenBtn.classList.add('active');
          showToast('Entered Fullscreen');
        })
        .catch(() => {
          showToast('Fullscreen not supported');
        });
    } else {
      document.exitFullscreen()
        .then(() => {
          fullscreenBtn.classList.remove('active');
          showToast('Exited Fullscreen');
        });
    }
  });
}
document.addEventListener('fullscreenchange', () => {
  if (fullscreenBtn) {
    fullscreenBtn.classList.toggle('active', !!document.fullscreenElement);
  }
});

/* ---- Keyboard Shortcuts ---- */
document.addEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
  switch (e.key) {
    case ' ': case 'k': e.preventDefault(); if (audio.paused) playSong(); else pauseSong(); break;
    case 'n': loadSong(getNextIndex(), !audio.paused); break;
    case 'p': loadSong(getPrevIndex(), !audio.paused); break;
    case 'ArrowUp':   e.preventDefault(); setVolume(audio.volume + 0.1); break;
    case 'ArrowDown': e.preventDefault(); setVolume(audio.volume - 0.1); break;
    case 'm': muteBtn.click(); break;
    case 's': shuffleBtn.click(); break;
    case 'r': repeatBtn.click(); break;
    case 'l': togglePLBtn.click(); break;
  }
});

/* ---- Scroll wheel on volume ---- */
function handleVolumeWheel(e) {
  e.preventDefault();
  e.stopPropagation();
  const delta = e.deltaY < 0 ? 0.05 : -0.05;
  setVolume(audio.volume + delta);
}
const playbarRight = document.querySelector('.playbar-right');
if (playbarRight) {
  playbarRight.addEventListener('wheel', handleVolumeWheel, { passive: false });
}
if (volumeTrack) {
  volumeTrack.addEventListener('wheel', handleVolumeWheel, { passive: false });
}
if (muteBtn) {
  muteBtn.addEventListener('wheel', handleVolumeWheel, { passive: false });
}

/* ---- History Navigation ---- */
const stateHistory = [];
let historyIndex = -1;
let isNavigatingHistory = false;

function pushHistoryState(state) {
  if (isNavigatingHistory) return;
  
  // Prevent duplicate consecutive states in the history
  if (stateHistory.length > 0 && historyIndex >= 0) {
    const currentState = stateHistory[historyIndex];
    if (currentState.type === state.type) {
      if (state.type === 'playlist' && currentState.id === state.id) {
        return;
      }
      if (state.type === 'search' && currentState.query === state.query) {
        return;
      }
    }
  }

  // If we had navigated back and now push a new state, clear the forward history
  if (historyIndex < stateHistory.length - 1) {
    stateHistory.splice(historyIndex + 1);
  }
  stateHistory.push(state);
  historyIndex = stateHistory.length - 1;
  updateHistoryButtons();
}

function updateHistoryButtons() {
  const backBtn = document.getElementById('navBackBtn');
  const forwardBtn = document.getElementById('navForwardBtn');
  if (backBtn) backBtn.disabled = (historyIndex <= 0);
  if (forwardBtn) forwardBtn.disabled = (historyIndex >= stateHistory.length - 1);
}

function goBack() {
  if (historyIndex > 0) {
    historyIndex--;
    navigateHistoryState(stateHistory[historyIndex]);
  }
}

function goForward() {
  if (historyIndex < stateHistory.length - 1) {
    historyIndex++;
    navigateHistoryState(stateHistory[historyIndex]);
  }
}

function navigateHistoryState(state) {
  isNavigatingHistory = true;
  if (state.type === 'playlist') {
    selectPlaylist(state.id, false); // pass false so we don't push state again
  } else if (state.type === 'search') {
    enterSearchMode(false); // pass false so we don't push state again
    if (searchInput) {
      searchInput.value = state.query;
      if (state.query) {
        clearSearchBtn.style.display = 'block';
        performSearch(state.query);
      } else {
        clearSearchBtn.style.display = 'none';
        searchResults = [...Array(SONGS.length).keys()];
        renderTrackTable();
      }
    }
  }
  isNavigatingHistory = false;
  updateHistoryButtons();
}

/* ---- Search & Navigation Handlers ---- */
const navHome = document.getElementById('navHome');
const navSearch = document.getElementById('navSearch');
const headerHomeBtn = document.getElementById('headerHomeBtn');
const searchInput = document.getElementById('headerSearchInput');
const clearSearchBtn = document.getElementById('headerClearSearchBtn');
const mainHero = document.getElementById('mainHero');
const navBackBtn = document.getElementById('navBackBtn');
const navForwardBtn = document.getElementById('navForwardBtn');

function initSearch() {
  if (navHome) {
    navHome.addEventListener('click', (e) => {
      e.preventDefault();
      selectPlaylist('all');
    });
  }

  if (headerHomeBtn) {
    headerHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      selectPlaylist('all');
    });
  }
  
  if (navSearch) {
    navSearch.addEventListener('click', (e) => {
      e.preventDefault();
      enterSearchMode();
    });
  }

  if (navBackBtn) {
    navBackBtn.addEventListener('click', () => {
      goBack();
    });
  }

  if (navForwardBtn) {
    navForwardBtn.addEventListener('click', () => {
      goForward();
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length > 0) {
        clearSearchBtn.style.display = 'block';
        performSearch(query);
      } else {
        clearSearchBtn.style.display = 'none';
        searchResults = [...Array(SONGS.length).keys()]; // show all songs
        renderTrackTable();
      }
      // Update history state query
      if (historyIndex >= 0 && stateHistory[historyIndex].type === 'search') {
        stateHistory[historyIndex].query = e.target.value;
      }
    });

    // Enter search mode when clicking/focusing search input
    searchInput.addEventListener('focus', () => {
      if (!isSearchMode) {
        enterSearchMode();
      }
    });
  }
  
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.style.display = 'none';
      searchResults = [...Array(SONGS.length).keys()];
      renderTrackTable();
      searchInput.focus();
      
      // Update history state query
      if (historyIndex >= 0 && stateHistory[historyIndex].type === 'search') {
        stateHistory[historyIndex].query = '';
      }
    });
  }
}

function enterSearchMode(shouldPushState = true) {
  isSearchMode = true;
  
  // Highlight search in nav
  if (navHome) navHome.classList.remove('active');
  if (navSearch) navSearch.classList.add('active');
  
  // Remove active playlist highlighting in sidebar
  document.querySelectorAll('.playlist-item').forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');
  });
  
  // Toggle visibility
  if (mainHero) mainHero.classList.add('hidden');
  
  // Focus search input
  if (searchInput) {
    searchInput.focus();
  }
  
  // Render search results (initially all songs or current search text)
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  if (query.length > 0) {
    performSearch(query);
    if (clearSearchBtn) clearSearchBtn.style.display = 'block';
  } else {
    searchResults = [...Array(SONGS.length).keys()];
    renderTrackTable();
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
  }

  if (shouldPushState) {
    pushHistoryState({ type: 'search', query: searchInput ? searchInput.value : '' });
  }
}

function exitSearchMode() {
  isSearchMode = false;
  
  // Highlight home in nav
  if (navHome) navHome.classList.add('active');
  if (navSearch) navSearch.classList.remove('active');
  
  // Toggle visibility
  if (mainHero) mainHero.classList.remove('hidden');
}

function performSearch(query) {
  searchResults = [];
  SONGS.forEach((song, index) => {
    const titleMatch = song.title.toLowerCase().includes(query);
    const artistMatch = song.artist.toLowerCase().includes(query);
    const albumMatch = song.album.toLowerCase().includes(query);
    if (titleMatch || artistMatch || albumMatch) {
      searchResults.push(index);
    }
  });
  renderTrackTable();
}

/* ---- Playlist Options Dropdown ---- */
const bodyMoreBtn = document.querySelector('.body-more-btn');

function initPlaylistOptions() {
  if (bodyMoreBtn) {
    bodyMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPlaylistOptionsDropdown(bodyMoreBtn);
    });
  }
}

function showPlaylistOptionsDropdown(anchorEl) {
  closeAllDropdowns();
  const dropdown = document.getElementById('playlistOptionsDropdown');
  if (!dropdown) return;
  
  const isCustom = activePlaylistId.startsWith('custom-');
  
  const renameEl = document.getElementById('optRename');
  const clearEl = document.getElementById('optClear');
  const deleteEl = document.getElementById('optDelete');
  
  if (isCustom) {
    if (renameEl) renameEl.style.display = 'block';
    if (clearEl) clearEl.style.display = 'block';
    if (deleteEl) deleteEl.style.display = 'block';
  } else {
    if (renameEl) renameEl.style.display = 'none';
    if (clearEl) clearEl.style.display = 'none';
    if (deleteEl) deleteEl.style.display = 'none';
  }
  
  let queueOpt = document.getElementById('optPlayNext');
  if (!queueOpt) {
    queueOpt = document.createElement('div');
    queueOpt.className = 'dropdown-item';
    queueOpt.id = 'optPlayNext';
    queueOpt.textContent = 'Add Playlist to Queue';
    dropdown.appendChild(queueOpt);
  }
  
  queueOpt.onclick = () => {
    showToast(`Playlist added to queue`);
    dropdown.classList.remove('show');
  };
  
  if (isCustom) {
    renameEl.onclick = () => {
      dropdown.classList.remove('show');
      const pl = playlists[activePlaylistId];
      const newName = prompt(`Rename playlist "${pl.title}" to:`, pl.title);
      if (newName && newName.trim()) {
        pl.title = newName.trim();
        buildSidebarPlaylists();
        selectPlaylist(activePlaylistId);
        showToast(`Playlist renamed to "${pl.title}"`);
      }
    };
    
    clearEl.onclick = () => {
      dropdown.classList.remove('show');
      if (confirm(`Are you sure you want to remove all songs from this playlist?`)) {
        playlists[activePlaylistId].songs = [];
        buildSidebarPlaylists();
        selectPlaylist(activePlaylistId);
        showToast(`Playlist cleared`);
      }
    };
    
    deleteEl.onclick = () => {
      dropdown.classList.remove('show');
      if (confirm(`Are you sure you want to delete this playlist?`)) {
        const title = playlists[activePlaylistId].title;
        delete playlists[activePlaylistId];
        buildSidebarPlaylists();
        selectPlaylist('all');
        showToast(`Playlist "${title}" deleted`);
      }
    };
  }
  
  const rect = anchorEl.getBoundingClientRect();
  dropdown.style.left = `${rect.left}px`;
  dropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;
  
  dropdown.classList.add('show');
}

/* ---- Header Dropdowns ---- */
function initHeaderDropdowns() {
  const menuDotsBtn = document.getElementById('menuDotsBtn');
  const searchBrowseBtn = document.getElementById('searchBrowseBtn');
  const whatsNewBtn = document.getElementById('whatsNewBtn');
  const friendActivityBtn = document.getElementById('friendActivityBtn');
  const profileBtn = document.getElementById('profileBtn');

  // Bind trigger buttons
  if (menuDotsBtn) {
    menuDotsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown('menuDropdown', menuDotsBtn, false);
    });
  }

  if (searchBrowseBtn) {
    searchBrowseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown('browseDropdown', searchBrowseBtn, false);
    });
  }

  if (whatsNewBtn) {
    whatsNewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown('notificationsDropdown', whatsNewBtn, true);
    });
  }

  if (friendActivityBtn) {
    friendActivityBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown('friendActivityDropdown', friendActivityBtn, true);
    });
  }

  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown('profileDropdown', profileBtn, true);
    });
  }

  // Bind dropdown item clicks
  // 1. Menu Items
  const menuAbout = document.getElementById('menuAbout');
  if (menuAbout) menuAbout.addEventListener('click', () => { showToast('Spotify Web Player Mock — Task 4'); closeAllDropdowns(); });
  
  const menuPrefs = document.getElementById('menuPrefs');
  if (menuPrefs) menuPrefs.addEventListener('click', () => { showToast('Preferences dialog simulation loaded.'); closeAllDropdowns(); });
  
  const menuShortcuts = document.getElementById('menuShortcuts');
  if (menuShortcuts) menuShortcuts.addEventListener('click', () => { showToast('Shortcuts: Space/K (Play), N/P (Next/Prev), M (Mute), S (Shuffle), R (Repeat)'); closeAllDropdowns(); });
  
  const menuUpdates = document.getElementById('menuUpdates');
  if (menuUpdates) menuUpdates.addEventListener('click', () => { showToast('Your app is fully up-to-date!'); closeAllDropdowns(); });

  // 2. Browse Items
  const browseDropdown = document.getElementById('browseDropdown');
  if (browseDropdown) {
    browseDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const plId = item.dataset.pl;
        if (plId && playlists[plId]) {
          selectPlaylist(plId);
          showToast(`Genre category selected: ${playlists[plId].title}`);
        }
        closeAllDropdowns();
      });
    });
  }

  // 3. Notifications Items
  const clearNotifications = document.getElementById('clearNotifications');
  if (clearNotifications) {
    clearNotifications.addEventListener('click', () => {
      const parent = clearNotifications.parentElement;
      const header = parent.querySelector('.dropdown-header');
      parent.innerHTML = '';
      if (header) parent.appendChild(header);
      
      const emptyMsg = document.createElement('div');
      emptyMsg.className = 'dropdown-item';
      emptyMsg.style.color = 'var(--text-muted)';
      emptyMsg.style.textAlign = 'center';
      emptyMsg.style.pointerEvents = 'none';
      emptyMsg.textContent = 'No new notifications';
      parent.appendChild(emptyMsg);
      
      showToast('Notifications dismissed');
      closeAllDropdowns();
    });
  }

  // 4. Friend Activity Items
  const findFriends = document.getElementById('findFriends');
  if (findFriends) {
    findFriends.addEventListener('click', () => {
      showToast('Searching Facebook and Contacts for friends...');
      closeAllDropdowns();
    });
  }

  // 5. Profile Items
  const profAccount = document.getElementById('profAccount');
  if (profAccount) profAccount.addEventListener('click', () => { showToast('Opening Account Settings overview...'); closeAllDropdowns(); });
  
  const profUpgrade = document.getElementById('profUpgrade');
  if (profUpgrade) profUpgrade.addEventListener('click', () => { showToast('Upgraded successfully to simulated Premium!'); closeAllDropdowns(); });
  
  const profLogout = document.getElementById('profLogout');
  if (profLogout) profLogout.addEventListener('click', () => { showToast('Simulating user session log out...'); closeAllDropdowns(); });
}

/* ---- Init ---- */
function init() {
  buildSidebarPlaylists();
  cacheAllDurations();
  initSearch();
  initPlaylistOptions();
  initHeaderDropdowns();
  
  // Register global document click handler to close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideDropdown = e.target.closest('.dropdown-menu');
    const isClickOnTrigger = e.target.closest('.add-to-pl-btn') || 
                             e.target.closest('.body-more-btn') ||
                             e.target.closest('#menuDotsBtn') ||
                             e.target.closest('#searchBrowseBtn') ||
                             e.target.closest('#whatsNewBtn') ||
                             e.target.closest('#friendActivityBtn') ||
                             e.target.closest('#profileBtn');
                             
    if (!isClickInsideDropdown && !isClickOnTrigger) {
      closeAllDropdowns();
    }
  });

  // Sidebar Collapse / Expand toggle
  const sidebar = document.getElementById('sidebar');
  const collapseSidebarBtn = document.getElementById('collapseSidebarBtn');
  const libraryTitleBtn = document.getElementById('libraryTitleBtn');
  
  function toggleSidebarCollapse() {
    if (!sidebar) return;
    const isCollapsed = sidebar.classList.toggle('collapsed');
    
    // Update tooltip titles
    if (collapseSidebarBtn) {
      collapseSidebarBtn.title = isCollapsed ? 'Expand Library' : 'Collapse Library';
    }
    if (libraryTitleBtn) {
      libraryTitleBtn.title = isCollapsed ? 'Expand Library' : 'Collapse Library';
    }
  }

  if (collapseSidebarBtn) {
    collapseSidebarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebarCollapse();
    });
  }
  if (libraryTitleBtn) {
    libraryTitleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebarCollapse();
    });
  }

  selectPlaylist('all');
  loadSong(0, false);
  setVolume(0.8);
}

init();
