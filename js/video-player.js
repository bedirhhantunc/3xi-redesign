// video-player.js — Custom video player with Vimeo SDK
// Vanilla JS adaptation of the shadcn VideoPlayer React component

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Vimeo === 'undefined') return;

  document.querySelectorAll('[data-vimeo]').forEach(el => {
    initPlayer(el);
  });
});

function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function initPlayer(el) {
  const vimeoId = el.dataset.vimeo;
  const frameEl = el.querySelector('.vp__frame');
  const overlay = el.querySelector('.vp__overlay');
  const bigPlay = el.querySelector('.vp__big-play');
  const playBtn = el.querySelector('[data-playpause]');
  const muteBtn = el.querySelector('[data-mute]');
  const seekTrack = el.querySelector('[data-seek]');
  const seekFill = seekTrack.querySelector('.vp__slider-fill');
  const volTrack = el.querySelector('[data-volume]');
  const volFill = volTrack.querySelector('.vp__slider-fill');
  const timeCurrent = el.querySelector('[data-current]');
  const timeDuration = el.querySelector('[data-duration]');
  const speedBtns = el.querySelectorAll('[data-speed]');

  // State
  let isPlaying = false;
  let isMuted = false;
  let volume = 1;

  // Initialize Vimeo player
  const player = new Vimeo.Player(frameEl, {
    id: parseInt(vimeoId),
    responsive: true,
    controls: false,
    title: false,
    byline: false,
    portrait: false
  });

  // Disable iframe pointer events so our overlay captures clicks
  player.ready().then(() => {
    const iframe = frameEl.querySelector('iframe');
    if (iframe) iframe.style.pointerEvents = 'none';
  });

  // ---- Play / Pause ----
  function togglePlay() {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }

  overlay.addEventListener('click', togglePlay);
  bigPlay.addEventListener('click', togglePlay);
  playBtn.addEventListener('click', togglePlay);

  player.on('play', () => {
    isPlaying = true;
    el.classList.add('vp--playing');
  });

  player.on('pause', () => {
    isPlaying = false;
    el.classList.remove('vp--playing');
  });

  player.on('ended', () => {
    isPlaying = false;
    el.classList.remove('vp--playing');
  });

  // ---- Time update ----
  player.on('timeupdate', (data) => {
    const pct = data.percent * 100;
    seekFill.style.width = pct + '%';
    timeCurrent.textContent = formatTime(data.seconds);
    timeDuration.textContent = formatTime(data.duration);
  });

  // ---- Seek ----
  seekTrack.addEventListener('click', (e) => {
    const rect = seekTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    player.getDuration().then(dur => {
      player.setCurrentTime(pct * dur);
    });
  });

  // ---- Mute toggle ----
  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    if (isMuted) {
      player.setVolume(0);
      volFill.style.width = '0%';
    } else {
      volume = volume || 1;
      player.setVolume(volume);
      volFill.style.width = (volume * 100) + '%';
    }
    updateVolumeState();
  });

  // ---- Volume slider ----
  volTrack.addEventListener('click', (e) => {
    const rect = volTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    volume = pct;
    isMuted = volume === 0;
    player.setVolume(volume);
    volFill.style.width = (volume * 100) + '%';
    updateVolumeState();
  });

  function updateVolumeState() {
    el.classList.toggle('vp--muted', isMuted);
    el.classList.toggle('vp--vol-low', !isMuted && volume <= 0.5);
  }

  // ---- Playback speed ----
  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const speed = parseFloat(btn.dataset.speed);
      player.setPlaybackRate(speed);
      speedBtns.forEach(b => b.classList.remove('vp__spd--on'));
      btn.classList.add('vp__spd--on');
    });
  });
}
