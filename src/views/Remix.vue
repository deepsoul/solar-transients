<template>
  <div class="min-h-screen bg-solar-dark text-solar-light">
    <!-- Header -->
    <div class="container mx-auto px-6 py-8">
      <div class="text-center mb-8 sm:mb-12 px-4">
        <h1
          class="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-gradient mb-3 sm:mb-4"
        >
          REMIX LAB
        </h1>
        <p
          class="text-sm sm:text-lg text-solar-light/80 max-w-2xl mx-auto leading-relaxed"
        >
          Erstelle deine eigenen Loops und Beats durch interaktive Kreise. Jeder
          Kreis ist eine Spur - je kleiner, desto häufiger spielt sie.
        </p>
      </div>

      <!-- Controls -->
      <div
        class="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8 px-4"
      >
        <!-- Primary Controls Row -->
        <div class="flex justify-center gap-2 sm:gap-4">
          <button
            @click="togglePlayback"
            class="btn-primary flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2"
            :class="{'bg-green-600 hover:bg-green-700': isPlaying}"
          >
            <svg
              v-if="!isPlaying"
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg
              v-else
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
            <span class="hidden sm:inline">{{
              isPlaying ? 'Stop' : 'Play'
            }}</span>
          </button>

          <button
            @click="clearAllTracks"
            class="btn-secondary text-sm sm:text-base px-3 sm:px-4 py-2"
          >
            Clear All
          </button>

          <button
            @click="syncAllTracks"
            class="btn-secondary flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2"
            :class="{'bg-solar-orange text-white': isSynced}"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
            <span class="hidden sm:inline">{{
              isSynced ? 'Synced' : 'Sync'
            }}</span>
          </button>
        </div>

        <!-- Download Controls Row (Desktop Only) -->
        <div class="hidden sm:flex flex-row items-center gap-2">
          <select
            v-model="downloadFormat"
            class="bg-solar-dark border border-solar-gray rounded px-3 py-2 text-solar-light text-sm"
            :disabled="isRecording"
          >
            <option value="wav">WAV (Uncompressed)</option>
            <option value="mp3">MP3 (WAV Format)</option>
          </select>
          <button
            @click="downloadMix"
            class="btn-secondary flex items-center gap-2 text-sm px-3 py-2"
            :disabled="isRecording"
            :class="{'opacity-50 cursor-not-allowed': isRecording}"
          >
            <svg
              v-if="isRecording"
              class="w-4 h-4 animate-spin"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
            <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            <span>{{ isRecording ? 'Recording...' : 'Download Mix' }}</span>
          </button>
        </div>
      </div>

      <!-- Sync Settings -->
      <div v-if="tracks.length > 0" class="mb-8 max-w-2xl mx-auto">
        <div class="bg-solar-gray/30 rounded-lg overflow-hidden">
          <!-- Sync Header (Always Visible) -->
          <button
            @click="isSyncExpanded = !isSyncExpanded"
            class="w-full p-4 text-left flex items-center justify-between hover:bg-solar-gray/20 transition-colors"
          >
            <h3 class="text-lg font-semibold flex items-center">
              <span class="mr-2">🎵</span>
              Rhythmus-Synchronisation
            </h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-solar-light/60">{{ bpm }} BPM</span>
              <svg
                :class="[
                  'w-5 h-5 transition-transform',
                  isSyncExpanded ? 'rotate-180' : '',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          <!-- Sync Content (Collapsible) -->
          <div
            v-show="isSyncExpanded"
            class="px-4 pb-4 border-t border-solar-gray/20"
          >
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end"
            >
              <!-- BPM Control -->
              <div class="sm:col-span-2 lg:col-span-1">
                <label class="block text-sm font-medium mb-2">BPM</label>
                <input
                  v-model.number="bpm"
                  type="range"
                  min="60"
                  max="180"
                  step="5"
                  class="w-full h-2 bg-solar-gray rounded-lg appearance-none cursor-pointer slider"
                />
                <div class="text-center text-sm text-solar-light/80 mt-1">
                  {{ bpm }} BPM
                </div>
              </div>

              <!-- Sync Mode -->
              <div class="sm:col-span-2 lg:col-span-1">
                <label class="block text-sm font-medium mb-2">Sync-Modus</label>
                <select
                  v-model="syncMode"
                  class="w-full p-2 bg-solar-dark border border-solar-gray rounded text-solar-light text-sm"
                >
                  <option value="off">Aus</option>
                  <option value="quantize">Quantisieren</option>
                  <option value="grid">Grid</option>
                </select>
              </div>

              <!-- Sync Actions -->
              <div class="flex gap-2 sm:col-span-2 lg:col-span-1">
                <button
                  @click="syncAllTracks"
                  class="btn-primary flex-1 text-sm py-2"
                  :class="{'bg-green-600 hover:bg-green-700': isSynced}"
                >
                  {{ isSynced ? 'Re-Sync' : 'Sync' }}
                </button>
                <button
                  v-if="isSynced"
                  @click="resetSync"
                  class="btn-secondary text-sm py-2 px-3"
                >
                  Reset
                </button>
              </div>
            </div>

            <div class="mt-3 text-xs text-solar-light/60 text-center">
              <span v-if="isSynced" class="text-solar-orange"
                >✓ Alle Spuren sind synchronisiert</span
              >
              <span v-else
                >Spuren werden auf musikalische Rhythmen quantisiert</span
              >
            </div>

            <!-- Debug Info -->
            <div
              v-if="isSynced && tracks.length > 0"
              class="mt-2 text-xs text-solar-light/40 text-center"
            >
              <div>BPM: {{ bpm }} | Modus: {{ syncMode }}</div>
              <div>
                Spuren: {{ tracks.length }} | Sync:
                {{ isSynced ? 'Aktiv' : 'Inaktiv' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Circle Canvas -->
      <div class="flex flex-col items-center space-y-6 mb-4 sm:mb-8">
        <div>
          <svg
            ref="canvasRef"
            :width="canvasSize"
            :height="canvasSize"
            class="border-2 border-solar-gray rounded-full cursor-crosshair w-full max-w-sm sm:max-w-md md:max-w-none"
            @click="addTrack"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
          >
            <!-- Main Circle Background -->
            <circle
              :cx="canvasSize / 2"
              :cy="canvasSize / 2"
              :r="canvasSize / 2 - 2"
              fill="none"
              stroke="url(#mainGradient)"
              stroke-width="2"
              opacity="0.3"
            />

            <!-- Track Circles -->
            <circle
              v-for="(track, index) in tracks"
              :key="track.id"
              :cx="isFinite(track.x) ? track.x : 300"
              :cy="isFinite(track.y) ? track.y : 300"
              :r="isFinite(track.radius) ? track.radius : 20"
              :fill="track.color"
              :stroke="track.strokeColor"
              :stroke-width="2"
              :opacity="track.opacity"
              class="cursor-pointer transition-all duration-300 hover:opacity-100 touch-manipulation"
              @click.stop="selectTrack(track)"
              @contextmenu.prevent="removeTrack(track.id)"
              @touchstart.stop="handleTouchStart(track, $event)"
              @touchend.stop="handleTouchEnd(track, $event)"
            />

            <!-- Markers -->
            <circle
              v-for="(marker, index) in markers"
              :key="`marker-${index}`"
              :cx="marker.x"
              :cy="marker.y"
              :r="4"
              :fill="marker.color"
              :stroke="marker.strokeColor"
              :stroke-width="1"
              class="animate-pulse"
            />

            <!-- Playhead -->
            <circle
              v-if="isPlaying"
              :cx="isFinite(playheadX) ? playheadX : 300"
              :cy="isFinite(playheadY) ? playheadY : 300"
              :r="6"
              :fill="playheadColor"
              :stroke="playheadStrokeColor"
              :stroke-width="2"
              class="animate-pulse"
            />

            <!-- Gradients -->
            <defs>
              <radialGradient id="mainGradient" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  :style="`stop-color:${colors.orange};stop-opacity:0.8`"
                />
                <stop
                  offset="50%"
                  :style="`stop-color:${colors.purple};stop-opacity:0.4`"
                />
                <stop
                  offset="100%"
                  :style="`stop-color:${colors.cyan};stop-opacity:0.2`"
                />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <!-- Instructions -->
        <div
          class="text-center text-xs sm:text-sm text-solar-light/60 px-4 max-w-md"
        >
          <div class="space-y-1">
            <p class="hidden sm:block">
              Klicke in den Kreis um eine Spur hinzuzufügen
            </p>
            <p class="sm:hidden leading-tight">
              Tippe in den Kreis um eine Spur hinzuzufügen
            </p>
            <p class="hidden sm:block text-xs">
              Rechtsklick auf eine Spur zum Löschen
            </p>
            <p class="sm:hidden text-xs leading-tight">
              Lange drücken zum Löschen
            </p>
          </div>
        </div>
      </div>

      <!-- Track Info -->
      <div v-if="selectedTrack" class="mt-12 max-w-2xl mx-auto px-4">
        <div class="bg-solar-gray/50 rounded-lg p-4 sm:p-6">
          <h3 class="text-lg font-semibold mb-4">Spur bearbeiten</h3>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <!-- Left Column: Basic Controls -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2"
                  >Frequenz (je kleiner, desto häufiger)</label
                >
                <input
                  v-model.number="selectedTrack.frequency"
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  class="w-full h-2 bg-solar-gray rounded-lg appearance-none cursor-pointer slider"
                />
                <div class="text-xs text-solar-light/60 mt-1">
                  {{ selectedTrack.frequency.toFixed(1) }}x
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Lautstärke</label>
                <input
                  v-model.number="selectedTrack.volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  class="w-full h-2 bg-solar-gray rounded-lg appearance-none cursor-pointer slider"
                />
                <div class="text-xs text-solar-light/60 mt-1">
                  {{ Math.round(selectedTrack.volume * 100) }}%
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Tonhöhe</label>
                <input
                  v-model.number="selectedTrack.pitch"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  class="w-full"
                />
                <div class="text-xs text-solar-light/60 mt-1">
                  {{ selectedTrack.pitch.toFixed(1) }}x
                </div>
              </div>
            </div>

            <!-- Right Column: Sound Selection -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Sound-Typ</label>
                <div class="flex gap-2 mb-3">
                  <button
                    @click="selectedTrack.soundType = 'synthesized'"
                    class="px-3 py-1 text-sm rounded"
                    :class="
                      selectedTrack.soundType === 'synthesized'
                        ? 'bg-solar-orange text-white'
                        : 'bg-solar-gray text-solar-light'
                    "
                  >
                    Synthesized
                  </button>
                  <button
                    @click="selectedTrack.soundType = 'sample'"
                    class="px-3 py-1 text-sm rounded"
                    :class="
                      selectedTrack.soundType === 'sample'
                        ? 'bg-solar-orange text-white'
                        : 'bg-solar-gray text-solar-light'
                    "
                  >
                    Sample
                  </button>
                </div>
              </div>

              <!-- Sample Selection -->
              <div v-if="selectedTrack.soundType === 'sample'">
                <label class="block text-sm font-medium mb-2"
                  >Sample auswählen</label
                >
                <select
                  v-model="selectedTrack.samplePath"
                  @change="loadSampleForTrack"
                  class="w-full p-2 bg-solar-dark border border-solar-gray rounded text-solar-light"
                >
                  <option value="">Wähle ein Sample...</option>
                  <optgroup
                    v-for="category in getSoundCategories()"
                    :key="category"
                    :label="category"
                  >
                    <option
                      v-for="asset in getSoundsByCategory(category)"
                      :key="asset.path"
                      :value="asset.path"
                    >
                      {{ asset.name }}
                    </option>
                  </optgroup>
                </select>
              </div>

              <!-- File Upload -->
              <div>
                <label class="block text-sm font-medium mb-2"
                  >Eigenes Sample hochladen</label
                >
                <input
                  type="file"
                  accept="audio/*"
                  @change="handleFileUpload"
                  class="w-full p-2 bg-solar-dark border border-solar-gray rounded text-solar-light file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-solar-orange file:text-white hover:file:bg-solar-orange/80"
                />
                <div class="text-xs text-solar-light/60 mt-1">
                  Max. 2 Sekunden, alle Audio-Formate
                </div>
                <div
                  v-if="
                    selectedTrack?.soundType === 'sample' &&
                    selectedTrack?.samplePath
                  "
                  class="text-xs text-solar-orange mt-1"
                >
                  ✓ Sample geladen:
                  {{
                    selectedTrack.samplePath
                      .split('_')
                      .pop()
                      ?.replace(/\.[^/.]+$/, '')
                  }}
                </div>
              </div>
            </div>
          </div>

          <!-- Effects Section -->
          <div class="mt-6 pt-6 border-t border-solar-gray">
            <h4 class="text-lg font-semibold mb-4 text-solar-orange">
              Effekte
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Reverb -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium">Hall (Reverb)</label>
                  <input
                    v-model="selectedTrack.effects.reverb.enabled"
                    type="checkbox"
                    class="w-4 h-4 text-solar-orange bg-solar-dark border-solar-gray rounded focus:ring-solar-orange"
                  />
                </div>

                <div
                  v-if="selectedTrack.effects.reverb.enabled"
                  class="space-y-3"
                >
                  <div>
                    <label class="block text-xs text-solar-light/80 mb-1"
                      >Intensität</label
                    >
                    <input
                      v-model.number="selectedTrack.effects.reverb.amount"
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      class="w-full"
                    />
                    <div class="text-xs text-solar-light/60 mt-1">
                      {{
                        Math.round(selectedTrack.effects.reverb.amount * 100)
                      }}%
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-solar-light/80 mb-1"
                      >Raumgröße</label
                    >
                    <input
                      v-model.number="selectedTrack.effects.reverb.roomSize"
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      class="w-full"
                    />
                    <div class="text-xs text-solar-light/60 mt-1">
                      {{
                        Math.round(selectedTrack.effects.reverb.roomSize * 100)
                      }}%
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delay -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium">Delay</label>
                  <input
                    v-model="selectedTrack.effects.delay.enabled"
                    type="checkbox"
                    class="w-4 h-4 text-solar-orange bg-solar-dark border-solar-gray rounded focus:ring-solar-orange"
                  />
                </div>

                <div
                  v-if="selectedTrack.effects.delay.enabled"
                  class="space-y-3"
                >
                  <div>
                    <label class="block text-xs text-solar-light/80 mb-1"
                      >Zeit</label
                    >
                    <input
                      v-model.number="selectedTrack.effects.delay.time"
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      class="w-full"
                    />
                    <div class="text-xs text-solar-light/60 mt-1">
                      {{ Math.round(selectedTrack.effects.delay.time * 500) }}ms
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-solar-light/80 mb-1"
                      >Feedback</label
                    >
                    <input
                      v-model.number="selectedTrack.effects.delay.feedback"
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      class="w-full"
                    />
                    <div class="text-xs text-solar-light/60 mt-1">
                      {{
                        Math.round(selectedTrack.effects.delay.feedback * 100)
                      }}%
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-solar-light/80 mb-1"
                      >Mix</label
                    >
                    <input
                      v-model.number="selectedTrack.effects.delay.mix"
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      class="w-full"
                    />
                    <div class="text-xs text-solar-light/60 mt-1">
                      {{ Math.round(selectedTrack.effects.delay.mix * 100) }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Download Section (Mobile Only) -->
          <div class="mt-6 pt-6 border-t border-solar-gray sm:hidden">
            <h4 class="text-lg font-semibold mb-4 text-solar-orange">
              Download Mix
            </h4>

            <div class="flex flex-col gap-3">
              <select
                v-model="downloadFormat"
                class="w-full p-3 bg-solar-dark border border-solar-gray rounded text-solar-light"
                :disabled="isRecording"
              >
                <option value="wav">WAV (Uncompressed)</option>
                <option value="mp3">MP3 (WAV Format)</option>
              </select>

              <button
                @click="downloadMix"
                class="w-full btn-secondary flex items-center justify-center gap-2 py-3"
                :disabled="isRecording"
                :class="{'opacity-50 cursor-not-allowed': isRecording}"
              >
                <svg
                  v-if="isRecording"
                  class="w-5 h-5 animate-spin"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                <span>{{ isRecording ? 'Recording...' : 'Download Mix' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Snackbar Container -->
    <SnackbarContainer />
  </div>
</template>

<style scoped>
/* Mobile-optimized sliders */
.slider {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.slider::-webkit-slider-track {
  background: #374151;
  height: 8px;
  border-radius: 4px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #ff6b35;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #1f2937;
}

.slider::-moz-range-track {
  background: #374151;
  height: 8px;
  border-radius: 4px;
  border: none;
}

.slider::-moz-range-thumb {
  background: #ff6b35;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #1f2937;
}

/* Touch-friendly interactions */
.touch-manipulation {
  touch-action: manipulation;
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  .btn-primary,
  .btn-secondary {
    min-height: 44px; /* iOS recommended touch target size */
  }

  input[type='range'] {
    min-height: 44px;
  }

  select {
    min-height: 44px;
  }
}
</style>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from 'vue';
import {useSnackbar} from '@/stores/snackbar';
import SnackbarContainer from '@/components/SnackbarContainer.vue';

// Canvas setup
const canvasRef = ref<SVGElement>();
const canvasSize = ref(600);

// Responsive canvas size
const updateCanvasSize = () => {
  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;

  if (isSmallMobile) {
    canvasSize.value = Math.min(window.innerWidth - 60, 320);
  } else if (isMobile) {
    canvasSize.value = Math.min(window.innerWidth - 40, 400);
  } else {
    canvasSize.value = 600;
  }
};

onMounted(() => {
  updateCanvasSize();
  window.addEventListener('resize', updateCanvasSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateCanvasSize);
});

// State
const isPlaying = ref(false);
const tracks = ref<Track[]>([]);
const markers = ref<Marker[]>([]);
const selectedTrack = ref<Track | null>(null);
const playheadAngle = ref(0);
const audioContext = ref<AudioContext | null>(null);
const animationId = ref<number | null>(null);
const isRecording = ref(false);
const soundAssets = ref<SoundAsset[]>([]);
const uploadedSamples = ref<Map<string, AudioBuffer>>(new Map());
const bpm = ref(120);
const isSynced = ref(false);
const syncMode = ref<'off' | 'quantize' | 'grid'>('off');
const downloadFormat = ref<'wav' | 'mp3'>('wav');
const isSyncExpanded = ref(false);

// Snackbar
const {success, error, info} = useSnackbar();

// Colors from the existing design system
const colors = {
  orange: '#FF6B35',
  gold: '#f7931e',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
};

// Types
interface Track {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  strokeColor: string;
  opacity: number;
  frequency: number; // How often it plays (0.1 = very often, 2 = rarely)
  volume: number;
  pitch: number;
  lastPlayTime: number;
  soundType: 'synthesized' | 'sample';
  samplePath?: string;
  audioBuffer?: AudioBuffer;
  effects: {
    reverb: {
      enabled: boolean;
      amount: number; // 0-1
      roomSize: number; // 0-1
    };
    delay: {
      enabled: boolean;
      time: number; // 0-1 (0 = no delay, 1 = max delay)
      feedback: number; // 0-1
      mix: number; // 0-1 (dry/wet ratio)
    };
  };
}

interface SoundAsset {
  name: string;
  path: string;
  category: string;
}

interface Marker {
  x: number;
  y: number;
  color: string;
  strokeColor: string;
}

// Computed properties
const playheadX = computed(() => {
  const size = canvasSize.value || 600; // Fallback to 600 if not initialized
  const centerX = size / 2;
  const radius = size / 2 - 50;
  return centerX + Math.cos(playheadAngle.value) * radius;
});

const playheadY = computed(() => {
  const size = canvasSize.value || 600; // Fallback to 600 if not initialized
  const centerY = size / 2;
  const radius = size / 2 - 50;
  return centerY + Math.sin(playheadAngle.value) * radius;
});

const playheadColor = computed(() => colors.orange);
const playheadStrokeColor = computed(() => colors.gold);

// Track colors based on position
const getTrackColor = (x: number, y: number) => {
  const size = canvasSize.value || 600; // Fallback to 600 if not initialized
  const centerX = size / 2;
  const centerY = size / 2;
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  const maxDistance = size / 2 - 50;
  const ratio = distance / maxDistance;

  if (ratio < 0.3) return colors.orange;
  if (ratio < 0.6) return colors.gold;
  if (ratio < 0.8) return colors.purple;
  return colors.cyan;
};

const getTrackStrokeColor = (color: string) => {
  return color === colors.orange ? colors.gold : colors.orange;
};

// Effect functions
const createReverbEffect = (
  ctx: AudioContext,
  amount: number,
  roomSize: number,
) => {
  const convolver = ctx.createConvolver();

  // Create a simple reverb impulse response
  const length = ctx.sampleRate * 2; // 2 seconds
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      const decay = Math.pow(1 - i / length, 2);
      const noise = (Math.random() * 2 - 1) * decay * amount;
      channelData[i] = noise * roomSize;
    }
  }

  convolver.buffer = impulse;
  return convolver;
};

const createDelayEffect = (
  ctx: AudioContext,
  time: number,
  feedback: number,
  mix: number,
) => {
  const delay = ctx.createDelay(1); // Max 1 second delay
  const feedbackGain = ctx.createGain();
  const wetGain = ctx.createGain();
  const dryGain = ctx.createGain();

  // Set delay time (0-1 maps to 0-500ms)
  delay.delayTime.setValueAtTime(time * 0.5, ctx.currentTime);

  // Set feedback
  feedbackGain.gain.setValueAtTime(feedback * 0.6, ctx.currentTime);

  // Set wet/dry mix
  wetGain.gain.setValueAtTime(mix, ctx.currentTime);
  dryGain.gain.setValueAtTime(1 - mix, ctx.currentTime);

  // Connect the delay chain
  delay.connect(feedbackGain);
  feedbackGain.connect(delay);

  return {delay, wetGain, dryGain};
};

// Load sound assets
const loadSoundAssets = async () => {
  try {
    // Define available sound assets
    const assets: SoundAsset[] = [
      {
        name: 'Snare Wide',
        path: '/audio/remix-assets/91V_PUKG_snare_wide.wav',
        category: 'Drums',
      },
      {
        name: 'Kick One Shot',
        path: '/audio/remix-assets/DSC_HWD_kick_one_shot_lud_med.wav',
        category: 'Drums',
      },
      {
        name: 'Synth Stab C',
        path: '/audio/remix-assets/KASTLE_synth_stab_01_C.wav',
        category: 'Synth',
      },
    ];

    soundAssets.value = assets;

    // Preload all sound assets
    for (const asset of assets) {
      try {
        const response = await fetch(asset.path);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.value!.decodeAudioData(
          arrayBuffer,
        );
        uploadedSamples.value.set(asset.path, audioBuffer);
      } catch (error) {
        console.warn(`Failed to load sound asset: ${asset.name}`, error);
      }
    }
  } catch (error) {
    console.error('Error loading sound assets:', error);
  }
};

// Handle file upload
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  // Check file size (max 2 seconds at 44.1kHz = ~176KB for 16-bit mono)
  const maxSize = 176000; // Approximate size for 2 seconds
  if (file.size > maxSize) {
    alert('Datei ist zu groß! Maximal 2 Sekunden erlaubt.');
    return;
  }

  // Check file type
  if (!file.type.startsWith('audio/')) {
    alert('Bitte wähle eine Audio-Datei aus!');
    return;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.value!.decodeAudioData(arrayBuffer);

    // Check duration
    if (audioBuffer.duration > 2) {
      alert('Audio-Datei ist zu lang! Maximal 2 Sekunden erlaubt.');
      return;
    }

    // Store the sample
    const samplePath = `uploaded_${Date.now()}_${file.name}`;
    uploadedSamples.value.set(samplePath, audioBuffer);

    // Add to sound assets
    const newAsset: SoundAsset = {
      name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
      path: samplePath,
      category: 'Uploaded',
    };
    soundAssets.value.push(newAsset);

    // If there's a selected track, automatically assign the new sample to it
    if (selectedTrack.value) {
      selectedTrack.value.soundType = 'sample';
      selectedTrack.value.samplePath = samplePath;
      selectedTrack.value.audioBuffer = audioBuffer;
      console.log('Sample automatically assigned to selected track');
    }

    success(
      'Sample hochgeladen',
      `${newAsset.name} wurde erfolgreich hochgeladen und zugewiesen`,
      3000,
    );
    console.log('File uploaded successfully:', newAsset.name);
  } catch (err) {
    console.error('Error uploading file:', err);
    error(
      'Upload-Fehler',
      'Fehler beim Hochladen der Datei! Bitte überprüfe das Format und die Größe.',
    );
  }
};

// Helper functions for sound management
const getSoundCategories = () => {
  const categories = new Set(soundAssets.value.map((asset) => asset.category));
  return Array.from(categories);
};

const getSoundsByCategory = (category: string) => {
  return soundAssets.value.filter((asset) => asset.category === category);
};

const loadSampleForTrack = async () => {
  if (!selectedTrack.value || !selectedTrack.value.samplePath) return;

  try {
    const samplePath = selectedTrack.value.samplePath;
    let audioBuffer = uploadedSamples.value.get(samplePath);

    if (!audioBuffer) {
      // Load from server (for pre-loaded assets)
      const response = await fetch(samplePath);
      const arrayBuffer = await response.arrayBuffer();
      audioBuffer = await audioContext.value!.decodeAudioData(arrayBuffer);
      uploadedSamples.value.set(samplePath, audioBuffer);
    }

    selectedTrack.value.audioBuffer = audioBuffer;
    selectedTrack.value.soundType = 'sample';
    console.log(
      'Sample loaded for track:',
      selectedTrack.value.id,
      'Sample:',
      samplePath,
    );
  } catch (error) {
    console.error('Error loading sample:', error);
    alert('Fehler beim Laden des Samples!');
  }
};

// Sync functions
const calculateQuantizedFrequency = (track: Track) => {
  if (syncMode.value === 'off') return track.frequency;

  // Convert BPM to beats per second
  const bps = bpm.value / 60;

  // Define common rhythmic divisions (in beats)
  const divisions = {
    off: [1, 2, 4, 8, 16, 32], // Whole, half, quarter, eighth, sixteenth, thirty-second
    quantize: [1, 2, 4, 8, 16], // More musical divisions
    grid: [1, 2, 4, 8], // Simple grid
  };

  const availableDivisions = divisions[syncMode.value];

  // Calculate current frequency in beats per second
  const currentBPS = track.frequency;

  // Find the closest quantized division
  let closestDivision = availableDivisions[0];
  let minDifference = Math.abs(currentBPS - (availableDivisions[0] / 4) * bps);

  for (const division of availableDivisions) {
    const quantizedBPS = (division / 4) * bps; // 4 beats per measure
    const difference = Math.abs(currentBPS - quantizedBPS);

    if (difference < minDifference) {
      minDifference = difference;
      closestDivision = division;
    }
  }

  // Return quantized frequency
  return (closestDivision / 4) * bps;
};

const syncAllTracks = () => {
  if (tracks.value.length === 0) {
    error('Keine Spuren', 'Bitte erstelle zuerst mindestens eine Spur!');
    return;
  }

  tracks.value.forEach((track) => {
    track.frequency = calculateQuantizedFrequency(track);
  });

  isSynced.value = true;
  success(
    'Spuren synchronisiert',
    `Alle ${tracks.value.length} Spuren wurden auf ${bpm.value} BPM synchronisiert`,
    3000,
  );
  console.log('All tracks synced to BPM:', bpm.value);
};

// Auto-sync when BPM or sync mode changes
const applySyncChanges = () => {
  if (isSynced.value && tracks.value.length > 0) {
    tracks.value.forEach((track) => {
      track.frequency = calculateQuantizedFrequency(track);
    });
    console.log('Sync updated - BPM:', bpm.value, 'Mode:', syncMode.value);
  }
};

const resetSync = () => {
  isSynced.value = false;
  syncMode.value = 'off';
  info(
    'Sync zurückgesetzt',
    'Spuren verwenden wieder ihre ursprünglichen Frequenzen',
  );
  console.log('Sync reset');
};

// Methods
const addTrack = (event: MouseEvent) => {
  const rect = canvasRef.value?.getBoundingClientRect();
  if (!rect) return;

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Check if click is within the main circle
  const size = canvasSize.value || 600;
  const centerX = size / 2;
  const centerY = size / 2;
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

  if (distance > size / 2 - 50) return; // Too close to edge

  // If this is the first track, place it in the center
  if (tracks.value.length === 0) {
    const firstTrack: Track = {
      id: `track-${Date.now()}`,
      x: centerX,
      y: centerY,
      radius: Math.max(10, Math.min(30, 15 + Math.random() * 10)),
      color: colors.orange, // Default to orange for first track
      strokeColor: colors.gold,
      opacity: 0.7,
      frequency: Math.max(0.1, Math.min(3, 0.5 + Math.random() * 1.5)),
      volume: Math.max(0.1, Math.min(1, 0.7 + Math.random() * 0.3)),
      pitch: Math.max(0.1, Math.min(3, 0.8 + Math.random() * 0.4)),
      lastPlayTime: 0,
      soundType: 'synthesized',
      effects: {
        reverb: {
          enabled: false,
          amount: 0.3,
          roomSize: 0.5,
        },
        delay: {
          enabled: false,
          time: 0.3,
          feedback: 0.3,
          mix: 0.3,
        },
      },
    };

    tracks.value.push(firstTrack);
    selectedTrack.value = firstTrack;
    success(
      'Erste Spur erstellt',
      'Die erste Spur wurde in der Mitte des Kreises platziert',
      2000,
    );
    return;
  }

  const track: Track = {
    id: `track-${Date.now()}`,
    x: Math.max(0, Math.min(size, x)), // Ensure x is within bounds
    y: Math.max(0, Math.min(size, y)), // Ensure y is within bounds
    radius: Math.max(10, Math.min(30, 15 + Math.random() * 10)), // Random size between 15-25, bounded
    color: getTrackColor(x, y),
    strokeColor: getTrackStrokeColor(getTrackColor(x, y)),
    opacity: 0.7,
    frequency: Math.max(0.1, Math.min(3, 0.5 + Math.random() * 1.5)), // Random frequency, bounded
    volume: Math.max(0.1, Math.min(1, 0.7 + Math.random() * 0.3)), // Random volume, bounded
    pitch: Math.max(0.1, Math.min(3, 0.8 + Math.random() * 0.4)), // Random pitch, bounded
    lastPlayTime: 0,
    soundType: 'synthesized', // Default to synthesized
    effects: {
      reverb: {
        enabled: false,
        amount: 0.3,
        roomSize: 0.5,
      },
      delay: {
        enabled: false,
        time: 0.3,
        feedback: 0.3,
        mix: 0.3,
      },
    },
  };

  tracks.value.push(track);
  selectedTrack.value = track;
  success(
    'Spur hinzugefügt',
    `Neue Spur mit ${
      track.soundType === 'synthesized' ? 'synthetisiertem' : 'Sample-'
    }Sound erstellt`,
    2000,
  );
};

const removeTrack = (trackId: string) => {
  const index = tracks.value.findIndex((t) => t.id === trackId);
  if (index > -1) {
    tracks.value.splice(index, 1);
    if (selectedTrack.value?.id === trackId) {
      selectedTrack.value = null;
    }
    success('Spur entfernt', 'Die Spur wurde erfolgreich gelöscht', 2000);
  }
};

const selectTrack = (track: Track) => {
  selectedTrack.value = track;
};

// Touch handling for mobile
const touchStartTime = ref(0);
const touchStartTrack = ref<Track | null>(null);

const handleTouchStart = (track: Track, event: TouchEvent) => {
  touchStartTime.value = Date.now();
  touchStartTrack.value = track;
  // Don't prevent default to allow normal click behavior
};

const handleTouchEnd = (track: Track, event: TouchEvent) => {
  const touchDuration = Date.now() - touchStartTime.value;

  if (touchDuration > 500 && touchStartTrack.value?.id === track.id) {
    // Long press - remove track
    removeTrack(track.id);
    event.preventDefault();
  } else if (touchDuration < 200) {
    // Short tap - select track (let click event handle this)
    // Don't prevent default to allow normal click behavior
  }
};

const clearAllTracks = () => {
  tracks.value = [];
  selectedTrack.value = null;
  markers.value = [];
  success(
    'Alle Spuren gelöscht',
    'Alle Spuren und Marker wurden entfernt',
    2000,
  );
};

const togglePlayback = async () => {
  isPlaying.value = !isPlaying.value;

  if (isPlaying.value) {
    try {
      await initAudioContext();
      if (audioContext.value && audioContext.value.state === 'running') {
        startPlayback();
        success('Playback gestartet', 'Dein Mix wird jetzt abgespielt', 2000);
      } else {
        error(
          'Audio-Fehler',
          'AudioContext konnte nicht gestartet werden. Bitte versuche es erneut.',
        );
        isPlaying.value = false;
      }
    } catch (error) {
      console.error('Playback error:', error);
      error('Audio-Fehler', 'Fehler beim Starten der Wiedergabe');
      isPlaying.value = false;
    }
  } else {
    stopPlayback();
    info('Playback gestoppt', 'Der Mix wurde pausiert', 2000);
  }
};

const initAudioContext = async () => {
  if (!audioContext.value) {
    try {
      audioContext.value = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      console.log('AudioContext created successfully');
    } catch (error) {
      console.error('Failed to create AudioContext:', error);
      return;
    }
  }

  if (audioContext.value.state === 'suspended') {
    try {
      await audioContext.value.resume();
      console.log('AudioContext resumed successfully');
    } catch (error) {
      console.error('Failed to resume AudioContext:', error);
    }
  }
};

const startPlayback = () => {
  const animate = () => {
    if (!isPlaying.value) return;

    playheadAngle.value += 0.02; // Rotation speed

    // Check each track for playback
    tracks.value.forEach((track) => {
      const now = Date.now();
      const effectiveFrequency = isSynced.value
        ? calculateQuantizedFrequency(track)
        : track.frequency;
      const timeSinceLastPlay = now - track.lastPlayTime;
      const playInterval = 1000 / effectiveFrequency; // Convert frequency to milliseconds

      if (timeSinceLastPlay >= playInterval) {
        playTrackSound(track);
        track.lastPlayTime = now;
      }
    });

    animationId.value = requestAnimationFrame(animate);
  };

  animate();
};

const stopPlayback = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
    animationId.value = null;
  }
};

const playTrackSound = (track: Track) => {
  if (!audioContext.value || audioContext.value.state !== 'running') {
    return;
  }

  // Validate track properties
  if (
    !track ||
    typeof track.volume !== 'number' ||
    typeof track.radius !== 'number' ||
    typeof track.pitch !== 'number'
  ) {
    console.warn('Invalid track properties:', track);
    return;
  }

  // Fix any NaN values in track properties
  if (!isFinite(track.volume)) track.volume = 0.5;
  if (!isFinite(track.radius)) track.radius = 20;
  if (!isFinite(track.pitch)) track.pitch = 1;
  if (!isFinite(track.frequency)) track.frequency = 1;
  if (!isFinite(track.x)) track.x = 300;
  if (!isFinite(track.y)) track.y = 300;

  const ctx = audioContext.value;
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // Set up gain and filter with validation
  const volume = Math.max(0, Math.min(1, (track.volume || 0.5) * 0.3));
  const frequency = Math.max(
    20,
    Math.min(20000, 200 + (track.radius || 20) * 10),
  );

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(frequency, ctx.currentTime);
  filter.Q.setValueAtTime(1, ctx.currentTime);

  // Create effects
  let reverbNode = null;
  let delayNodes = null;

  if (track.effects.reverb.enabled) {
    reverbNode = createReverbEffect(
      ctx,
      track.effects.reverb.amount,
      track.effects.reverb.roomSize,
    );
  }

  if (track.effects.delay.enabled) {
    delayNodes = createDelayEffect(
      ctx,
      track.effects.delay.time,
      track.effects.delay.feedback,
      track.effects.delay.mix,
    );
  }

  // Create the audio source
  let source: AudioBufferSourceNode | OscillatorNode;

  if (track.soundType === 'sample' && track.audioBuffer) {
    // Play sample
    const bufferSource = ctx.createBufferSource();
    bufferSource.buffer = track.audioBuffer;
    bufferSource.playbackRate.setValueAtTime(track.pitch, ctx.currentTime);
    source = bufferSource;
  } else {
    // Play synthesized sound
    const oscillator = ctx.createOscillator();

    // Base frequency based on track position and pitch
    const size = canvasSize.value || 600;
    const centerX = size / 2;
    const centerY = size / 2;
    const distance = Math.sqrt(
      (track.x - centerX) ** 2 + (track.y - centerY) ** 2,
    );
    const maxDistance = size / 2 - 50;
    const ratio = Math.max(0, Math.min(1, distance / maxDistance));

    const baseFreq = 80 + ratio * 200; // 80-280 Hz based on position
    const pitch = Math.max(0.1, Math.min(10, track.pitch || 1)); // Ensure pitch is valid
    const frequency = Math.max(20, Math.min(20000, baseFreq * pitch));

    // Additional validation
    if (!isFinite(frequency) || frequency <= 0) {
      console.warn(
        'Invalid frequency calculated:',
        frequency,
        'for track:',
        track.id,
      );
      return;
    }

    // Wave type based on track color
    let waveType: OscillatorType = 'sine';
    if (track.color === colors.orange) waveType = 'sawtooth';
    else if (track.color === colors.gold) waveType = 'square';
    else if (track.color === colors.purple) waveType = 'triangle';

    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Envelope for synthesized sounds
    const duration = Math.max(0.01, 0.1 + (track.radius || 20) * 0.01);
    const envelopeVolume = Math.max(
      0,
      Math.min(1, (track.volume || 0.5) * 0.3),
    );

    // Validate envelope values
    if (!isFinite(duration) || !isFinite(envelopeVolume)) {
      console.warn('Invalid envelope values:', {
        duration,
        envelopeVolume,
        track: track.id,
      });
      return;
    }

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      envelopeVolume,
      ctx.currentTime + 0.01,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + duration,
    );

    source = oscillator;
  }

  // Connect the audio chain with effects
  source.connect(filter);

  if (delayNodes && track.effects.delay.enabled) {
    // Split signal for delay
    const splitter = ctx.createChannelSplitter(2);
    filter.connect(splitter);

    // Dry signal
    splitter.connect(delayNodes.dryGain);
    delayNodes.dryGain.connect(gainNode);

    // Wet signal through delay
    splitter.connect(delayNodes.delay);
    delayNodes.delay.connect(delayNodes.wetGain);
    delayNodes.wetGain.connect(gainNode);
  } else {
    filter.connect(gainNode);
  }

  if (reverbNode && track.effects.reverb.enabled) {
    gainNode.connect(reverbNode);
    reverbNode.connect(ctx.destination);
  } else {
    gainNode.connect(ctx.destination);
  }

  // Start playback
  if (source instanceof OscillatorNode) {
    source.start(ctx.currentTime);
    const duration = 0.1 + track.radius * 0.01;
    source.stop(ctx.currentTime + duration);
  } else {
    source.start(ctx.currentTime);
  }
};

const downloadMix = async () => {
  if (!audioContext.value) {
    initAudioContext();
  }

  if (isRecording.value) return; // Prevent multiple recordings

  try {
    isRecording.value = true;

    // Check if there are any tracks
    if (tracks.value.length === 0) {
      error('Keine Spuren', 'Bitte erstelle zuerst mindestens eine Spur!');
      return;
    }

    // Start recording
    const recordingLength = 30; // 30 seconds
    const sampleRate = 44100;
    const bufferLength = sampleRate * recordingLength;

    // Create offline audio context for recording
    const offlineContext = new OfflineAudioContext(2, bufferLength, sampleRate);

    // Create a gain node to capture all audio
    const recordingGain = offlineContext.createGain();
    recordingGain.connect(offlineContext.destination);

    // Record the current mix for 30 seconds
    const startTime = offlineContext.currentTime;

    // Reset track timing for recording
    tracks.value.forEach((track) => {
      track.lastPlayTime = 0;
    });

    // Create a simple but effective recording approach
    // Schedule all sounds for the entire 30 seconds
    tracks.value.forEach((track) => {
      // Calculate how many times this track should play in 30 seconds
      const effectiveFrequency = isSynced.value
        ? calculateQuantizedFrequency(track)
        : track.frequency;
      const playInterval = 1000 / effectiveFrequency; // milliseconds between plays
      const totalPlays = Math.floor(30000 / playInterval); // 30 seconds = 30000ms

      for (let play = 0; play < totalPlays; play++) {
        const playTime = startTime + (play * playInterval) / 1000;

        // Create the same sound as in playTrackSound but for offline context
        const gainNode = offlineContext.createGain();
        const filter = offlineContext.createBiquadFilter();

        // Filter based on track size
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200 + track.radius * 10, playTime);
        filter.Q.setValueAtTime(1, playTime);

        // Create the audio source (sample or synthesized)
        let source: AudioBufferSourceNode | OscillatorNode;

        if (track.soundType === 'sample' && track.audioBuffer) {
          // Play sample
          const bufferSource = offlineContext.createBufferSource();
          bufferSource.buffer = track.audioBuffer;
          bufferSource.playbackRate.setValueAtTime(track.pitch, playTime);
          source = bufferSource;
        } else {
          // Play synthesized sound
          const oscillator = offlineContext.createOscillator();

          // Base frequency based on track position and pitch
          const size = canvasSize.value || 600;
          const centerX = size / 2;
          const centerY = size / 2;
          const distance = Math.sqrt(
            (track.x - centerX) ** 2 + (track.y - centerY) ** 2,
          );
          const maxDistance = size / 2 - 50;
          const ratio = Math.max(0, Math.min(1, distance / maxDistance));

          const baseFreq = 80 + ratio * 200;
          const pitch = Math.max(0.1, Math.min(10, track.pitch || 1)); // Ensure pitch is valid
          const frequency = Math.max(20, Math.min(20000, baseFreq * pitch));

          // Wave type based on track color
          let waveType: OscillatorType = 'sine';
          if (track.color === colors.orange) waveType = 'sawtooth';
          else if (track.color === colors.gold) waveType = 'square';
          else if (track.color === colors.purple) waveType = 'triangle';

          oscillator.type = waveType;
          oscillator.frequency.setValueAtTime(frequency, playTime);
          source = oscillator;
        }

        // Create effects for offline context
        let reverbNode = null;
        let delayNodes = null;

        if (track.effects.reverb.enabled) {
          reverbNode = createReverbEffect(
            offlineContext,
            track.effects.reverb.amount,
            track.effects.reverb.roomSize,
          );
        }

        if (track.effects.delay.enabled) {
          delayNodes = createDelayEffect(
            offlineContext,
            track.effects.delay.time,
            track.effects.delay.feedback,
            track.effects.delay.mix,
          );
        }

        // Envelope
        const duration =
          track.soundType === 'sample' && track.audioBuffer
            ? track.audioBuffer.duration * track.pitch
            : 0.1 + track.radius * 0.01;

        gainNode.gain.setValueAtTime(0, playTime);
        gainNode.gain.linearRampToValueAtTime(
          track.volume * 0.3,
          playTime + 0.01,
        );
        gainNode.gain.exponentialRampToValueAtTime(0.001, playTime + duration);

        // Connect the audio chain with effects
        source.connect(filter);

        if (delayNodes && track.effects.delay.enabled) {
          // Split signal for delay
          const splitter = offlineContext.createChannelSplitter(2);
          filter.connect(splitter);

          // Dry signal
          splitter.connect(delayNodes.dryGain);
          delayNodes.dryGain.connect(gainNode);

          // Wet signal through delay
          splitter.connect(delayNodes.delay);
          delayNodes.delay.connect(delayNodes.wetGain);
          delayNodes.wetGain.connect(gainNode);
        } else {
          filter.connect(gainNode);
        }

        if (reverbNode && track.effects.reverb.enabled) {
          gainNode.connect(reverbNode);
          reverbNode.connect(recordingGain);
        } else {
          gainNode.connect(recordingGain);
        }

        // Schedule playback
        source.start(playTime);
        if (source instanceof OscillatorNode) {
          source.stop(playTime + duration);
        }
      }
    });

    // Render the audio
    const audioBuffer = await offlineContext.startRendering();

    // Convert to selected format and download
    let blob: Blob;
    let filename: string;

    if (downloadFormat.value === 'mp3') {
      blob = audioBufferToMp3(audioBuffer);
      filename = `solar-transients-remix-${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, '-')}.mp3`;
    } else {
      blob = audioBufferToWav(audioBuffer);
      filename = `solar-transients-remix-${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, '-')}.wav`;
    }

    const url = URL.createObjectURL(blob);

    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    success(
      'Download abgeschlossen',
      `${filename} wurde erfolgreich heruntergeladen`,
      3000,
    );
    console.log('Download completed!');
  } catch (err) {
    console.error('Error recording audio:', err);
    error(
      'Download-Fehler',
      'Fehler beim Aufnehmen der Audio. Bitte versuche es erneut.',
    );
  } finally {
    isRecording.value = false;
  }
};

// Helper function to convert AudioBuffer to MP3 (simplified version)
const audioBufferToMp3 = (buffer: AudioBuffer): Blob => {
  // For now, we'll create a WAV file but with MP3 extension
  // This is a simplified approach - in production you'd want proper MP3 encoding
  console.warn(
    'MP3 encoding not fully implemented - downloading as WAV with MP3 extension',
  );

  // Convert to WAV format but return as MP3 blob
  const wavBlob = audioBufferToWav(buffer);
  return new Blob([wavBlob], {type: 'audio/mp3'});
};

// Helper function to convert AudioBuffer to WAV
const audioBufferToWav = (buffer: AudioBuffer): Blob => {
  const length = buffer.length;
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
  const view = new DataView(arrayBuffer);

  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * numberOfChannels * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * 2, true);
  view.setUint16(32, numberOfChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * numberOfChannels * 2, true);

  // Convert audio data
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(
        -1,
        Math.min(1, buffer.getChannelData(channel)[i]),
      );
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true,
      );
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], {type: 'audio/wav'});
};

const handleMouseMove = (event: MouseEvent) => {
  // Future: Add visual feedback on hover
};

const handleMouseLeave = () => {
  // Future: Add visual feedback on leave
};

// Watch for BPM and sync mode changes
watch(
  [bpm, syncMode],
  () => {
    applySyncChanges();
  },
  {deep: true},
);

onMounted(async () => {
  // Initialize audio context and load sound assets
  initAudioContext();
  await loadSoundAssets();

  // Initialize with a few example tracks
  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;

  // Add some example tracks
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const radius = 100 + i * 30;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    const track: Track = {
      id: `example-${i}`,
      x,
      y,
      radius: 15 + i * 5,
      color: getTrackColor(x, y),
      strokeColor: getTrackStrokeColor(getTrackColor(x, y)),
      opacity: 0.7,
      frequency: 0.5 + i * 0.5,
      volume: 0.6,
      pitch: 1,
      lastPlayTime: 0,
      soundType: 'synthesized',
      effects: {
        reverb: {
          enabled: false,
          amount: 0.3,
          roomSize: 0.5,
        },
        delay: {
          enabled: false,
          time: 0.3,
          feedback: 0.3,
          mix: 0.3,
        },
      },
    };

    tracks.value.push(track);
  }
});

onUnmounted(() => {
  stopPlayback();
  if (audioContext.value) {
    audioContext.value.close();
  }
});
</script>

<style scoped>
/* Custom styles for the remix interface */
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

input[type='range']::-webkit-slider-track {
  background: #2d2d2d;
  height: 4px;
  border-radius: 2px;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #ff6b35;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  cursor: pointer;
}

input[type='range']::-moz-range-track {
  background: #2d2d2d;
  height: 4px;
  border-radius: 2px;
  border: none;
}

input[type='range']::-moz-range-thumb {
  background: #ff6b35;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
</style>
