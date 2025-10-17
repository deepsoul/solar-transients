<template>
  <footer class="bg-solar-gray border-t border-solar-dark">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div class="space-y-4">
          <h3 class="text-xl font-display font-bold text-gradient">
            SOLAR TRANSIENTS
          </h3>
          <p class="text-solar-light/80 text-sm leading-relaxed">
            Electronic music artist creating atmospheric soundscapes and
            immersive audio experiences.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4
            class="text-solar-orange font-semibold uppercase tracking-wider text-sm"
          >
            Quick Links
          </h4>
          <nav class="space-y-2">
            <router-link
              v-for="item in quickLinks"
              :key="item.name"
              :to="item.path"
              class="block text-solar-light/80 hover:text-solar-orange transition-colors duration-300 text-sm"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <!-- Social Links -->
        <div class="space-y-4">
          <h4
            class="text-solar-orange font-semibold uppercase tracking-wider text-sm"
          >
            Connect
          </h4>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.url"
              :aria-label="`Follow on ${social.platform}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-solar-light/80 hover:text-solar-orange transition-colors duration-300"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path :d="social.icon" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="mt-8 pt-8 border-t border-solar-dark">
        <div class="max-w-md mx-auto text-center">
          <h4
            class="text-solar-orange font-semibold uppercase tracking-wider text-sm mb-4"
          >
            Stay Connected
          </h4>

          <p class="text-solar-light/70 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new releases, upcoming shows, and
            exclusive content
          </p>
          <form @submit.prevent="handleNewsletterSignup" class="flex gap-2">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="flex-1 px-4 py-2 bg-solar-dark border border-solar-gray rounded-md text-solar-light placeholder-solar-light/50 focus:outline-none focus:ring-2 focus:ring-solar-orange focus:border-transparent"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              class="btn-primary text-sm px-4 py-2"
              :disabled="isSubmitting"
              aria-label="Subscribe to newsletter"
            >
              {{ isSubmitting ? '...' : 'Subscribe' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Copyright & Legal -->
      <div class="mt-8 pt-4 border-t border-solar-dark text-center">
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <p class="text-solar-light/60 text-sm">
            © {{ currentYear }} SOLAR TRANSIENTS. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <button
              @click="props.onOpenCookieDialog"
              class="text-solar-light/60 hover:text-solar-orange transition-colors text-sm underline"
              aria-label="Open cookie settings"
            >
              Cookie Settings
            </button>
            <a
              href="/privacy"
              class="text-solar-light/60 hover:text-solar-orange transition-colors text-sm underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useSnackbar} from '@/stores/snackbar';
import {useSocialLinks} from '@/composables/useSocialLinks';

const email = ref('');
const isSubmitting = ref(false);
const currentYear = new Date().getFullYear();
const {success, error: showError} = useSnackbar();
const {socialLinks} = useSocialLinks();

const quickLinks = [
  {name: 'Home', path: '/'},
  {name: 'Music', path: '/music'},
  {name: 'About', path: '/about'},
  {name: 'Contact', path: '/contact'},
];

// Define props for cookie dialog function
const props = defineProps<{
  onOpenCookieDialog?: () => void;
}>();

async function handleNewsletterSignup() {
  isSubmitting.value = true;
  try {
    // Option 1: Buttondown API (kostenlos, einfach)
    const apiKey = import.meta.env.VITE_BUTTONDOWN_API_KEY;

    if (!apiKey || apiKey === 'your_buttondown_api_key_here') {
      throw new Error('API Key not configured');
    }

    const response = await fetch(
      'https://api.buttondown.email/v1/subscribers',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email.value,
          tags: ['website-signup'],
          notes: 'Subscribed via solar-transients.de footer',
          referrer_url: 'https://solar-transients.de',
        }),
      },
    );

    if (response.ok) {
      email.value = '';
      success('Newsletter', '🎉 Thank you for subscribing to our newsletter!');
    } else {
      const errorData = await response.json();
      console.error('Buttondown API Error:', errorData);
      throw new Error(
        `Subscription failed: ${errorData.detail?.[0]?.msg || 'Unknown error'}`,
      );
    }
  } catch (error) {
    console.error('Newsletter signup error:', error);

    // Fallback: E-Mail an dich senden (falls API nicht funktioniert)
    try {
      await fetch('https://cms.borishorn.de/solar-transients-contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Newsletter Signup',
          email: email.value,
          subject: 'Newsletter Subscription Request',
          message: `New newsletter subscription from: ${email.value}`,
          type: 'general',
        }),
      });

      email.value = '';
      success(
        'Newsletter',
        "✅ Thank you! We'll add you to our newsletter soon.",
      );
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError);
      showError(
        'Newsletter',
        '❌ Something went wrong. Please try again later.',
      );
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>
