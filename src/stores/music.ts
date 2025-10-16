import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {Release} from '@/types';

export const useMusicStore = defineStore('music', () => {
  const releases = ref<Release[]>([
    {
      id: '1',
      title: 'Gentle Noise',
      date: '2025-10-16',
      coverUrl: '/images/Solar_Transients_GENTLE_NOISE_COVER.png',
      spotifyUrl:
        'https://open.spotify.com/intl-de/album/2t6qH19ZRcmAlXUz2km3Jc?si=_0XkTeLTTDyO0Z81Tn57rg',
      appleUrl:
        'https://music.apple.com/us/song/why-not-future-bobby-trumpet-remix-80ies-oldschool-version/1846371166',
      tidalUrl: 'https://tidal.com/album/467134096/u',
      previewUrl: '/audio/gentle-noise.mp3',
      description:
        'An ethereal journey through cosmic soundscapes, blending ambient textures with electronic rhythms.',
      tags: ['deep house', 'electronic', 'atmospheric'],
      type: 'Single',
    },
    {
      id: '2',
      title: 'Atmosphere',
      date: '2025-10-10',
      coverUrl: '/images/atmosphere.jpg',
      spotifyUrl: '',
      appleUrl: '',
      tidalUrl: '',
      previewUrl: '/audio/atmosphere.mp3',
      description:
        'Intense electronic compositions inspired by solar phenomena and space exploration.',
      tags: ['electronic', 'soulful', 'techhouse'],
      type: 'Single',
    },
    {
      id: '3',
      title: 'Deeper Sides of Soul',
      date: '2025-10-13',
      coverUrl: '/images/deeper-sides-of-soul.jpg',
      spotifyUrl: '',
      appleUrl: '',
      tidalUrl: '',
      previewUrl: '/audio/deeper-sides-of-soul.mp3',
      description:
        'A collection of introspective pieces exploring the ephemeral nature of consciousness.',
      tags: ['deep house', 'electronic', 'minimalistic'],
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
