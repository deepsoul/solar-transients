<template>
  <div id="app" class="min-h-screen bg-solar-dark">
    <Header />
    <main class="relative">
      <router-view />
    </main>
    <Footer />
    <Player v-if="currentTrack" />
    <SnackbarContainer />
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {usePlayerStore} from '@/stores/player';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Player from '@/components/Player.vue';
import SnackbarContainer from '@/components/SnackbarContainer.vue';

const playerStore = usePlayerStore();
const currentTrack = computed(() => playerStore.currentTrack);
</script>
