<template>
  <div class="materials">
    <h1 class="title">Материалы</h1>
    <div class="list">
      <NuxtLink
        v-for="item in store.list"
        :key="String(item.id)"
        :to="`/${item.id}`"
        class="list-item"
      >
        <MaterialCard :material="item" variant="list" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useMaterialsStore()
if (store.list.length === 0) store.fetchList()
</script>

<style scoped>
.materials {
  max-width: 1224px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}
.title {
  margin-bottom: 48px;
  font-family: 'SourceSans3', Roboto, Arial, sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 120%;
  letter-spacing: 0%;
}
.list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
}
.list-item {
  text-decoration: none;
  cursor: pointer;
  color: #14142a;
}

@media (max-width: 480px) {
  .title {
    margin-bottom: 32px;
    font-size: 24px;
  }
  .list {
    gap: 16px;
  }
}
</style>
