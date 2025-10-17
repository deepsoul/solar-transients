<template>
  <div
    v-if="isVisible"
    class="absolute inset-0 overflow-hidden rounded-lg"
    :class="fadeClass"
  >
    <!-- Music Visualizer Container -->
    <div class="relative w-full h-full">
      <!-- Background Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-solar-orange/20 via-solar-purple/20 to-solar-cyan/20"
      ></div>

      <!-- Floating Orbs -->
      <div
        v-for="(orb, index) in orbs"
        :key="index"
        class="absolute rounded-full opacity-60"
        :style="getOrbStyle(orb, index)"
      ></div>

      <!-- Pulse Ring -->
      <div
        v-if="isPlaying"
        class="absolute inset-0 rounded-full border-2 border-solar-orange/30 animate-pulse"
        :style="pulseStyle"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from 'vue';
import {usePlayerStore} from '@/stores/player';

interface Props {
  releaseId: string;
}

const props = defineProps<Props>();
const playerStore = usePlayerStore();

// Animation state
const animationId = ref<number | null>(null);
const isVisible = ref(false);
const fadeClass = ref('');
const startTime = ref<number>(0);

// Orb data
const orbs = ref([
  {
    x: 20,
    y: 30,
    size: 60,
    vx: 0.2,
    vy: 0.1,
    color: 'solar-orange',
    phase: 0,
  },
  {
    x: 70,
    y: 60,
    size: 40,
    vx: -0.15,
    vy: 0.2,
    color: 'solar-purple',
    phase: Math.PI / 2,
  },
  {
    x: 50,
    y: 80,
    size: 50,
    vx: 0.1,
    vy: -0.1,
    color: 'solar-cyan',
    phase: Math.PI,
  },
  {
    x: 30,
    y: 70,
    size: 35,
    vx: 0.25,
    vy: 0.15,
    color: 'solar-orange',
    phase: Math.PI * 1.5,
  },
]);

// Check if this release is currently playing
const isPlaying = computed(() => {
  return (
    playerStore.isPlaying && playerStore.currentReleaseId === props.releaseId
  );
});

// Get rhythm intensity
const getRhythmIntensity = () => {
  if (!isPlaying.value) return 0.3;

  // Use both player time and local time for more reliable rhythm
  const playerTime = playerStore.currentTime || 0;
  const localTime = (Date.now() - startTime.value) / 1000;
  const timeInSeconds = Math.max(playerTime, localTime);

  // Use duration if available, otherwise estimate
  const duration = playerStore.duration || 30; // Default to 30 seconds for previews
  const progress = Math.min(1, timeInSeconds / duration);

  // More pronounced rhythm pattern
  const baseIntensity = 0.2 + 0.8 * Math.sin(timeInSeconds * 0.8);
  const beatIntensity = 0.1 + 0.9 * Math.sin(timeInSeconds * 2.5);
  const progressIntensity = 0.3 + 0.7 * progress;
  const randomIntensity = 0.7 + 0.6 * Math.sin(timeInSeconds * 1.5);

  const finalIntensity = Math.min(
    1,
    baseIntensity * beatIntensity * progressIntensity * randomIntensity,
  );

  return finalIntensity;
};

// Get orb style
const getOrbStyle = (orb: any, index: number) => {
  const intensity = getRhythmIntensity();
  const time = Date.now() * 0.001;

  // Gentle wave movement
  const waveX = Math.sin(time * 0.3 + orb.phase) * 0.3;
  const waveY = Math.cos(time * 0.2 + orb.phase) * 0.2;

  const currentX = orb.x + waveX;
  const currentY = orb.y + waveY;
  const currentSize = orb.size * (0.6 + intensity * 0.8);

  const colors = {
    'solar-orange':
      'radial-gradient(circle, #F97316 0%, #EA580C 70%, #DC2626 100%)',
    'solar-purple':
      'radial-gradient(circle, #8B5CF6 0%, #7C3AED 70%, #6D28D9 100%)',
    'solar-cyan':
      'radial-gradient(circle, #06B6D4 0%, #0891B2 70%, #0E7490 100%)',
  };

  return {
    left: `${currentX}%`,
    top: `${currentY}%`,
    width: `${currentSize}px`,
    height: `${currentSize}px`,
    background: colors[orb.color as keyof typeof colors],
    filter: 'blur(3px)',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.3s ease-out',
  };
};

// Pulse ring style
const pulseStyle = computed(() => {
  const intensity = getRhythmIntensity();
  return {
    transform: `scale(${0.7 + intensity * 0.6})`,
    opacity: 0.2 + intensity * 0.6,
    transition: 'all 0.2s ease-out',
  };
});

// Update orbs
const updateOrbs = () => {
  const intensity = getRhythmIntensity();
  const time = Date.now() * 0.001;

  orbs.value.forEach((orb, index) => {
    // More pronounced movement based on intensity
    orb.x += orb.vx * (0.3 + intensity * 0.7);
    orb.y += orb.vy * (0.3 + intensity * 0.7);

    // Boundary check with gentle bounce
    if (orb.x < 10) {
      orb.x = 10;
      orb.vx = Math.abs(orb.vx) * 0.8;
    }
    if (orb.x > 90) {
      orb.x = 90;
      orb.vx = -Math.abs(orb.vx) * 0.8;
    }
    if (orb.y < 10) {
      orb.y = 10;
      orb.vy = Math.abs(orb.vy) * 0.8;
    }
    if (orb.y > 90) {
      orb.y = 90;
      orb.vy = -Math.abs(orb.vy) * 0.8;
    }

    // More pronounced velocity changes based on intensity
    if (intensity > 0.4) {
      orb.vx += (Math.random() - 0.5) * 0.1 * intensity;
      orb.vy += (Math.random() - 0.5) * 0.1 * intensity;
    }

    // Dampen velocity
    orb.vx *= 0.99;
    orb.vy *= 0.99;
  });
};

// Animation loop
const animate = () => {
  updateOrbs();
  animationId.value = requestAnimationFrame(animate);
};

// Start animation
const startAnimation = () => {
  if (!animationId.value) {
    animate();
  }
};

// Stop animation
const stopAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
    animationId.value = null;
  }
};

// Handle visibility changes
const handleVisibilityChange = (playing: boolean) => {
  if (playing) {
    startTime.value = Date.now(); // Set start time when music starts
    isVisible.value = true;
    fadeClass.value = 'opacity-0 animate-fade-in';
    setTimeout(() => {
      fadeClass.value = 'opacity-100';
    }, 200);
    startAnimation();
  } else {
    fadeClass.value = 'opacity-0 animate-fade-out';
    setTimeout(() => {
      isVisible.value = false;
      stopAnimation();
    }, 800);
  }
};

// Watch for playing state changes
watch(isPlaying, (newValue) => {
  handleVisibilityChange(newValue);
});

// Initialize random positions
onMounted(() => {
  orbs.value.forEach((orb) => {
    orb.x = 20 + Math.random() * 60;
    orb.y = 20 + Math.random() * 60;
  });
});

onUnmounted(() => {
  stopAnimation();
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-out {
  animation: fade-out 0.8s ease-out forwards;
}
</style>
