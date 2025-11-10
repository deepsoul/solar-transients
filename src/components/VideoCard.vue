<template>
  <div
    class="bg-solar-gray rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <!-- YouTube Embed -->
    <div class="relative w-full" style="padding-bottom: 56.25%">
      <iframe
        :src="`https://www.youtube.com/embed/${video.youtubeId}`"
        :title="video.title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="absolute top-0 left-0 w-full h-full rounded-t-lg"
        loading="lazy"
      ></iframe>
    </div>

    <!-- Video Info -->
    <div class="p-6">
      <h3 class="text-xl font-semibold text-solar-light mb-2">
        {{ video.title }}
      </h3>
      <p class="text-solar-light/70 text-sm mb-4">
        {{ formatDate(video.date) }}
      </p>
      <p class="text-solar-light/80 mb-4">{{ video.description }}</p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in video.tags"
          :key="tag"
          class="px-3 py-1 bg-solar-dark text-solar-orange text-xs rounded-full"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Video} from '@/types';

defineProps<{
  video: Video;
}>();

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>

