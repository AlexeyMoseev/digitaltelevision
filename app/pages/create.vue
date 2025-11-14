<template>
  <div class="material-create">
    <BackLink />
    <h1 class="title">Создание материала</h1>
    <MaterialCreateCard />
  </div>
</template>

<style scoped>
.material-create {
  max-width: var(--max-width-detail);
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}
.title {
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-normal);
  letter-spacing: 0%;
}

@media (max-width: 480px) {
  .title {
    margin-bottom: var(--spacing-xl);
    font-size: var(--font-size-2xl);
  }
}
</style>
