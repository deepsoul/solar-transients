<template>
  <div id="app" class="min-h-screen bg-solar-dark">
    <Header />
    <main class="relative">
      <router-view />
    </main>
    <Footer />
    <Player v-if="currentTrack" />
    <SnackbarContainer />
    <CookieDialog />
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue';
import {usePlayerStore} from '@/stores/player';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Player from '@/components/Player.vue';
import SnackbarContainer from '@/components/SnackbarContainer.vue';
import CookieDialog from '@/components/CookieDialog.vue';
import {analytics} from '@/services/analytics';

const playerStore = usePlayerStore();
const currentTrack = computed(() => playerStore.currentTrack);
</script>
