<template>
  <div class="min-h-screen">
    <!-- SEO Head -->
    <SEOHead
      title="SOLAR TRANSIENTS - Electronic Music Artist | Atmospheric Soundscapes"
      description="Discover SOLAR TRANSIENTS - Electronic music artist creating atmospheric soundscapes, ambient soundtracks, and immersive audio experiences. Explore music, create remixes, and discover electronic soundscapes."
      keywords="electronic music, ambient music, atmospheric soundscapes, electronic artist, music production, sound design, ambient soundtracks, electronic beats"
      canonical="https://solar-transients.vercel.app/"
    />
    
    <!-- Hero Section -->
    <section
      class="relative h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Hero section with main introduction"
    >
      <!-- Visual Loop Background -->
      <VisualLoop class="absolute inset-0" />

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          role="heading"
          aria-level="1"
        >
          <span class="text-gradient">SOLAR TRANSIENTS</span>
        </h1>
        <p
          class="text-xl md:text-2xl text-solar-light/80 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Electronic music artist creating atmospheric soundscapes and immersive
          audio experiences
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/music" 
            class="btn-primary"
            aria-label="Explore SOLAR TRANSIENTS music collection"
          >
            Explore Music
          </router-link>
          <router-link 
            to="/about" 
            class="btn-secondary"
            aria-label="Learn more about SOLAR TRANSIENTS"
          >
            Learn More
          </router-link>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <svg
          class="w-6 h-6 text-solar-orange"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>

    <!-- Latest Release Section -->
    <section class="py-16 bg-solar-dark">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-display font-bold text-solar-light mb-4"
          >
            Latest Release
          </h2>
          <p class="text-solar-light/70 max-w-2xl mx-auto">
            Discover the newest sounds from SOLAR TRANSIENTS
          </p>
        </div>

        <div v-if="featuredRelease" class="max-w-md mx-auto">
          <ReleaseCard :release="featuredRelease" />
        </div>
      </div>
    </section>

    <!-- Audio Waves Animation -->
    <section class="py-16 bg-solar-gray/30 overflow-hidden">
      <div class="w-full">
        <AudioWaves />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useMusicStore} from '@/stores/music';
import VisualLoop from '@/components/VisualLoop.vue';
import ReleaseCard from '@/components/ReleaseCard.vue';
import AudioWaves from '../components/AudioWaves.vue';
import SEOHead from '@/components/SEOHead.vue';

const musicStore = useMusicStore();
const featuredRelease = ref(musicStore.featuredRelease);

onMounted(() => {
  // Set page title and meta
  document.title = 'SOLAR TRANSIENTS - Electronic Music Artist';
});
</script>
