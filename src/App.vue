<template>
  <div id="app" class="min-h-screen bg-solar-dark">
    <Header />
    <main class="relative">
      <router-view />
    </main>
    <Footer :on-open-cookie-dialog="openCookieDialog" />
    <Player v-if="currentTrack" />
    <SnackbarContainer />
    <CookieDialog ref="cookieDialogRef" />
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {usePlayerStore} from '@/stores/player';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Player from '@/components/Player.vue';
import SnackbarContainer from '@/components/SnackbarContainer.vue';
import CookieDialog from '@/components/CookieDialog.vue';
import {analytics} from '@/services/analytics';

const playerStore = usePlayerStore();
const currentTrack = computed(() => playerStore.currentTrack);

// Cookie dialog reference
const cookieDialogRef = ref<InstanceType<typeof CookieDialog> | null>(null);

// Function to open cookie dialog (passed to footer)
const openCookieDialog = () => {
  if (cookieDialogRef.value) {
    cookieDialogRef.value.openCookieDialog();
  }
};

// Listen for cookie settings events from privacy page
onMounted(() => {
  window.addEventListener('openCookieSettings', openCookieDialog);

  // Initialize analytics immediately for testing purposes
  analytics.initialize();
});

onUnmounted(() => {
  window.removeEventListener('openCookieSettings', openCookieDialog);
});
</script>
