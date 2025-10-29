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

if (store.list.length === 0) store.fetchList()

const item = computed(() => {
  const id = route.params.id as string | undefined
  return id ? store.getById(id) : null
})
</script>

<style scoped>
.material-detail {
  max-width: 1014px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}
.content {
  margin-top: 48px;
}

@media (max-width: 480px) {
  .content {
    margin-top: 32px;
  }
}
</style>
