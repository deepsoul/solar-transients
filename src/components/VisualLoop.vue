<template>
  <div class="relative w-full h-full overflow-hidden">
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-solar-dark/20 to-solar-dark/60"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasWidth = ref(0);
const canvasHeight = ref(0);
let animationId: number | null = null;
let particles: Particle[] = [];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const colors = ['#FF6B35', '#FFB347', '#FFD700', '#87CEEB', '#DDA0DD'];

function initCanvas() {
  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  canvasWidth.value = rect.width;
  canvasHeight.value = rect.height;

  // Set actual canvas size
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  // Initialize particles
  particles = [];
  for (let i = 0; i < 50; i++) {
    createParticle();
  }
}

function createParticle() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();

  particles.push({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 0,
    maxLife: Math.random() * 300 + 200,
  });
}

function updateParticles() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life++;

    // Fade out over time
    particle.opacity = Math.max(0, 1 - particle.life / particle.maxLife);

    // Wrap around edges
    if (particle.x < 0) particle.x = rect.width;
    if (particle.x > rect.width) particle.x = 0;
    if (particle.y < 0) particle.y = rect.height;
    if (particle.y > rect.height) particle.y = 0;

    // Remove dead particles
    if (particle.life >= particle.maxLife) {
      particles.splice(index, 1);
      createParticle();
    }
  });
}

function drawParticles() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

  particles.forEach((particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    // Add glow effect
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Draw connections between nearby particles
  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach((otherParticle) => {
      const dx = particle.x - otherParticle.x;
      const dy = particle.y - otherParticle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.save();
        ctx.globalAlpha = (1 - distance / 100) * 0.2;
        ctx.strokeStyle = '#FF6B35';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(otherParticle.x, otherParticle.y);
        ctx.stroke();
        ctx.restore();
      }
    });
  });
}

function animate() {
  updateParticles();
  drawParticles();
  animationId = requestAnimationFrame(animate);
}

function handleResize() {
  initCanvas();
}

onMounted(() => {
  initCanvas();
  animate();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener('resize', handleResize);
});
</script>
