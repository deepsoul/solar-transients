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
import {useSnackbar} from '@/stores/snackbar';
import {useSocialLinks} from '@/composables/useSocialLinks';

// Dialog state
const showDownloadDialog = ref(false);
const dialogType = ref('photos'); // 'photos', 'bio', 'presskit'
const email = ref('');
const isSubmitting = ref(false);
const {success, error: showError} = useSnackbar();
const {socialLinks} = useSocialLinks();

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
