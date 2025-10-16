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

      <!-- Copyright -->
      <div class="mt-8 pt-4 border-t border-solar-dark text-center">
        <p class="text-solar-light/60 text-sm">
          © {{ currentYear }} SOLAR TRANSIENTS. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useSnackbar} from '@/stores/snackbar';

const email = ref('');
const isSubmitting = ref(false);
const currentYear = new Date().getFullYear();
const {success, error: showError} = useSnackbar();

const quickLinks = [
  {name: 'Home', path: '/'},
  {name: 'Music', path: '/music'},
  {name: 'About', path: '/about'},
  {name: 'Contact', path: '/contact'},
];

const socialLinks = [
  {
    platform: 'Spotify',
    url: 'https://open.spotify.com/intl-de/artist/2ZSJNNhcRYBNz29MveX7ql?si=JCknxvFWSFGNzJRfewZd3Q',
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
    platform: 'Tidal',
    url: 'https://tidal.com/browse/artist/12345678',
    icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6S2.4 17.302 2.4 12 6.698 2.4 12 2.4zm0 1.2c-4.642 0-8.4 3.758-8.4 8.4s3.758 8.4 8.4 8.4 8.4-3.758 8.4-8.4-3.758-8.4-8.4-8.4zm0 1.2c3.978 0 7.2 3.222 7.2 7.2s-3.222 7.2-7.2 7.2S4.8 15.978 4.8 12 8.022 4.8 12 4.8zm0 1.2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 1.2c2.651 0 4.8 2.149 4.8 4.8s-2.149 4.8-4.8 4.8S7.2 14.651 7.2 12 9.349 7.2 12 7.2zm0 1.2c-1.988 0-3.6 1.612-3.6 3.6s1.612 3.6 3.6 3.6 3.6-1.612 3.6-3.6-1.612-3.6-3.6-3.6zm0 1.2c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4S9.6 13.325 9.6 12s1.075-2.4 2.4-2.4z',
  },
];

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
