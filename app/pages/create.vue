<template>
  <div class="material-create">
    <BackLink />
    <h1 class="title">Создание материала</h1>
    <MaterialCreateCard />
  </div>
</template>

<style scoped>
.material-create {
  max-width: 1014px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}
.title {
  margin-top: 32px;
  margin-bottom: 48px;
  font-family: 'SourceSans3', Roboto, Arial, sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 120%;
  letter-spacing: 0%;
}

@media (max-width: 480px) {
  .title {
    margin-bottom: 32px;
    font-size: 24px;
  }
}
</style>
