<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-solar-dark/95 backdrop-blur-md border-b border-solar-gray"
  >
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link
          to="/"
          class="text-2xl font-display font-bold text-gradient hover:scale-105 transition-transform duration-300"
          aria-label="SOLAR TRANSIENTS - Home"
        >
          SOLAR TRANSIENTS
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.path"
            class="text-solar-light hover:text-solar-orange transition-colors duration-300 font-medium tracking-wide"
            :aria-label="item.ariaLabel"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-solar-light hover:text-solar-orange transition-colors duration-300"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden mt-4 pb-4 border-t border-solar-gray pt-4"
      >
        <div class="flex flex-col space-y-4">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.path"
            @click="closeMobileMenu"
            class="text-solar-light hover:text-solar-orange transition-colors duration-300 font-medium tracking-wide py-2"
            :aria-label="item.ariaLabel"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const isMobileMenuOpen = ref(false);

const navigationItems = [
  {name: 'Home', path: '/', ariaLabel: 'Go to home page'},
  {name: 'Music', path: '/music', ariaLabel: 'View music releases'},
  {name: 'About', path: '/about', ariaLabel: 'Learn about SOLAR TRANSIENTS'},
  {name: 'Contact', path: '/contact', ariaLabel: 'Get in touch'},
];

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}
</script>
