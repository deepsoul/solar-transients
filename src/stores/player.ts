import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import type {Track} from '@/types';

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref<Track | null>(null);
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(0.8);
  const playlist = ref<Track[]>([]);
  const currentIndex = ref(0);

  const hasNext = computed(
    () => currentIndex.value < playlist.value.length - 1,
  );
  const hasPrevious = computed(() => currentIndex.value > 0);

  function setTrack(track: Track) {
    currentTrack.value = track;
    isPlaying.value = false;
    currentTime.value = 0;
  }

  function play() {
    isPlaying.value = true;
  }

  function pause() {
    isPlaying.value = false;
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value;
  }

  function next() {
    if (hasNext.value) {
      currentIndex.value++;
      setTrack(playlist.value[currentIndex.value]);
    }
  }

  function previous() {
    if (hasPrevious.value) {
      currentIndex.value--;
      setTrack(playlist.value[currentIndex.value]);
    }
  }

  function setPlaylist(tracks: Track[], startIndex = 0) {
    playlist.value = tracks;
    currentIndex.value = startIndex;
    setTrack(tracks[startIndex]);
  }

  function setCurrentTime(time: number) {
    currentTime.value = time;
  }

  function setDuration(dur: number) {
    duration.value = dur;
  }

  function setVolume(vol: number) {
    volume.value = Math.max(0, Math.min(1, vol));
  }

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playlist,
    currentIndex,
    hasNext,
    hasPrevious,
    setTrack,
    play,
    pause,
    togglePlay,
    next,
    previous,
    setPlaylist,
    setCurrentTime,
    setDuration,
    setVolume,
  };
});
