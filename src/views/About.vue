<template>
  <div class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="py-16 bg-gradient-to-b from-solar-dark to-solar-gray">
      <div class="container mx-auto px-4 text-center">
        <h1
          class="text-4xl md:text-5xl font-display font-bold text-solar-light mb-6"
        >
          About
        </h1>
        <p class="text-xl text-solar-light/70 max-w-2xl mx-auto">
          The story behind SOLAR TRANSIENTS
        </p>
      </div>
    </section>

    <!-- Bio Section -->
    <section class="py-16 bg-solar-dark">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Bio Text -->
            <div class="space-y-6">
              <h2 class="text-3xl font-display font-bold text-solar-light mb-6">
                The Artist
              </h2>
              <div class="space-y-4 text-solar-light/80 leading-relaxed">
                <p>
                  SOLAR TRANSIENTS is an electronic music project that explores
                  the intersection of technology and emotion, creating immersive
                  soundscapes that transport listeners to otherworldly realms.
                </p>
                <p>
                  Drawing inspiration from cosmic phenomena, space exploration,
                  and the ever-changing nature of consciousness, each
                  composition is a journey through time and space, blending
                  ambient textures with electronic rhythms.
                </p>
                <p>
                  The project emerged from a fascination with the transient
                  nature of solar activity and its profound impact on our planet
                  and consciousness. Each release represents a snapshot of this
                  cosmic dance, captured in sound.
                </p>
              </div>
            </div>

            <!-- Artist Image Placeholder -->
            <div class="relative">
              <div
                class="aspect-square bg-solar-gray rounded-lg overflow-hidden"
              >
                <div
                  class="w-full h-full bg-gradient-to-br from-solar-orange/20 to-purple-500/20 flex items-center justify-center"
                >
                  <div class="text-center">
                    <div
                      class="w-64 h-64 bg-solar-orange/30 rounded-full mx-auto mb-4 flex items-center justify-center"
                    >
                      <img
                        src="/images/artist-photo.jpeg"
                        alt="Artist Photo"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <p class="text-solar-light/60 text-sm">Artist Photo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Press Kit Section -->
    <section class="py-16 bg-solar-gray">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-display font-bold text-solar-light mb-8">
            Press Kit
          </h2>
          <p class="text-solar-light/70 mb-8 max-w-2xl mx-auto">
            Download high-resolution photos, bio, and promotional materials for
            press and media use.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-solar-dark rounded-lg p-6">
              <h3 class="text-xl font-semibold text-solar-light mb-4">
                Press Photos
              </h3>
              <p class="text-solar-light/70 mb-4">
                High-resolution images for media use
              </p>
              <button
                @click="openDownloadDialog('photos')"
                class="btn-secondary w-full"
              >
                Download Photos
              </button>
            </div>

            <div class="bg-solar-dark rounded-lg p-6">
              <h3 class="text-xl font-semibold text-solar-light mb-4">
                Bio & Info
              </h3>
              <p class="text-solar-light/70 mb-4">
                Artist biography and project information
              </p>
              <button
                @click="openDownloadDialog('bio')"
                class="btn-secondary w-full"
              >
                Download Bio
              </button>
            </div>
          </div>

          <div class="bg-solar-dark rounded-lg p-6">
            <h3 class="text-xl font-semibold text-solar-light mb-4">
              Complete Press Kit
            </h3>
            <p class="text-solar-light/70 mb-4">
              Everything you need in one download
            </p>
            <button @click="openDownloadDialog('presskit')" class="btn-primary">
              Download Full Press Kit
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Links Section -->
    <section class="py-16 bg-solar-dark">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-display font-bold text-solar-light mb-8">
            Connect
          </h2>
          <p class="text-solar-light/70 mb-8">
            Follow SOLAR TRANSIENTS across all platforms
          </p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-solar-gray rounded-lg p-6 hover:bg-solar-orange/20 transition-colors duration-300 group"
              :aria-label="`Follow on ${social.platform}`"
            >
              <div class="text-center">
                <div
                  class="w-12 h-12 mx-auto mb-3 text-solar-orange group-hover:text-solar-orange transition-colors duration-300"
                >
                  <svg
                    class="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path :d="social.icon" />
                  </svg>
                </div>
                <p class="text-solar-light font-medium">
                  {{ social.platform }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Download Coming Soon Dialog -->
    <div
      v-if="showDownloadDialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click="closeDownloadDialog"
    >
      <div
        class="bg-solar-dark rounded-lg p-8 max-w-md mx-4 relative border border-solar-orange/20"
        @click.stop
      >
        <!-- Close Button -->
        <button
          @click="closeDownloadDialog"
          class="absolute top-4 right-4 text-solar-light/60 hover:text-solar-orange transition-colors duration-300"
          aria-label="Close dialog"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Content -->
        <div class="text-center">
          <!-- Icon -->
          <div
            class="w-16 h-16 bg-solar-orange/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-8 h-8 text-solar-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <!-- Different icons based on type -->
              <template v-if="dialogType === 'photos'">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </template>
              <template v-else-if="dialogType === 'bio'">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </template>
              <template v-else>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </template>
            </svg>
          </div>

          <!-- Title -->
          <h3 class="text-2xl font-display font-bold text-solar-light mb-4">
            {{ getDialogTitle() }}
          </h3>

          <!-- Coming Soon Badge -->
          <div
            class="inline-flex items-center px-3 py-1 bg-solar-orange/20 text-solar-orange text-sm font-medium rounded-full mb-6"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            Coming Soon
          </div>

          <!-- Description -->
          <p class="text-solar-light/70 mb-6 leading-relaxed">
            {{ getDialogDescription() }}
          </p>

          <!-- Newsletter Signup -->
          <div class="space-y-4">
            <h4 class="text-solar-orange font-semibold text-lg">
              Get Notified
            </h4>
            <form @submit.prevent="handleNewsletterSignup" class="space-y-3">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email address"
                required
                class="w-full px-4 py-3 bg-solar-gray border border-solar-orange/30 rounded-md text-solar-light placeholder-solar-light/50 focus:outline-none focus:ring-2 focus:ring-solar-orange focus:border-transparent"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn-primary"
                aria-label="Subscribe to newsletter"
              >
                {{ isSubmitting ? 'Subscribing...' : 'Subscribe for Updates' }}
              </button>
            </form>
            <p class="text-xs text-solar-light/50">
              We'll notify you as soon as press photos are available
            </p>
          </div>

          <!-- Alternative Contact -->
          <div class="mt-6 pt-6 border-t border-solar-gray">
            <p class="text-solar-light/60 text-sm mb-3">
              Need photos urgently?
            </p>
            <a
              href="mailto:press@solar-transients.com"
              class="text-solar-orange hover:text-solar-orange/80 transition-colors duration-300 text-sm font-medium"
            >
              Contact us directly
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type {SocialLink} from '@/types';
import {useSnackbar} from '@/stores/snackbar';

// Dialog state
const showDownloadDialog = ref(false);
const dialogType = ref('photos'); // 'photos', 'bio', 'presskit'
const email = ref('');
const isSubmitting = ref(false);
const {success, error: showError} = useSnackbar();

const socialLinks: SocialLink[] = [
  {
    platform: 'Spotify',
    url: 'https://open.spotify.com/artist/solar-transients',
    icon: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/solar_transients',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    platform: 'SoundCloud',
    url: 'https://soundcloud.com/solar-transients',
    icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 0-.315.146-.315.315v7.05c0 .169.146.315.315.315s.315-.146.315-.315v-7.05c0-.169-.146-.315-.315-.315zm-1.26 0c-.169 0-.315.146-.315.315v7.05c0 .169.146.315.315.315s.315-.146.315-.315v-7.05c0-.169-.146-.315-.315-.315zm-1.26 0c-.169 0-.315.146-.315.315v7.05c0 .169.146.315.315.315s.315-.146.315-.315v-7.05c0-.169-.146-.315-.315-.315zm-1.26 0c-.169 0-.315.146-.315.315v7.05c0 .169.146.315.315.315s.315-.146.315-.315v-7.05c0-.169-.146-.315-.315-.315zm-1.26 0c-.169 0-.315.146-.315.315v7.05c0 .169.146.315.315.315s.315-.146.315-.315v-7.05c0-.169-.146-.315-.315-.315zm-1.26 0c-.169 0-.315.146-.315.315v7.05c0 .169.146.315.315.315s.315-.146.315-.315v-7.05c0-.169-.146-.315-.315-.315zm-1.26 0c-.169 0-.315.146-.315.315v7.05c0 .169.146.315.315.315s.315-.146.315-.315v-7.05c0-.169-.146-.315-.315-.315zm-1.26 0c-.169 0-.315.146-.315.315v7.05c0 .169.146.315.315.315s.315-.146.315-.315v-7.05c0-.169-.146-.315-.315-.315z',
  },
  {
    platform: 'YouTube',
    url: 'https://youtube.com/@solar-transients',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    platform: 'Tidal',
    url: 'https://tidal.com/browse/artist/12345678',
    icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6S2.4 17.302 2.4 12 6.698 2.4 12 2.4zm0 1.2c-4.642 0-8.4 3.758-8.4 8.4s3.758 8.4 8.4 8.4 8.4-3.758 8.4-8.4-3.758-8.4-8.4-8.4zm0 1.2c3.978 0 7.2 3.222 7.2 7.2s-3.222 7.2-7.2 7.2S4.8 15.978 4.8 12 8.022 4.8 12 4.8zm0 1.2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 1.2c2.651 0 4.8 2.149 4.8 4.8s-2.149 4.8-4.8 4.8S7.2 14.651 7.2 12 9.349 7.2 12 7.2zm0 1.2c-1.988 0-3.6 1.612-3.6 3.6s1.612 3.6 3.6 3.6 3.6-1.612 3.6-3.6-1.612-3.6-3.6-3.6zm0 1.2c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4S9.6 13.325 9.6 12s1.075-2.4 2.4-2.4z',
  },
];

// Dialog functions
function openDownloadDialog(type: 'photos' | 'bio' | 'presskit') {
  dialogType.value = type;
  showDownloadDialog.value = true;
  // Prevent body scroll when dialog is open
  document.body.style.overflow = 'hidden';
}

function closeDownloadDialog() {
  showDownloadDialog.value = false;
  // Restore body scroll
  document.body.style.overflow = 'auto';
}

// Dialog content functions
function getDialogTitle() {
  switch (dialogType.value) {
    case 'photos':
      return 'Press Photos';
    case 'bio':
      return 'Artist Bio';
    case 'presskit':
      return 'Press Kit';
    default:
      return 'Download';
  }
}

function getDialogDescription() {
  switch (dialogType.value) {
    case 'photos':
      return "Professional press photos are currently being prepared. Stay updated and be the first to know when they're available!";
    case 'bio':
      return "The complete artist biography and project information is being finalized. Get notified when it's ready for download!";
    case 'presskit':
      return "The complete press kit with all materials is being assembled. We'll notify you as soon as everything is ready!";
    default:
      return "This content is currently being prepared. Stay updated and be the first to know when it's available!";
  }
}

// Newsletter signup function
async function handleNewsletterSignup() {
  isSubmitting.value = true;
  try {
    // Here you would integrate with your email service
    console.log(
      `Newsletter signup from ${dialogType.value} dialog:`,
      email.value,
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    email.value = '';

    const contentType = getDialogTitle().toLowerCase();
    success(
      'Newsletter',
      `Thank you for subscribing! You'll be notified when ${contentType} are available.`,
    );
    closeDownloadDialog();
  } catch (error) {
    console.error('Newsletter signup error:', error);
    showError('Newsletter', 'Something went wrong. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  // Set page title and meta
  document.title = 'About - SOLAR TRANSIENTS';
});
</script>
