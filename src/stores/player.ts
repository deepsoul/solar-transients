import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';
import type {Track} from '@/types';
import {analytics} from '@/services/analytics';

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref<Track | null>(null);
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(0.8);
  const playlist = ref<Track[]>([]);
  const currentIndex = ref(0);
  const audioElement = ref<HTMLAudioElement | null>(null);
  const isLoading = ref(false);
  const hasError = ref(false);
  const currentReleaseId = ref<string | null>(null);

  const hasNext = computed(
    () => currentIndex.value < playlist.value.length - 1,
  );
  const hasPrevious = computed(() => currentIndex.value > 0);

  // Initialize audio element
  function initAudio() {
    if (!audioElement.value) {
      audioElement.value = new Audio();
      setupAudioEventListeners();
    }
  }

  function setupAudioEventListeners() {
    if (!audioElement.value) return;

    audioElement.value.addEventListener('loadedmetadata', () => {
      duration.value = audioElement.value?.duration || 0;
      isLoading.value = false;
    });

    audioElement.value.addEventListener('timeupdate', () => {
      currentTime.value = audioElement.value?.currentTime || 0;
    });

    audioElement.value.addEventListener('ended', () => {
      isPlaying.value = false;
      currentTime.value = 0;
      // Auto-play next track if available
      if (hasNext.value) {
        next();
      }
    });

    audioElement.value.addEventListener('error', () => {
      hasError.value = true;
      isLoading.value = false;
      isPlaying.value = false;
    });

    audioElement.value.addEventListener('loadstart', () => {
      isLoading.value = true;
      hasError.value = false;
    });

    audioElement.value.addEventListener('canplay', () => {
      isLoading.value = false;
    });
  }

  function setTrack(track: Track) {
    currentTrack.value = track;
    currentReleaseId.value = track.id; // Set the release ID for visualization
    isPlaying.value = false;
    currentTime.value = 0;
    hasError.value = false;

    if (track.previewUrl) {
      initAudio();
      if (audioElement.value) {
        audioElement.value.src = track.previewUrl;
        audioElement.value.load();
      }
    }

    // Track music selection
    analytics.trackEvent('music_select', {
      track_name: track.title,
      artist: track.artist,
      event_category: 'Music Player',
      event_label: `${track.artist} - ${track.title}`,
    });
  }

  function play() {
    if (audioElement.value && currentTrack.value?.previewUrl) {
      audioElement.value
        .play()
        .then(() => {
          isPlaying.value = true;

          // Track music play
          if (currentTrack.value) {
            analytics.trackMusicPlay(
              currentTrack.value.title,
              currentTrack.value.artist,
            );
          }
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
          hasError.value = true;
        });
    }
  }

  function pause() {
    if (audioElement.value) {
      audioElement.value.pause();
      isPlaying.value = false;
    }
  }

  function togglePlay() {
    if (isPlaying.value) {
      pause();
    } else {
      play();
    }
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
    if (audioElement.value) {
      audioElement.value.volume = volume.value;
    }
  }

  function seekTo(time: number) {
    if (audioElement.value) {
      audioElement.value.currentTime = time;
      currentTime.value = time;
    }
  }

  function stop() {
    if (audioElement.value) {
      audioElement.value.pause();
      audioElement.value.currentTime = 0;
    }
    isPlaying.value = false;
    currentTime.value = 0;
  }

  // Watch volume changes
  watch(volume, (newVolume) => {
    if (audioElement.value) {
      audioElement.value.volume = newVolume;
    }
  });

  // Cleanup on unmount
  function cleanup() {
    if (audioElement.value) {
      audioElement.value.pause();
      audioElement.value.src = '';
      audioElement.value = null;
    }
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
    isLoading,
    hasError,
    currentReleaseId,
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
    seekTo,
    stop,
    cleanup,
  };
});
