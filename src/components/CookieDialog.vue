<template>
  <div
    v-if="showDialog"
    class="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4 sm:items-center sm:p-0"
    role="dialog"
    aria-modal="true"
    aria-labelledby="cookie-dialog-title"
    aria-describedby="cookie-dialog-description"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="declineCookies"
    ></div>

    <!-- Dialog -->
    <div
      class="relative bg-solar-dark border border-solar-gray rounded-lg shadow-xl max-w-md w-full mx-auto transform transition-all"
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-solar-gray">
        <h3
          id="cookie-dialog-title"
          class="text-lg font-semibold text-solar-light flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2 text-solar-orange"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          Cookie-Einstellungen
        </h3>
      </div>

      <!-- Content -->
      <div class="px-6 py-4">
        <p
          id="cookie-dialog-description"
          class="text-sm text-solar-light/80 mb-4"
        >
          Wir verwenden Cookies, um deine Erfahrung zu verbessern und unsere
          Website zu analysieren. Du kannst deine Einstellungen jederzeit
          ändern.
        </p>

        <!-- Cookie Categories -->
        <div class="space-y-3 mb-6">
          <!-- Essential Cookies -->
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-solar-light">
                Notwendige Cookies
              </h4>
              <p class="text-xs text-solar-light/60">
                Diese Cookies sind für die Grundfunktionen der Website
                erforderlich.
              </p>
            </div>
            <div class="flex items-center">
              <span class="text-xs text-solar-light/60 mr-2">Immer aktiv</span>
              <div
                class="w-8 h-4 bg-solar-orange rounded-full flex items-center justify-end px-1"
              >
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Analytics Cookies -->
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-solar-light">
                Analytics Cookies
              </h4>
              <p class="text-xs text-solar-light/60">
                Helfen uns zu verstehen, wie Besucher mit der Website
                interagieren.
              </p>
            </div>
            <div class="flex items-center">
              <button
                @click="toggleAnalytics"
                :class="[
                  'w-8 h-4 rounded-full flex items-center transition-colors',
                  analyticsEnabled
                    ? 'bg-solar-orange justify-end'
                    : 'bg-solar-gray justify-start',
                ]"
                :aria-pressed="analyticsEnabled"
                aria-label="Analytics Cookies aktivieren/deaktivieren"
              >
                <div class="w-3 h-3 bg-white rounded-full mx-1"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Privacy Policy Link -->
        <div class="mb-4">
          <a
            href="/privacy"
            class="text-xs text-solar-orange hover:text-solar-orange/80 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung lesen
          </a>
        </div>
      </div>

      <!-- Actions -->
      <div class="px-6 py-4 bg-solar-gray/20 flex flex-col sm:flex-row gap-3">
        <button
          @click="declineCookies"
          class="btn-secondary text-sm py-2 px-4 order-2 sm:order-1"
          aria-label="Alle Cookies ablehnen"
        >
          Ablehnen
        </button>
        <button
          @click="acceptSelected"
          class="btn-primary text-sm py-2 px-4 order-1 sm:order-2"
          aria-label="Ausgewählte Cookies akzeptieren"
        >
          Auswahl speichern
        </button>
        <button
          @click="acceptAllCookies"
          class="btn-secondary text-sm py-2 px-4 order-3"
          aria-label="Alle Cookies akzeptieren"
        >
          Alle akzeptieren
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';

// Cookie consent state
const showDialog = ref(false);
const analyticsEnabled = ref(false);

// Check if user has already made a choice
const hasConsent = () => {
  return localStorage.getItem('cookie-consent') !== null;
};

// Load saved preferences
const loadPreferences = () => {
  const consent = localStorage.getItem('cookie-consent');
  if (consent) {
    const preferences = JSON.parse(consent);
    analyticsEnabled.value = preferences.analytics || false;
  }
};

// Show dialog if no consent given
onMounted(() => {
  if (!hasConsent()) {
    showDialog.value = true;
  } else {
    loadPreferences();
  }
});

// Toggle analytics
const toggleAnalytics = () => {
  analyticsEnabled.value = !analyticsEnabled.value;
};

// Accept all cookies
const acceptAllCookies = () => {
  const preferences = {
    essential: true,
    analytics: true,
    timestamp: Date.now(),
  };

  localStorage.setItem('cookie-consent', JSON.stringify(preferences));
  analyticsEnabled.value = true;
  showDialog.value = false;

  // Initialize Google Analytics
  initializeGoogleAnalytics();
};

// Accept selected cookies
const acceptSelected = () => {
  const preferences = {
    essential: true,
    analytics: analyticsEnabled.value,
    timestamp: Date.now(),
  };

  localStorage.setItem('cookie-consent', JSON.stringify(preferences));
  showDialog.value = false;

  // Initialize Google Analytics if enabled
  if (analyticsEnabled.value) {
    initializeGoogleAnalytics();
  }
};

// Decline all cookies
const declineCookies = () => {
  const preferences = {
    essential: true,
    analytics: false,
    timestamp: Date.now(),
  };

  localStorage.setItem('cookie-consent', JSON.stringify(preferences));
  analyticsEnabled.value = false;
  showDialog.value = false;
};

// Initialize Google Analytics
const initializeGoogleAnalytics = () => {
  // Import and enable analytics service
  import('@/services/analytics').then(({analytics}) => {
    analytics.enable();
  });
};

</script>

<style scoped>
/* Custom button styles for cookie dialog */
.btn-primary {
  @apply bg-solar-orange text-white px-4 py-2 rounded hover:bg-solar-orange/80 transition-colors;
}

.btn-secondary {
  @apply bg-solar-gray text-solar-light px-4 py-2 rounded hover:bg-solar-gray/80 transition-colors;
}
</style>
