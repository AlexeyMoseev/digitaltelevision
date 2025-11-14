<template>
  <div class="materials">
    <h1 class="title">Материалы</h1>
    <div class="list">
      <NuxtLink
        v-for="item in store.list"
        :key="String(item.id)"
        :to="`/${item.id}`"
        class="list-item"
        :aria-label="`Открыть материал: ${item.title}`"
      >
        <MaterialCard :material="item" variant="list" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useMaterialsStore()

await useAsyncData(() => store.fetchList())
</script>

<style scoped>
.materials {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}
.title {
  margin-bottom: var(--spacing-2xl);
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-normal);
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
  color: var(--color-text-primary);
}

@media (max-width: 480px) {
  .title {
    margin-bottom: var(--spacing-xl);
    font-size: var(--font-size-2xl);
  }
  .list {
    gap: var(--spacing-md);
  }
}
</style>
