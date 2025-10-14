<template>
  <div class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="py-16 bg-gradient-to-b from-solar-dark to-solar-gray">
      <div class="container mx-auto px-4 text-center">
        <h1
          class="text-4xl md:text-5xl font-display font-bold text-solar-light mb-6"
        >
          Contact
        </h1>
        <p class="text-xl text-solar-light/70 max-w-2xl mx-auto">
          Get in touch for bookings, collaborations, or just to say hello
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-16 bg-solar-dark">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Contact Type -->
            <div>
              <label for="type" class="block text-solar-light font-medium mb-2">
                Inquiry Type
              </label>
              <select
                id="type"
                v-model="form.type"
                required
                class="w-full px-4 py-3 bg-solar-gray border border-solar-orange/30 rounded-md text-solar-light focus:outline-none focus:ring-2 focus:ring-solar-orange focus:border-transparent"
                aria-label="Select inquiry type"
              >
                <option value="general">General Inquiry</option>
                <option value="booking">Booking Request</option>
                <option value="collaboration">Collaboration</option>
              </select>
            </div>

            <!-- Name -->
            <div>
              <label for="name" class="block text-solar-light font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 bg-solar-gray border border-solar-orange/30 rounded-md text-solar-light placeholder-solar-light/50 focus:outline-none focus:ring-2 focus:ring-solar-orange focus:border-transparent"
                placeholder="Your name"
                aria-label="Your name"
              />
            </div>

            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-solar-light font-medium mb-2"
              >
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-solar-gray border border-solar-orange/30 rounded-md text-solar-light placeholder-solar-light/50 focus:outline-none focus:ring-2 focus:ring-solar-orange focus:border-transparent"
                placeholder="your@email.com"
                aria-label="Your email address"
              />
            </div>

            <!-- Subject -->
            <div>
              <label
                for="subject"
                class="block text-solar-light font-medium mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                class="w-full px-4 py-3 bg-solar-gray border border-solar-orange/30 rounded-md text-solar-light placeholder-solar-light/50 focus:outline-none focus:ring-2 focus:ring-solar-orange focus:border-transparent"
                placeholder="Brief subject line"
                aria-label="Email subject"
              />
            </div>

            <!-- Message -->
            <div>
              <label
                for="message"
                class="block text-solar-light font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-3 bg-solar-gray border border-solar-orange/30 rounded-md text-solar-light placeholder-solar-light/50 focus:outline-none focus:ring-2 focus:ring-solar-orange focus:border-transparent resize-vertical"
                placeholder="Tell me about your inquiry..."
                aria-label="Your message"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="text-center">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn-primary px-8 py-3"
                aria-label="Send message"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Alternative Contact Methods -->
    <section class="py-16 bg-solar-gray">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2
            class="text-3xl font-display font-bold text-solar-light text-center mb-12"
          >
            Other Ways to Connect
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Email -->
            <div class="text-center">
              <div
                class="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-solar-light mb-2">Email</h3>
              <p class="text-solar-light/70 mb-4">For direct communication</p>
              <a
                href="mailto:hello@solar-transients.com"
                class="text-solar-orange hover:text-solar-orange/80 transition-colors duration-300"
              >
                hello@solar-transients.com
              </a>
            </div>

            <!-- Social Media -->
            <div class="text-center">
              <div
                class="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-solar-light mb-2">
                Social Media
              </h3>
              <p class="text-solar-light/70 mb-4">Follow for updates</p>
              <div class="flex justify-center space-x-4">
                <a
                  href="https://instagram.com/solar_transients"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-solar-orange hover:text-solar-orange/80 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/solar_transients"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-solar-orange hover:text-solar-orange/80 transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Booking -->
            <div class="text-center">
              <div
                class="w-16 h-16 bg-solar-orange rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-solar-light mb-2">
                Booking
              </h3>
              <p class="text-solar-light/70 mb-4">For live performances</p>
              <a
                href="mailto:booking@solar-transients.com"
                class="text-solar-orange hover:text-solar-orange/80 transition-colors duration-300"
              >
                booking@solar-transients.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type {ContactForm} from '@/types';

const form = ref<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
  type: 'general',
});

const isSubmitting = ref(false);

async function handleSubmit() {
  isSubmitting.value = true;
  try {
    // Here you would integrate with your form handling service
    // For now, we'll just simulate a submission
    console.log('Form submission:', form.value);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      type: 'general',
    };

    alert("Thank you for your message! I'll get back to you soon.");
  } catch (error) {
    console.error('Form submission error:', error);
    alert('Something went wrong. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  // Set page title and meta
  document.title = 'Contact - SOLAR TRANSIENTS';
});
</script>
