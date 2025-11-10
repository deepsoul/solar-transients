import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {Video} from '@/types';

export const useVideosStore = defineStore('videos', () => {
  const videos = ref<Video[]>([
    {
      id: '1',
      title: 'Upbeat Discohouse',
      date: '2025-01-15',
      youtubeId: 'zmtHFtDcVjk',
      description: 'House Blend Vol 12.',
      tags: ['disco', 'djmix', 'house'],
    },
    {
      id: '2',
      title: 'Calm Energy',
      date: '2025-10-01',
      youtubeId: 'Xgpe5EXC6xU',
      description: 'Chill house for a relaxed morning.',
      tags: ['house', 'chill'],
    },
    {
      id: '3',
      title: 'Elegant Deephouse',
      date: '2025-01-15',
      youtubeId: 'iJkg8Kh1zPI',
      description: 'Deep luxory.',
      tags: ['deep house', 'gentleman'],
    },
  ]);
  //RDA5fNOlLDff0

  const featuredVideo = ref<Video | null>(videos.value[0]);

  function getVideoById(id: string) {
    return videos.value.find((video) => video.id === id);
  }

  function getVideosByTag(tag: string) {
    return videos.value.filter((video) => video.tags.includes(tag));
  }

  function getLatestVideos(limit = 3) {
    return videos.value
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  return {
    videos,
    featuredVideo,
    getVideoById,
    getVideosByTag,
    getLatestVideos,
  };
});
