<template>
  <div class="group bg-solar-gray/50 rounded-lg overflow-hidden card-hover">
    <!-- Cover Image -->
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="release.coverUrl"
        :alt="release.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"
      ></div>

      <!-- Play Button Overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button
          @click="playPreview"
          class="p-4 bg-solar-orange/90 text-white rounded-full hover:bg-solar-orange transition-colors duration-300 glow-effect"
          :aria-label="`Play preview of ${release.title}`"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <!-- Release Type Badge -->
      <div class="absolute top-3 right-3">
        <span
          class="px-2 py-1 bg-solar-orange text-white text-xs font-medium rounded-full"
        >
          {{ release.type }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3
        class="text-lg font-semibold text-solar-light mb-2 group-hover:text-solar-orange transition-colors duration-300"
      >
        {{ release.title }}
      </h3>

      <p class="text-solar-light/70 text-sm mb-3 line-clamp-2">
        {{ release.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-4">
        <span
          v-for="tag in release.tags"
          :key="tag"
          class="px-2 py-1 bg-solar-dark text-solar-light/60 text-xs rounded-full"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Release Date -->
      <p class="text-solar-light/50 text-xs mb-4">
        {{ formatDate(release.date) }}
      </p>

      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <div class="relative group flex-1">
          <a
            v-if="release.spotifyUrl"
            :href="release.spotifyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-solar-orange text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-solar-orange/80 transition-colors duration-300 flex items-center justify-center space-x-1"
            aria-label="Listen on Spotify"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
              />
            </svg>
            <span>Spotify</span>
          </a>
          <button
            v-else
            disabled
            class="w-full bg-solar-orange/30 text-solar-light/50 text-center py-2 px-3 rounded-md text-sm font-medium cursor-not-allowed flex items-center justify-center space-x-1"
            aria-label="Spotify - Coming Soon"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
              />
            </svg>
            <span>Spotify</span>
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

        <div class="relative group flex-1">
          <a
            v-if="release.appleUrl"
            :href="release.appleUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="border border-solar-orange text-solar-orange text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-solar-orange hover:text-white transition-colors duration-300 flex items-center justify-center space-x-1"
            aria-label="Listen on Apple Music"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6S2.4 17.3 2.4 12 6.7 2.4 12 2.4zm0 1.2c-4.6 0-8.4 3.8-8.4 8.4s3.8 8.4 8.4 8.4 8.4-3.8 8.4-8.4-3.8-8.4-8.4-8.4zm0 1.2c4 0 7.2 3.2 7.2 7.2s-3.2 7.2-7.2 7.2S4.8 16 4.8 12 8 4.8 12 4.8zm0 1.2c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 1.2c2.6 0 4.8 2.2 4.8 4.8s-2.2 4.8-4.8 4.8S7.2 14.6 7.2 12 9.4 7.2 12 7.2z"
              />
            </svg>
            <span>Apple</span>
          </a>
          <button
            v-else
            disabled
            class="w-full border border-solar-orange/30 text-solar-orange/30 text-center py-2 px-3 rounded-md text-sm font-medium cursor-not-allowed flex items-center justify-center space-x-1"
            aria-label="Apple Music - Coming Soon"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6S2.4 17.3 2.4 12 6.7 2.4 12 2.4zm0 1.2c-4.6 0-8.4 3.8-8.4 8.4s3.8 8.4 8.4 8.4 8.4-3.8 8.4-8.4-3.8-8.4-8.4-8.4zm0 1.2c4 0 7.2 3.2 7.2 7.2s3.2 7.2-7.2 7.2S4.8 16 4.8 12 8 4.8 12 4.8zm0 1.2c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 1.2c2.6 0 4.8 2.2 4.8 4.8s-2.2 4.8-4.8 4.8S7.2 14.6 7.2 12 9.4 7.2 12 7.2z"
              />
            </svg>
            <span>Apple</span>
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
import {usePlayerStore} from '@/stores/player';
import type {Release, Track} from '@/types';

interface Props {
  release: Release;
}

const props = defineProps<Props>();
const playerStore = usePlayerStore();

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function playPreview() {
  if (props.release.previewUrl) {
    const track: Track = {
      id: props.release.id,
      title: props.release.title,
      artist: 'SOLAR TRANSIENTS',
      duration: 30, // 30 second preview
      previewUrl: props.release.previewUrl,
      spotifyUrl: props.release.spotifyUrl,
      coverUrl: props.release.coverUrl,
    };

    playerStore.setTrack(track);
    playerStore.play();
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
