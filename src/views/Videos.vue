<template>
  <div class="min-h-screen pt-20">
    <!-- SEO Head -->
    <SEOHead
      title="Videos - SOLAR TRANSIENTS | YouTube Music Videos"
      description="Watch SOLAR TRANSIENTS' music videos, live performances, and behind-the-scenes content on YouTube."
      keywords="music videos, YouTube, electronic music videos, live performances, music artist videos"
      canonical="https://solar-transients.de/videos"
    />

    <!-- Hero Section -->
    <section class="py-16 bg-gradient-to-b from-solar-dark to-solar-gray">
      <div class="container mx-auto px-4 text-center">
        <h1
          class="text-4xl md:text-5xl font-display font-bold text-solar-light mb-6"
        >
          Videos
        </h1>
        <p class="text-xl text-solar-light/70 max-w-2xl mx-auto">
          Watch music videos, live performances, and more from SOLAR TRANSIENTS
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

    <!-- Videos Grid -->
    <section class="py-16 bg-solar-dark">
      <div class="container mx-auto px-4">
        <div v-if="filteredVideos.length === 0" class="text-center py-16">
          <p class="text-solar-light/70 text-lg">
            No videos found matching your filters.
          </p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <VideoCard
            v-for="video in filteredVideos"
            :key="video.id"
            :video="video"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {useVideosStore} from '@/stores/videos';
import VideoCard from '@/components/VideoCard.vue';
import SEOHead from '@/components/SEOHead.vue';

const videosStore = useVideosStore();
const selectedTags = ref<string[]>([]);

const allTags = computed(() => {
  const tags = new Set<string>();
  videosStore.videos.forEach((video) => {
    video.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

const filteredVideos = computed(() => {
  if (selectedTags.value.length === 0) {
    return videosStore.videos;
  }

  return videosStore.videos.filter((video) =>
    selectedTags.value.some((tag) => video.tags.includes(tag)),
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
  document.title = 'Videos - SOLAR TRANSIENTS';
});
</script>

