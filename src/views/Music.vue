<template>
  <div class="min-h-screen pt-20">
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

    <!-- Spotify Integration -->
    <section class="py-16 bg-solar-gray">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-display font-bold text-solar-light mb-8">
          Listen on Spotify
        </h2>
        <div class="max-w-2xl mx-auto">
          <iframe
            src="https://open.spotify.com/embed/artist/4i1rRuXVSVhzS0FvVd30fc?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            class="rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {useMusicStore} from '@/stores/music';
import ReleaseCard from '@/components/ReleaseCard.vue';

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
