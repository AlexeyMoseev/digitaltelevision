<template>
  <div class="material-detail">
    <BackLink />
    <div v-if="item" class="content">
      <MaterialCard :material="item" variant="detail" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const store = useMaterialsStore()

if (store.list.length === 0) await store.fetchList()

const item = computed(() => {
  const id = route.params.id as string | undefined
  return id ? store.getById(id) : null
})
</script>

<style scoped>
.material-detail {
  max-width: var(--max-width-detail);
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}
.content {
  margin-top: var(--spacing-2xl);
}

@media (max-width: 480px) {
  .content {
    margin-top: var(--spacing-xl);
  }
}
</style>
