// Web Audio API Procedural Synthesizer for Festive Diwali Ambience & SFX

let audioCtx = null;
let ambientGain = null;
let isMuted = false;
let isPlayingAmbient = false;
let ambientOscillators = [];
let ambientInterval = null;

// Initialize or resume audio context on user gesture
export function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      ambientGain = audioCtx.createGain();
      ambientGain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      ambientGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Toggle Mute
export function toggleMute() {
  isMuted = !isMuted;
  if (ambientGain && audioCtx) {
    ambientGain.gain.setValueAtTime(isMuted ? 0 : 0.18, audioCtx.currentTime);
  }
  return isMuted;
}

export function getMuteState() {
  return isMuted;
}

// Play Temple Bell / Sacred Diya Light Chime
export function playDiyaLightSound() {
  if (isMuted) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Harmonic chime frequencies (G major / meditative Indian temple bell)
  const freqs = [392, 587.33, 783.99, 1174.66, 1567.98];
  
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    // Slight vibrato
    osc.frequency.exponentialRampToValueAtTime(freq * 0.998, now + 2.5);

    const initialGain = (0.2 / (idx + 1));
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(initialGain, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 + (idx * 0.2));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.0);
  });
}

// Play Rocket Launch Whistle
export function playRocketLaunchSound() {
  if (isMuted) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.8);

  // Bandpass filter to create whooshing whistle
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(1800, now + 0.8);
  filter.Q.value = 8;

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.85);
}

// Play Firework Explosion / Boom & Crackle
export function playExplosionSound(size = 'medium') {
  if (isMuted) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = size === 'large' ? 1.4 : 0.8;

  // 1. Low Thud (Boom)
  const boomOsc = ctx.createOscillator();
  const boomGain = ctx.createGain();
  boomOsc.type = 'sine';
  boomOsc.frequency.setValueAtTime(120, now);
  boomOsc.frequency.exponentialRampToValueAtTime(30, now + 0.5);

  boomGain.gain.setValueAtTime(0.4, now);
  boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  boomOsc.connect(boomGain);
  boomGain.connect(ctx.destination);
  boomOsc.start(now);
  boomOsc.stop(now + 0.6);

  // 2. White Noise Burst for Crackle & Dispersal
  const bufferSize = ctx.sampleRate * duration;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // create random noise with slight exponential decay bursts
    output[i] = (Math.random() * 2 - 1) * Math.exp(-3 * (i / bufferSize));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.setValueAtTime(1200, now);
  noiseFilter.frequency.linearRampToValueAtTime(400, now + duration);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.25, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

// Play Chakri (Ground Spinner) Sizzle & Whoosh
export function playChakriSound() {
  if (isMuted) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 2.0;

  // Modulated noise + spinning oscillator
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(240, now);
  osc.frequency.linearRampToValueAtTime(600, now + 0.5);
  osc.frequency.linearRampToValueAtTime(350, now + duration);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

// Play Flowerpot (Anar) Fountain Sound
export function playFlowerpotSound() {
  if (isMuted) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 2.5;

  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (0.8 + 0.2 * Math.sin(i / 100));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(800, now);
  bandpass.frequency.linearRampToValueAtTime(2500, now + 1.2);
  bandpass.frequency.linearRampToValueAtTime(1200, now + duration);
  bandpass.Q.value = 4;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.5);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

// Play Sparkler (Phuljhadi) Fizzle
export function playSparklerSound() {
  if (isMuted) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.4;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 3500;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

// Continuous Procedural Ambient Traditional Raag Melody / Tanpura
export function startAmbientMusic() {
  if (isPlayingAmbient) return;
  const ctx = initAudio();
  if (!ctx) return;

  isPlayingAmbient = true;

  // Indian classical raga notes (Bhairav / Kalyan meditative scale)
  // Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa'
  const rootFreq = 146.83; // D3 root
  const ragaScale = [
    rootFreq * 1,        // Sa
    rootFreq * (9/8),    // Re (165.18 Hz)
    rootFreq * (5/4),    // Ga (183.54 Hz)
    rootFreq * (4/3),    // Ma (195.77 Hz)
    rootFreq * (3/2),    // Pa (220.25 Hz)
    rootFreq * (5/3),    // Dha (244.72 Hz)
    rootFreq * (15/8),   // Ni (275.31 Hz)
    rootFreq * 2,        // Sa' (293.66 Hz)
    rootFreq * (9/4),    // Re'
    rootFreq * (5/2),    // Ga'
  ];

  // Tanpura Drone Foundation (Continuous warm soothing drone)
  const droneFreqs = [rootFreq * 0.75, rootFreq, rootFreq * 1.5];
  droneFreqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.value = 0.04;
    osc.connect(gain);
    gain.connect(ambientGain);
    osc.start();
    ambientOscillators.push(osc);
  });

  // Melodic Sitar / Flute Plucks periodically
  let noteIndex = 0;
  const melodyPattern = [0, 2, 4, 3, 4, 7, 6, 4, 2, 4, 7, 9, 7, 4, 0];

  ambientInterval = setInterval(() => {
    if (!isPlayingAmbient || isMuted || !audioCtx) return;

    const noteFreq = ragaScale[melodyPattern[noteIndex % melodyPattern.length]];
    noteIndex++;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(noteFreq * (Math.random() > 0.4 ? 2 : 1), now);

    // Warm envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(gain);
    gain.connect(ambientGain);

    osc.start(now);
    osc.stop(now + 2.4);
  }, 950);
}

export function stopAmbientMusic() {
  isPlayingAmbient = false;
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
  ambientOscillators.forEach(osc => {
    try { osc.stop(); } catch (e) {}
  });
  ambientOscillators = [];
}
