<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <!-- Visual Loop Background -->
      <VisualLoop class="absolute inset-0" />

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
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
          <router-link to="/music" class="btn-primary">
            Explore Music
          </router-link>
          <router-link to="/about" class="btn-secondary">
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

    <!-- Newsletter CTA Section -->
    <section class="py-16 bg-solar-gray">
      <div class="container mx-auto px-4 text-center">
        <h2
          class="text-3xl md:text-4xl font-display font-bold text-solar-light mb-4"
        >
          Stay Connected
        </h2>
        <p class="text-solar-light/70 mb-8 max-w-2xl mx-auto">
          Get the latest updates on new releases, upcoming shows, and exclusive
          content
        </p>

        <form @submit.prevent="handleNewsletterSignup" class="max-w-md mx-auto">
          <div class="flex gap-2">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="flex-1 px-4 py-3 bg-solar-dark border border-solar-orange/30 rounded-md text-solar-light placeholder-solar-light/50 focus:outline-none focus:ring-2 focus:ring-solar-orange focus:border-transparent"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              class="btn-primary px-6 py-3"
              :disabled="isSubmitting"
              aria-label="Subscribe to newsletter"
            >
              {{ isSubmitting ? '...' : 'Subscribe' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useMusicStore} from '@/stores/music';
import {useSnackbar} from '@/stores/snackbar';
import VisualLoop from '@/components/VisualLoop.vue';
import ReleaseCard from '@/components/ReleaseCard.vue';

const musicStore = useMusicStore();
const email = ref('');
const isSubmitting = ref(false);
const featuredRelease = ref(musicStore.featuredRelease);
const {success, error: showError} = useSnackbar();

onMounted(() => {
  // Set page title and meta
  document.title = 'SOLAR TRANSIENTS - Electronic Music Artist';
});

async function handleNewsletterSignup() {
  isSubmitting.value = true;
  try {
    // Here you would integrate with your email service
    console.log('Newsletter signup:', email.value);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    email.value = '';
    success('Newsletter', 'Thank you for subscribing!');
  } catch (error) {
    console.error('Newsletter signup error:', error);
    showError('Newsletter', 'Something went wrong. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}
</script>
