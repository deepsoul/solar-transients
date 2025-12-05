import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {Video} from '@/types';
//https://youtu.be/XsNUGTun7tQ?si=i4U5BvgHUlVrTMEz
export const useVideosStore = defineStore('videos', () => {
  const videos = ref<Video[]>([
    {
      id: '1',
      title: 'Bobby Trumpet After Work',
      date: '2025-01-15',
      youtubeId: 'kbt_VJpDlXk',
      description: 'a funky mix of Bobby Trumpet after work.',
      tags: ['disco', 'djmix', 'house'],
    },
    {
      id: '2',
      title: 'House Arrest',
      date: '2025-10-01',
      youtubeId: 'UWdmz2TV4R0',
      description:
        'DJ Mix Series by Bobby Trumpet, Tracks curated by ‪@SolarTransients‬',
      tags: ['house', 'chill'],
    },
    {
      id: '3',
      title: 'Grrove Session Vol. 1',
      date: '2025-01-15',
      youtubeId: 'XsNUGTun7tQ?',
      description:
        'Vocal House - Classics and new tracks mixed by Bobby Trumpet.',
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
