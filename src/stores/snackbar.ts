import {ref} from 'vue';

export interface SnackbarMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}

const messages = ref<SnackbarMessage[]>([]);

export function useSnackbar() {
  function show(message: Omit<SnackbarMessage, 'id'>) {
    const id = Math.random().toString(36).substr(2, 9);
    const newMessage: SnackbarMessage = {
      id,
      duration: 5000,
      ...message,
    };

    messages.value.push(newMessage);

    // Auto-remove after duration
    if (newMessage.duration && newMessage.duration > 0) {
      setTimeout(() => {
        remove(id);
      }, newMessage.duration);
    }

    return id;
  }

  function remove(id: string) {
    const index = messages.value.findIndex((msg) => msg.id === id);
    if (index > -1) {
      messages.value.splice(index, 1);
    }
  }

  function success(title: string, message: string, duration?: number) {
    return show({type: 'success', title, message, duration});
  }

  function error(title: string, message: string, duration?: number) {
    return show({type: 'error', title, message, duration});
  }

  function info(title: string, message: string, duration?: number) {
    return show({type: 'info', title, message, duration});
  }

  function clear() {
    messages.value = [];
  }

  return {
    messages,
    show,
    remove,
    success,
    error,
    info,
    clear,
  };
}
