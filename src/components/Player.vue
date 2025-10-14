<template>
  <div
    v-if="currentTrack"
    class="fixed bottom-0 left-0 right-0 z-40 bg-solar-gray/95 backdrop-blur-md border-t border-solar-orange/20"
  >
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center space-x-4">
        <!-- Track Info -->
        <div class="flex items-center space-x-3 min-w-0 flex-1">
          <img
            :src="currentTrack.coverUrl"
            :alt="currentTrack.title"
            class="w-12 h-12 rounded-md object-cover"
          />
          <div class="min-w-0 flex-1">
            <h4 class="text-solar-light font-medium truncate">
              {{ currentTrack.title }}
            </h4>
            <p class="text-solar-light/60 text-sm truncate">
              {{ currentTrack.artist }}
            </p>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center space-x-2">
          <button
            @click="previous"
            :disabled="!hasPrevious"
            class="p-2 text-solar-light hover:text-solar-orange disabled:text-solar-light/30 disabled:cursor-not-allowed transition-colors duration-300"
            aria-label="Previous track"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            @click="togglePlay"
            class="p-2 bg-solar-orange text-white rounded-full hover:bg-solar-orange/80 transition-colors duration-300"
            :aria-label="isPlaying ? 'Pause' : 'Play'"
          >
            <svg
              v-if="!isPlaying"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>

          <button
            @click="next"
            :disabled="!hasNext"
            class="p-2 text-solar-light hover:text-solar-orange disabled:text-solar-light/30 disabled:cursor-not-allowed transition-colors duration-300"
            aria-label="Next track"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        <!-- Progress -->
        <div
          class="hidden md:flex items-center space-x-2 min-w-0 flex-1 max-w-xs"
        >
          <span class="text-xs text-solar-light/60">{{
            formatTime(currentTime)
          }}</span>
          <div class="flex-1 bg-solar-dark rounded-full h-1">
            <div
              class="bg-solar-orange h-1 rounded-full transition-all duration-300"
              :style="{width: progressPercentage + '%'}"
            ></div>
          </div>
          <span class="text-xs text-solar-light/60">{{
            formatTime(duration)
          }}</span>
        </div>

        <!-- Volume -->
        <div class="hidden lg:flex items-center space-x-2">
          <svg
            class="w-4 h-4 text-solar-light/60"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </svg>
          <input
            v-model="volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            class="w-20 h-1 bg-solar-dark rounded-lg appearance-none cursor-pointer slider"
            aria-label="Volume control"
          />
        </div>

        <!-- Spotify Link -->
        <a
          :href="currentTrack.spotifyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 text-solar-light hover:text-solar-orange transition-colors duration-300"
          aria-label="Open in Spotify"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {usePlayerStore} from '@/stores/player';

const playerStore = usePlayerStore();

const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);
const currentTime = computed(() => playerStore.currentTime);
const duration = computed(() => playerStore.duration);
const volume = computed({
  get: () => playerStore.volume,
  set: (value) => playerStore.setVolume(value),
});
const hasNext = computed(() => playerStore.hasNext);
const hasPrevious = computed(() => playerStore.hasPrevious);

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function togglePlay() {
  playerStore.togglePlay();
}

function next() {
  playerStore.next();
}

function previous() {
  playerStore.previous();
}
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #ff6b35;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #ff6b35;
  cursor: pointer;
  border: none;
}
</style>
