<template>
  <div class="min-h-screen pt-20">
    <!-- SEO Head -->
    <SEOHead
      title="Music - SOLAR TRANSIENTS | Electronic Music Releases & Albums"
      description="Explore SOLAR TRANSIENTS' electronic music releases, albums, and tracks. Discover atmospheric soundscapes, ambient music, and electronic soundtracks with interactive music player."
      keywords="electronic music releases, ambient albums, atmospheric music, electronic tracks, music player, soundscapes, ambient soundtracks, electronic music artist"
      canonical="https://solar-transients.vercel.app/music"
    />

    <!-- Hero Section -->
    <section class="py-16 bg-gradient-to-b from-solar-dark to-solar-gray">
      <div class="container mx-auto px-4 text-center">
        <h1
          class="text-4xl md:text-5xl font-display font-bold text-solar-light mb-6"
        >
          Music
        </h1>
        <p class="text-xl text-solar-light/70 max-w-2xl mx-auto">
          Explore the complete discography of SOLAR TRANSIENTS
        </p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 bg-solar-gray border-b border-solar-dark">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="toggleTag(tag)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
              selectedTags.includes(tag)
                ? 'bg-solar-orange text-white'
                : 'bg-solar-dark text-solar-light/70 hover:text-solar-orange',
            ]"
            :aria-label="`Filter by ${tag}`"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </section>

    <!-- Releases Grid -->
    <section class="py-16 bg-solar-dark">
      <div class="container mx-auto px-4">
        <div v-if="filteredReleases.length === 0" class="text-center py-16">
          <p class="text-solar-light/70 text-lg">
            No releases found matching your filters.
          </p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ReleaseCard
            v-for="release in filteredReleases"
            :key="release.id"
            :release="release"
          />
        </div>
      </div>
    </section>

    <!-- Streaming Platforms -->
    <section class="py-16 bg-solar-gray">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-display font-bold text-solar-light mb-8">
          Listen on Streaming Platforms
        </h2>

        <!-- Streaming Embeds Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <!-- Spotify Embed -->
          <div class="space-y-4">
            <h3
              class="text-xl font-semibold text-solar-light flex items-center justify-center space-x-2"
            >
              <svg
                class="w-6 h-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
                />
              </svg>
              <span>Spotify</span>
            </h3>
            <iframe
              data-testid="spotify-embed"
              style="border-radius: 12px"
              src="https://open.spotify.com/embed/artist/2ZSJNNhcRYBNz29MveX7ql?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowfullscreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              class="rounded-lg"
            ></iframe>
          </div>

          <!-- Tidal Embed -->
          <div class="space-y-4">
            <h3
              class="text-xl font-semibold text-solar-light flex items-center justify-center space-x-2"
            >
              <svg
                class="w-6 h-6 text-cyan-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6S2.4 17.302 2.4 12 6.698 2.4 12 2.4zm0 1.2c-4.642 0-8.4 3.758-8.4 8.4s3.758 8.4 8.4 8.4 8.4-3.758 8.4-8.4-3.758-8.4-8.4-8.4zm0 1.2c3.978 0 7.2 3.222 7.2 7.2s-3.222 7.2-7.2 7.2S4.8 15.978 4.8 12 8.022 4.8 12 4.8zm0 1.2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 1.2c2.651 0 4.8 2.149 4.8 4.8s-2.149 4.8-4.8 4.8S7.2 14.651 7.2 12 9.349 7.2 12 7.2zm0 1.2c-1.988 0-3.6 1.612-3.6 3.6s1.612 3.6 3.6 3.6 3.6-1.612 3.6-3.6-1.612-3.6-3.6-3.6zm0 1.2c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4S9.6 13.325 9.6 12s1.075-2.4 2.4-2.4z"
                />
              </svg>
              <span>Tidal</span>
            </h3>
            <iframe
              data-testid="tidal-embed"
              src="https://embed.tidal.com/albums/467134096"
              width="100%"
              height="352"
              allow="encrypted-media; fullscreen; clipboard-write https://embed.tidal.com; web-share"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              style="color-scheme: light dark; border-radius: 12px"
              title="TIDAL Embed Player"
              frameBorder="0"
              loading="lazy"
              class="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {useMusicStore} from '@/stores/music';
import ReleaseCard from '@/components/ReleaseCard.vue';
import SEOHead from '@/components/SEOHead.vue';

const musicStore = useMusicStore();
const selectedTags = ref<string[]>([]);

const allTags = computed(() => {
  const tags = new Set<string>();
  musicStore.releases.forEach((release) => {
    release.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

const filteredReleases = computed(() => {
  if (selectedTags.value.length === 0) {
    return musicStore.releases;
  }

  return musicStore.releases.filter((release) =>
    selectedTags.value.some((tag) => release.tags.includes(tag)),
  );
});

function toggleTag(tag: string) {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
}

onMounted(() => {
  // Set page title and meta
  document.title = 'Music - SOLAR TRANSIENTS';
});
</script>
