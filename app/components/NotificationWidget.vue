<template>
  <div v-if="notification?.visible" :class="['notification', notification.type]">
    {{ notification.message }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMaterialsStore } from '~/stores/materials'

const store = useMaterialsStore()
const notification = computed(() => store.notification)
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-width: 250px;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'FuturaPT', Roboto, Arial, sans-serif;
  font-size: 18px;
  color: #fff;
  z-index: 9999;
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.notification.success {
  background-color: #4caf50;
}
.notification.error {
  background-color: #f44336;
}
@media (max-width: 480px) {
  .notification {
    min-width: 150px;
    font-size: 14px;
  }
}
</style>
