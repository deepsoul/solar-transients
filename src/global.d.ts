// Global type declarations for Vue 3 Composition API
declare global {
  const defineProps: typeof import('vue')['defineProps'];
  const defineEmits: typeof import('vue')['defineEmits'];
  const defineExpose: typeof import('vue')['defineExpose'];
  const withDefaults: typeof import('vue')['withDefaults'];
  const ref: typeof import('vue')['ref'];
  const reactive: typeof import('vue')['reactive'];
  const computed: typeof import('vue')['computed'];
  const watch: typeof import('vue')['watch'];
  const watchEffect: typeof import('vue')['watchEffect'];
  const onMounted: typeof import('vue')['onMounted'];
  const onUnmounted: typeof import('vue')['onUnmounted'];
  const onUpdated: typeof import('vue')['onUpdated'];
  const onBeforeMount: typeof import('vue')['onBeforeMount'];
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount'];
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate'];
  const nextTick: typeof import('vue')['nextTick'];
  const toRefs: typeof import('vue')['toRefs'];
  const toRef: typeof import('vue')['toRef'];
  const unref: typeof import('vue')['unref'];
  const isRef: typeof import('vue')['isRef'];
  const readonly: typeof import('vue')['readonly'];
  const shallowRef: typeof import('vue')['shallowRef'];
  const triggerRef: typeof import('vue')['triggerRef'];
  const customRef: typeof import('vue')['customRef'];
  const shallowReactive: typeof import('vue')['shallowReactive'];
  const shallowReadonly: typeof import('vue')['shallowReadonly'];
  const toRaw: typeof import('vue')['toRaw'];
  const markRaw: typeof import('vue')['markRaw'];
  const effectScope: typeof import('vue')['effectScope'];
  const getCurrentScope: typeof import('vue')['getCurrentScope'];
  const onScopeDispose: typeof import('vue')['onScopeDispose'];
}

export {};
