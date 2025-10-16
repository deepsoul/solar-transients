<template>
  <div
    class="w-full h-32 relative overflow-hidden cursor-none"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Sound Toggle Button -->
    <div class="absolute top-2 right-2 z-10">
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
      <!-- Wave 1 - Main wave -->
      <path
        :d="wave1Path"
        fill="none"
        stroke="url(#gradient1)"
        stroke-width="2"
        opacity="0.8"
        class="wave-1"
      />

      <!-- Wave 2 - Secondary wave -->
      <path
        :d="wave2Path"
        fill="none"
        stroke="url(#gradient2)"
        stroke-width="1.5"
        opacity="0.6"
        class="wave-2"
      />

      <!-- Wave 3 - Background wave -->
      <path
        :d="wave3Path"
        fill="none"
        stroke="url(#gradient3)"
        stroke-width="1"
        opacity="0.4"
        class="wave-3"
      />

      <!-- Wave 4 - Accent wave -->
      <path
        :d="wave4Path"
        fill="none"
        stroke="url(#gradient4)"
        stroke-width="1.2"
        opacity="0.7"
        class="wave-4"
      />

      <!-- Wave 5 - High frequency wave -->
      <path
        :d="wave5Path"
        fill="none"
        stroke="url(#gradient5)"
        stroke-width="0.8"
        opacity="0.5"
        class="wave-5"
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

  // Trigger random deep house sounds occasionally
  if (soundEnabled.value && Math.random() < 0.01) {
    // 1% chance per frame
    generateDeepHouseSound();
  }

  animationId.value = requestAnimationFrame(animate);
}

function handleMouseMove(event: MouseEvent) {
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 1200; // SVG ViewBox width
  const y = ((event.clientY - rect.top) / rect.height) * 120; // SVG ViewBox height

  mousePosition.value = {x, y};

  // Füge Punkt zur Spur hinzu
  mouseTrail.value.push({x, y, time: Date.now()});

  // Behalte nur die letzten 20 Punkte
  if (mouseTrail.value.length > 20) {
    mouseTrail.value.shift();
  }

  // Trigger sound on mouse movement
  if (Math.random() < 0.3) {
    // 30% chance
    generateRandomSound();
  }
}

function handleMouseLeave() {
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

function generateRandomSound() {
  if (!soundEnabled.value || !audioContext.value) return;

  const now = Date.now();
  if (now - lastSoundTime.value < 100) return;

  lastSoundTime.value = now;

  const ctx = audioContext.value;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // Random frequency between 80-200 Hz
  const frequency = 80 + Math.random() * 120;
  const duration = 0.05 + Math.random() * 0.15;

  oscillator.type = Math.random() > 0.5 ? 'sine' : 'triangle';
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Random frequency modulation
  oscillator.frequency.exponentialRampToValueAtTime(
    frequency * (0.5 + Math.random()),
    ctx.currentTime + duration,
  );

  // Envelope
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value;

  if (soundEnabled.value) {
    initAudioContext();
    // Resume audio context if suspended
    if (audioContext.value?.state === 'suspended') {
      audioContext.value.resume();
    }
  }
}

onMounted(() => {
  animate();
});

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }

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
