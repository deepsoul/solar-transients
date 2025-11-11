<template>
  <div
    class="w-full h-32 relative overflow-hidden cursor-none"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Sound Toggle Button -->
    <div class="absolute top-2 right-2 z-10 flex gap-2">
      <button
        @click="resetRhythm"
        class="p-2 bg-solar-dark/80 hover:bg-solar-dark rounded-full transition-colors duration-300 text-solar-light/70 hover:text-solar-orange"
        aria-label="Reset rhythm"
        title="Reset rhythm"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
          />
        </svg>
      </button>
      <button
        @click="toggleSound"
        class="p-2 bg-solar-dark/80 hover:bg-solar-dark rounded-full transition-colors duration-300"
        :class="{
          'text-solar-orange': soundEnabled,
          'text-solar-light/50': !soundEnabled,
        }"
        aria-label="Toggle sound effects"
      >
        <svg
          v-if="soundEnabled"
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
          />
        </svg>
        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
          />
        </svg>
      </button>
    </div>
    <svg
      class="w-full h-full"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Wave 1 - Main wave (Kick) -->
      <path
        :d="wave1Path"
        fill="none"
        stroke="url(#gradient1)"
        stroke-width="2"
        :opacity="activeSounds.kick ? 1 : 0.8"
        class="wave-1 cursor-pointer"
        @mouseenter="activateSound('kick')"
        @mouseleave="deactivateSound('kick')"
      />

      <!-- Wave 2 - Secondary wave (Snare) -->
      <path
        :d="wave2Path"
        fill="none"
        stroke="url(#gradient2)"
        stroke-width="1.5"
        :opacity="activeSounds.snare ? 1 : 0.6"
        class="wave-2 cursor-pointer"
        @mouseenter="activateSound('snare')"
        @mouseleave="deactivateSound('snare')"
      />

      <!-- Wave 3 - Background wave (Bass) -->
      <path
        :d="wave3Path"
        fill="none"
        stroke="url(#gradient3)"
        stroke-width="1"
        :opacity="activeSounds.bass ? 1 : 0.4"
        class="wave-3 cursor-pointer"
        @mouseenter="activateSound('bass')"
        @mouseleave="deactivateSound('bass')"
      />

      <!-- Wave 4 - Accent wave (Hi-Hat) -->
      <path
        :d="wave4Path"
        fill="none"
        stroke="url(#gradient4)"
        stroke-width="1.2"
        :opacity="activeSounds.hihat ? 1 : 0.7"
        class="wave-4 cursor-pointer"
        @mouseenter="activateSound('hihat')"
        @mouseleave="deactivateSound('hihat')"
      />

      <!-- Wave 5 - High frequency wave (Synth) -->
      <path
        :d="wave5Path"
        fill="none"
        stroke="url(#gradient5)"
        stroke-width="0.8"
        :opacity="activeSounds.synth ? 1 : 0.5"
        class="wave-5 cursor-pointer"
        @mouseenter="activateSound('synth')"
        @mouseleave="deactivateSound('synth')"
      />

      <!-- Mouse Trail Wave -->
      <path
        v-if="mousePosition.x > 0"
        :d="mouseTrailPath"
        fill="none"
        stroke="url(#gradientMouse)"
        stroke-width="2"
        opacity="0.9"
        class="mouse-trail"
      />

      <!-- Gradients -->
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            :style="`stop-color:${colors.orange};stop-opacity:0.8`"
          />
          <stop
            offset="50%"
            :style="`stop-color:${colors.gold};stop-opacity:0.6`"
          />
          <stop
            offset="100%"
            :style="`stop-color:${colors.orange};stop-opacity:0.8`"
          />
        </linearGradient>

        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            :style="`stop-color:${colors.orange};stop-opacity:0.6`"
          />
          <stop
            offset="50%"
            :style="`stop-color:${colors.purple};stop-opacity:0.4`"
          />
          <stop
            offset="100%"
            :style="`stop-color:${colors.orange};stop-opacity:0.6`"
          />
        </linearGradient>

        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            :style="`stop-color:${colors.cyan};stop-opacity:0.3`"
          />
          <stop
            offset="50%"
            :style="`stop-color:${colors.orange};stop-opacity:0.2`"
          />
          <stop
            offset="100%"
            :style="`stop-color:${colors.cyan};stop-opacity:0.3`"
          />
        </linearGradient>

        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            :style="`stop-color:${colors.gold};stop-opacity:0.5`"
          />
          <stop
            offset="50%"
            :style="`stop-color:${colors.orange};stop-opacity:0.4`"
          />
          <stop
            offset="100%"
            :style="`stop-color:${colors.gold};stop-opacity:0.5`"
          />
        </linearGradient>

        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            :style="`stop-color:${colors.purple};stop-opacity:0.4`"
          />
          <stop
            offset="50%"
            :style="`stop-color:${colors.cyan};stop-opacity:0.3`"
          />
          <stop
            offset="100%"
            :style="`stop-color:${colors.purple};stop-opacity:0.4`"
          />
        </linearGradient>

        <linearGradient id="gradientMouse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            :style="`stop-color:${colors.orange};stop-opacity:1`"
          />
          <stop
            offset="30%"
            :style="`stop-color:${colors.gold};stop-opacity:0.9`"
          />
          <stop
            offset="70%"
            :style="`stop-color:${colors.gold};stop-opacity:0.9`"
          />
          <stop
            offset="100%"
            :style="`stop-color:${colors.orange};stop-opacity:1`"
          />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from 'vue';

const time = ref(0);
const animationId = ref<number | null>(null);
const mousePosition = ref({x: 0, y: 0});
const mouseTrail = ref<Array<{x: number; y: number; time: number}>>([]);
const soundEnabled = ref(false);
const audioContext = ref<AudioContext | null>(null);
const lastSoundTime = ref(0);
const beatInterval = ref<number | null>(null);
const currentBeat = ref(0);
const bpm = ref(128); // Deep House BPM
const beatsPerBar = 16; // 16th notes for more granular control
const mouseSpeed = ref(0); // Mouse movement speed
const lastMouseTime = ref(0);
const lastMousePos = ref({x: 0, y: 0});
const dynamicVolume = ref(0.3); // Dynamic volume based on mouse
const dynamicFilter = ref(200); // Dynamic filter based on mouse position

// Active sounds system - builds rhythm progressively
const activeSounds = ref({
  kick: false,
  snare: false,
  bass: false,
  hihat: false,
  synth: false,
});

const colors = {
  orange: '#ff6b35',
  gold: '#f7931e',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
};

// Wave generation functions
function generateWave(
  amplitude: number,
  frequency: number,
  phase: number,
  offset: number,
  width: number = 1200,
  height: number = 120,
) {
  const points = [];
  const centerY = height / 2;

  for (let x = 0; x <= width; x += 2) {
    const y =
      centerY +
      amplitude * Math.sin(((x * frequency + phase) * Math.PI) / 180) +
      offset;
    points.push(`${x},${y}`);
  }

  return `M ${points.join(' L ')}`;
}

const wave1Path = computed(() => generateWave(25, 0.8, time.value * 0.2, 0));

const wave2Path = computed(() => generateWave(18, 1.2, time.value * 0.3, 5));

const wave3Path = computed(() => generateWave(35, 0.4, time.value * 0.1, -8));

const wave4Path = computed(() => generateWave(12, 1.8, time.value * 0.4, 3));

const wave5Path = computed(() => generateWave(8, 2.5, time.value * 0.5, -2));

const mouseTrailPath = computed(() => {
  if (mouseTrail.value.length < 2) return '';

  const points = mouseTrail.value.map((point) => `${point.x},${point.y}`);
  return `M ${points.join(' L ')}`;
});

function animate() {
  time.value += 0.5; // Langsamere Animation
  animationId.value = requestAnimationFrame(animate);
}

function handleMouseMove(event: MouseEvent) {
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 1200; // SVG ViewBox width
  const y = ((event.clientY - rect.top) / rect.height) * 120; // SVG ViewBox height

  const now = Date.now();

  // Calculate mouse speed
  if (lastMouseTime.value > 0) {
    const timeDelta = (now - lastMouseTime.value) / 1000; // seconds
    const distance = Math.sqrt(
      Math.pow(x - lastMousePos.value.x, 2) +
        Math.pow(y - lastMousePos.value.y, 2),
    );
    mouseSpeed.value = distance / timeDelta; // pixels per second

    // Update BPM based on mouse speed (100-160 BPM range)
    // Faster movement = faster BPM
    const normalizedSpeed = Math.min(mouseSpeed.value / 500, 1); // Normalize to 0-1
    bpm.value = 100 + normalizedSpeed * 60; // 100-160 BPM

    // Restart beat with new BPM if sound is enabled
    if (soundEnabled.value && beatInterval.value) {
      stopBeat();
      startBeat();
    }
  }

  lastMouseTime.value = now;
  lastMousePos.value = {x, y};
  mousePosition.value = {x, y};

  // Update dynamic parameters based on mouse position
  // X position (0-1200) affects filter frequency (200-2000 Hz)
  dynamicFilter.value = 200 + (x / 1200) * 1800;

  // Y position (0-120) affects volume (0.1-0.5)
  // Lower Y = higher volume (inverted)
  dynamicVolume.value = 0.1 + ((120 - y) / 120) * 0.4;

  // Füge Punkt zur Spur hinzu
  mouseTrail.value.push({x, y, time: now});

  // Behalte nur die letzten 20 Punkte
  if (mouseTrail.value.length > 20) {
    mouseTrail.value.shift();
  }

  // Trigger synth sound on mouse movement (adds to the beat)
  if (soundEnabled.value && Math.random() < 0.2) {
    generateSynthSound(x / 1200); // Use x position to vary pitch
  }
}

function handleMouseLeave() {
  // Reset to default BPM when mouse leaves
  bpm.value = 128;
  dynamicVolume.value = 0.3;
  dynamicFilter.value = 200;
  mouseSpeed.value = 0;

  // Restart beat with default BPM
  if (soundEnabled.value && beatInterval.value) {
    stopBeat();
    startBeat();
  }

  // Verstecke die Spur langsam
  setTimeout(() => {
    mousePosition.value = {x: 0, y: 0};
    mouseTrail.value = [];
  }, 1000);
}

// Sound Generation Functions
function initAudioContext() {
  if (!audioContext.value) {
    audioContext.value = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }
}

function generateDeepHouseSound() {
  if (!soundEnabled.value || !audioContext.value) return;

  const now = Date.now();
  if (now - lastSoundTime.value < 200) return; // Throttle sounds

  lastSoundTime.value = now;

  const ctx = audioContext.value;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // Deep House characteristics
  const baseFreq = 60 + Math.random() * 40; // 60-100 Hz (deep bass)
  const duration = 0.1 + Math.random() * 0.3; // 0.1-0.4 seconds

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime);

  // Add some randomness to frequency
  oscillator.frequency.exponentialRampToValueAtTime(
    baseFreq * (0.8 + Math.random() * 0.4),
    ctx.currentTime + duration,
  );

  // Low-pass filter for deep house sound
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200 + Math.random() * 300, ctx.currentTime);
  filter.Q.setValueAtTime(1, ctx.currentTime);

  // Envelope
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  // Connect nodes
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Play sound
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

// Deep House Beat Pattern (16th notes)
// 1 = play, 0 = rest
const kickPattern = [
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0, // Kick on 1 and 9
];
const snarePattern = [
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0, // Snare on 5 and 13 (2 and 4)
];
const hihatPattern = [
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1, // Hi-hat on off-beats
];
const openHihatPattern = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0, // Open hi-hat (can be customized)
];

// Synth bass pattern (plays on certain beats)
const bassPattern = [
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0, // Bass line pattern
];

// Drum Sound Functions
function playKickDrum(ctx: AudioContext, time: number) {
  // Kick drum - low frequency with quick attack
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(60, time);
  oscillator.frequency.exponentialRampToValueAtTime(30, time + 0.1);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(dynamicFilter.value, time);

  gainNode.gain.setValueAtTime(0, time);
  gainNode.gain.linearRampToValueAtTime(dynamicVolume.value, time + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(time);
  oscillator.stop(time + 0.2);
}

function playSnareDrum(ctx: AudioContext, time: number) {
  // Snare - noise with tone
  const noise = ctx.createBufferSource();
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);

  // Generate white noise
  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }

  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();

  // Tone component
  const toneOsc = ctx.createOscillator();
  const toneGain = ctx.createGain();

  toneOsc.type = 'triangle';
  toneOsc.frequency.setValueAtTime(200, time);
  toneOsc.frequency.exponentialRampToValueAtTime(100, time + 0.1);

  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(1000, time);
  noiseFilter.Q.setValueAtTime(0.5, time);

  noiseGain.gain.setValueAtTime(0, time);
  noiseGain.gain.linearRampToValueAtTime(
    dynamicVolume.value * 0.7,
    time + 0.01,
  );
  noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

  toneGain.gain.setValueAtTime(0, time);
  toneGain.gain.linearRampToValueAtTime(dynamicVolume.value * 0.5, time + 0.01);
  toneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

  noise.buffer = noiseBuffer;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  toneOsc.connect(toneGain);
  toneGain.connect(ctx.destination);

  noise.start(time);
  noise.stop(time + 0.1);

  toneOsc.start(time);
  toneOsc.stop(time + 0.15);
}

function playHiHat(ctx: AudioContext, time: number) {
  // Hi-hat - high frequency noise
  const noise = ctx.createBufferSource();
  const noiseBuffer = ctx.createBuffer(
    1,
    ctx.sampleRate * 0.05,
    ctx.sampleRate,
  );
  const noiseData = noiseBuffer.getChannelData(0);

  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }

  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'highpass';
  filter.frequency.setValueAtTime(8000, time);
  filter.Q.setValueAtTime(0.5, time);

  gainNode.gain.setValueAtTime(0, time);
  gainNode.gain.linearRampToValueAtTime(
    dynamicVolume.value * 0.3,
    time + 0.001,
  );
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

  noise.buffer = noiseBuffer;
  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  noise.start(time);
  noise.stop(time + 0.05);
}

function playOpenHiHat(ctx: AudioContext, time: number) {
  // Open hi-hat - longer decay
  const noise = ctx.createBufferSource();
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);

  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }

  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'highpass';
  filter.frequency.setValueAtTime(6000, time);
  filter.Q.setValueAtTime(0.3, time);

  gainNode.gain.setValueAtTime(0, time);
  gainNode.gain.linearRampToValueAtTime(0.12, time + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

  noise.buffer = noiseBuffer;
  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  noise.start(time);
  noise.stop(time + 0.2);
}

function playBass(ctx: AudioContext, time: number) {
  // Deep house bass - sub bass with some character
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(55, time); // A1 note

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(Math.min(dynamicFilter.value, 300), time);
  filter.Q.setValueAtTime(1, time);

  gainNode.gain.setValueAtTime(0, time);
  gainNode.gain.linearRampToValueAtTime(dynamicVolume.value * 0.7, time + 0.01);
  gainNode.gain.setValueAtTime(dynamicVolume.value * 0.7, time + 0.15);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(time);
  oscillator.stop(time + 0.2);
}

function generateSynthSound(position: number) {
  // Position-based synth sound (0-1 range)
  if (!soundEnabled.value || !audioContext.value) return;

  const ctx = audioContext.value;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // Map position to frequency (200-800 Hz)
  const baseFreq = 200 + position * 600;
  const duration = 0.1 + Math.random() * 0.2;

  oscillator.type = Math.random() > 0.5 ? 'sawtooth' : 'square';
  oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(baseFreq * 2, ctx.currentTime);
  filter.Q.setValueAtTime(1, ctx.currentTime);

  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

// Sound activation system
function activateSound(soundType: keyof typeof activeSounds.value) {
  activeSounds.value[soundType] = true;

  // Play a preview sound when activated
  if (soundEnabled.value && audioContext.value) {
    const ctx = audioContext.value;
    const currentTime = ctx.currentTime;

    switch (soundType) {
      case 'kick':
        playKickDrum(ctx, currentTime);
        break;
      case 'snare':
        playSnareDrum(ctx, currentTime);
        break;
      case 'bass':
        playBass(ctx, currentTime);
        break;
      case 'hihat':
        playHiHat(ctx, currentTime);
        break;
      case 'synth':
        generateSynthSound(0.5); // Middle frequency
        break;
    }
  }
}

function deactivateSound(soundType: keyof typeof activeSounds.value) {
  // Don't deactivate immediately - keep the sound active
  // This allows the rhythm to build up
}

function resetRhythm() {
  // Reset all active sounds
  activeSounds.value = {
    kick: false,
    snare: false,
    bass: false,
    hihat: false,
    synth: false,
  };

  // Reset BPM and other parameters
  bpm.value = 128;
  dynamicVolume.value = 0.3;
  dynamicFilter.value = 200;
  mouseSpeed.value = 0;
  currentBeat.value = 0;

  // Restart beat if sound is enabled
  if (soundEnabled.value && beatInterval.value) {
    stopBeat();
    startBeat();
  }
}

// Beat Sequencer
function startBeat() {
  if (!audioContext.value || beatInterval.value) return;

  const beatDuration = (60 / bpm.value / beatsPerBar) * 1000; // ms per 16th note

  beatInterval.value = window.setInterval(() => {
    if (!audioContext.value || !soundEnabled.value) return;

    const ctx = audioContext.value;
    const currentTime = ctx.currentTime;

    // Play sounds based on pattern AND active sounds
    if (activeSounds.value.kick && kickPattern[currentBeat.value]) {
      playKickDrum(ctx, currentTime);
    }
    if (activeSounds.value.snare && snarePattern[currentBeat.value]) {
      playSnareDrum(ctx, currentTime);
    }
    if (activeSounds.value.hihat && hihatPattern[currentBeat.value]) {
      playHiHat(ctx, currentTime);
    }
    if (openHihatPattern[currentBeat.value]) {
      // Open hi-hat can play independently
      playOpenHiHat(ctx, currentTime);
    }
    if (activeSounds.value.bass && bassPattern[currentBeat.value]) {
      playBass(ctx, currentTime);
    }
    // Synth plays on random beats when active
    if (activeSounds.value.synth && Math.random() < 0.3) {
      generateSynthSound(Math.random());
    }

    // Advance beat
    currentBeat.value = (currentBeat.value + 1) % beatsPerBar;
  }, beatDuration);
}

function stopBeat() {
  if (beatInterval.value) {
    clearInterval(beatInterval.value);
    beatInterval.value = null;
  }
  currentBeat.value = 0;
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value;

  if (soundEnabled.value) {
    initAudioContext();
    // Resume audio context if suspended
    if (audioContext.value?.state === 'suspended') {
      audioContext.value.resume();
    }
    // Start the beat
    startBeat();
  } else {
    // Stop the beat and reset rhythm
    stopBeat();
    resetRhythm();
  }
}

onMounted(() => {
  animate();
});

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }

  // Stop beat
  stopBeat();

  // Cleanup audio context
  if (audioContext.value) {
    audioContext.value.close();
  }
});
</script>

<style scoped>
.wave-1 {
  animation: wave-move-1 16s ease-in-out infinite;
}

.wave-2 {
  animation: wave-move-2 12s ease-in-out infinite;
}

.wave-3 {
  animation: wave-move-3 20s ease-in-out infinite;
}

.wave-4 {
  animation: wave-move-4 8s ease-in-out infinite;
}

.wave-5 {
  animation: wave-move-5 6s ease-in-out infinite;
}

.mouse-trail {
  animation: mouse-trail-fade 2s ease-out;
}

@keyframes wave-move-1 {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

@keyframes wave-move-2 {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-15px);
  }
}

@keyframes wave-move-3 {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}

@keyframes wave-move-4 {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
}

@keyframes wave-move-5 {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-8px);
  }
}

@keyframes mouse-trail-fade {
  0% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
  }
}
</style>
