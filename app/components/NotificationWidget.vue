<template>
  <div
    v-if="notification?.visible"
    class="notification"
    :class="notification.type"
    role="alert"
    :aria-live="notification.type === 'error' ? 'assertive' : 'polite'"
  >
    {{ notification.message }}
  </div>
</template>

<script setup lang="ts">
const store = useMaterialsStore()
const notification = computed(() => store.notification)
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-width: 250px;
  padding: var(--spacing-sm) 20px;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-notification);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-white);
  z-index: 9999;
  transition:
    opacity var(--transition-normal),
    transform var(--transition-normal);
}
.notification.success {
  background-color: var(--color-success);
}
.notification.error {
  background-color: var(--color-error);
}
@media (max-width: 480px) {
  .notification {
    min-width: 150px;
    font-size: var(--font-size-xs);
  }
}
</style>
