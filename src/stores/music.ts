import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {Release} from '@/types';

export const useMusicStore = defineStore('music', () => {
  const releases = ref<Release[]>([
    {
      id: '1',
      title: 'Cosmic Drift',
      date: '2024-01-15',
      coverUrl: '/images/cosmic-drift-cover.jpg',
      spotifyUrl: 'https://open.spotify.com/album/example1',
      appleUrl: 'https://music.apple.com/album/example1',
      previewUrl: '/audio/cosmic-drift-preview.mp3',
      description:
        'An ethereal journey through cosmic soundscapes, blending ambient textures with electronic rhythms.',
      tags: ['ambient', 'electronic', 'atmospheric'],
      type: 'EP',
    },
    {
      id: '2',
      title: 'Solar Flares',
      date: '2023-11-20',
      coverUrl: '/images/solar-flares-cover.jpg',
      spotifyUrl: 'https://open.spotify.com/album/example2',
      appleUrl: 'https://music.apple.com/album/example2',
      previewUrl: '/audio/solar-flares-preview.mp3',
      description:
        'Intense electronic compositions inspired by solar phenomena and space exploration.',
      tags: ['electronic', 'experimental', 'space'],
      type: 'Album',
    },
    {
      id: '3',
      title: 'Transient States',
      date: '2023-08-10',
      coverUrl: '/images/transient-states-cover.jpg',
      spotifyUrl: 'https://open.spotify.com/album/example3',
      appleUrl: 'https://music.apple.com/album/example3',
      previewUrl: '/audio/transient-states-preview.mp3',
      description:
        'A collection of introspective pieces exploring the ephemeral nature of consciousness.',
      tags: ['ambient', 'meditative', 'experimental'],
      type: 'Single',
    },
  ]);

  const featuredRelease = ref<Release | null>(releases.value[0]);

  function getReleaseById(id: string) {
    return releases.value.find((release) => release.id === id);
  }

  function getReleasesByTag(tag: string) {
    return releases.value.filter((release) => release.tags.includes(tag));
  }

  function getLatestReleases(limit = 3) {
    return releases.value
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  return {
    releases,
    featuredRelease,
    getReleaseById,
    getReleasesByTag,
    getLatestReleases,
  };
});
