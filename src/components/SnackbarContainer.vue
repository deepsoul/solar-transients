<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <Snackbar
      v-for="message in messages"
      :key="message.id"
      :show="true"
      :type="message.type"
      :title="message.title"
      :message="message.message"
      :duration="message.duration || 5000"
      @close="remove(message.id)"
    />
  </div>
</template>

<script setup lang="ts">
import {useSnackbar} from '@/stores/snackbar';
import Snackbar from './Snackbar.vue';

const {messages, remove} = useSnackbar();
</script>
