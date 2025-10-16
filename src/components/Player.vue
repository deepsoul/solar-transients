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
            :disabled="isLoading || hasError"
            class="p-2 bg-solar-orange text-white rounded-full hover:bg-solar-orange/80 disabled:bg-solar-orange/50 disabled:cursor-not-allowed transition-colors duration-300"
            :aria-label="isPlaying ? 'Pause' : 'Play'"
          >
            <!-- Loading spinner -->
            <svg
              v-if="isLoading"
              class="w-5 h-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <!-- Error icon -->
            <svg
              v-else-if="hasError"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
            <!-- Play icon -->
            <svg
              v-else-if="!isPlaying"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <!-- Pause icon -->
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
          <div
            class="flex-1 bg-solar-dark rounded-full h-1 cursor-pointer"
            @click="handleProgressClick"
          >
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
        <div class="relative group">
          <a
            v-if="currentTrack.spotifyUrl"
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
          <button
            v-else
            disabled
            class="p-2 text-solar-light/30 cursor-not-allowed relative"
            aria-label="Spotify - Coming Soon"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
              />
            </svg>
            <!-- Coming Soon Tooltip -->
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-solar-dark text-solar-orange text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50"
            >
              Coming Soon
              <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-solar-dark"
              ></div>
            </div>
          </button>
        </div>

        <!-- Apple Music Link -->
        <div class="relative group">
          <a
            v-if="currentTrack.appleUrl"
            :href="currentTrack.appleUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 text-solar-light hover:text-solar-orange transition-colors duration-300"
            aria-label="Open in Apple Music"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18-.006.085-.009.17-.014.256v12.096c.004.088.008.175.015.263.01.374.035.747.087 1.118.07.5.178.989.38 1.46.557 1.296 1.48 2.208 2.79 2.756.684.286 1.39.395 2.115.46.24.023.48.038.72.05.03.002.06.008.09.013h12.028c.06-.004.12-.01.18-.013.5-.024.998-.06 1.493-.145.776-.134 1.513-.354 2.192-.726 1.25-.685 2.033-1.71 2.353-3.065.16-.676.22-1.362.23-2.05.003-.114.01-.228.01-.342V6.254c-.003-.042-.007-.084-.01-.13zm-5.3-.638c.107.01.183.044.223.15.04.097.02.185-.03.268-.107.17-.24.33-.37.49-.107.124-.23.248-.35.37-.44.43-.88.86-1.32 1.29-.442.432-.9.85-1.344 1.27-.45.42-.878.86-1.314 1.29-.126.126-.243.26-.37.388-.18.174-.378.332-.59.46-.683.413-1.45.538-2.233.423-.672-.1-1.22-.394-1.664-.847-.534-.543-.888-1.184-1.033-1.923-.13-.654-.09-1.3.1-1.937.16-.54.413-1.03.768-1.467.44-.542.99-.96 1.627-1.24.582-.26 1.19-.388 1.814-.413 1.05-.04 2.033.15 2.95.653.19.103.372.23.555.346.16.1.305.222.478.304.152.07.318.12.49.14.41.044.78-.015 1.145-.15.44-.16.83-.395 1.198-.668.46-.34.922-.678 1.39-1.01.44-.318.88-.638 1.33-.948.1-.07.204-.134.314-.196.07-.038.15-.057.232-.044zm-9.95 6.572c.05-.024.114-.043.172-.04.152.013.304.035.45.077 1.14.33 2.08.98 2.788 1.98.62.87 1.03 1.84 1.204 2.91.096.606.112 1.21.034 1.815-.14 1.09-.54 2.08-1.218 2.95-.457.58-.997 1.04-1.622 1.397-.482.276-.982.49-1.513.635-.75.21-1.512.226-2.28.075-.52-.103-1.003-.29-1.458-.555-.81-.47-1.42-1.125-1.868-1.94-.49-.888-.755-1.84-.83-2.84-.048-.63-.02-1.255.1-1.874.16-.806.476-1.557.924-2.255.503-.78 1.152-1.4 1.957-1.86.554-.317 1.14-.555 1.757-.7.21-.05.42-.08.632-.1.076-.007.14-.02.215-.02z"
              />
            </svg>
          </a>
          <button
            v-else
            disabled
            class="p-2 text-solar-light/30 cursor-not-allowed relative"
            aria-label="Apple Music - Coming Soon"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18-.006.085-.009.17-.014.256v12.096c.004.088.008.175.015.263.01.374.035.747.087 1.118.07.5.178.989.38 1.46.557 1.296 1.48 2.208 2.79 2.756.684.286 1.39.395 2.115.46.24.023.48.038.72.05.03.002.06.008.09.013h12.028c.06-.004.12-.01.18-.013.5-.024.998-.06 1.493-.145.776-.134 1.513-.354 2.192-.726 1.25-.685 2.033-1.71 2.353-3.065.16-.676.22-1.362.23-2.05.003-.114.01-.228.01-.342V6.254c-.003-.042-.007-.084-.01-.13zm-5.3-.638c.107.01.183.044.223.15.04.097.02.185-.03.268-.107.17-.24.33-.37.49-.107.124-.23.248-.35.37-.44.43-.88.86-1.32 1.29-.442.432-.9.85-1.344 1.27-.45.42-.878.86-1.314 1.29-.126.126-.243.26-.37.388-.18.174-.378.332-.59.46-.683.413-1.45.538-2.233.423-.672-.1-1.22-.394-1.664-.847-.534-.543-.888-1.184-1.033-1.923-.13-.654-.09-1.3.1-1.937.16-.54.413-1.03.768-1.467.44-.542.99-.96 1.627-1.24.582-.26 1.19-.388 1.814-.413 1.05-.04 2.033.15 2.95.653.19.103.372.23.555.346.16.1.305.222.478.304.152.07.318.12.49.14.41.044.78-.015 1.145-.15.44-.16.83-.395 1.198-.668.46-.34.922-.678 1.39-1.01.44-.318.88-.638 1.33-.948.1-.07.204-.134.314-.196.07-.038.15-.057.232-.044zm-9.95 6.572c.05-.024.114-.043.172-.04.152.013.304.035.45.077 1.14.33 2.08.98 2.788 1.98.62.87 1.03 1.84 1.204 2.91.096.606.112 1.21.034 1.815-.14 1.09-.54 2.08-1.218 2.95-.457.58-.997 1.04-1.622 1.397-.482.276-.982.49-1.513.635-.75.21-1.512.226-2.28.075-.52-.103-1.003-.29-1.458-.555-.81-.47-1.42-1.125-1.868-1.94-.49-.888-.755-1.84-.83-2.84-.048-.63-.02-1.255.1-1.874.16-.806.476-1.557.924-2.255.503-.78 1.152-1.4 1.957-1.86.554-.317 1.14-.555 1.757-.7.21-.05.42-.08.632-.1.076-.007.14-.02.215-.02z"
              />
            </svg>
            <!-- Coming Soon Tooltip -->
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-solar-dark text-solar-orange text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50"
            >
              Coming Soon
              <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-solar-dark"
              ></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onUnmounted} from 'vue';
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
const isLoading = computed(() => playerStore.isLoading);
const hasError = computed(() => playerStore.hasError);

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

function handleProgressClick(event: MouseEvent) {
  if (!duration.value) return;

  const progressBar = event.currentTarget as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = clickX / rect.width;
  const newTime = percentage * duration.value;

  playerStore.seekTo(newTime);
}

// Cleanup on unmount
onUnmounted(() => {
  playerStore.cleanup();
});
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
