<template>
  <div class="card">
    <input
      v-model="store.currentMaterial.title"
      class="title-field"
      maxlength="80"
      placeholder="Введите заголовок"
      aria-label="Заголовок материала"
    />
    <textarea
      v-model="store.currentMaterial.short_description"
      class="short-description-field"
      maxlength="255"
      placeholder="Введите краткое описание..."
      aria-label="Краткое описание материала"
    />
    <EditorJs v-model:content="store.currentMaterial.description_json" class="editor" />
  </div>
</template>

<script setup lang="ts">
const store = useMaterialsStore()

onMounted(() => {
  store.resetCurrentMaterial()
})
</script>

<style scoped>
.card {
  width: 100%;
  padding: var(--spacing-2xl) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: var(--radius-2xl);
  background: var(--color-white);
  box-shadow: var(--shadow-card);
}
.title-field,
.short-description-field {
  margin-left: 106px;
  border: none;
  padding: 0;
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}
.title-field {
  margin-bottom: var(--spacing-lg);
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-3xl);
}
.short-description-field {
  margin-bottom: 40px;
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-xl);
  resize: vertical;
  min-height: 26px;
}
.title-field::placeholder,
.short-description-field::placeholder {
  color: var(--color-text-tertiary);
}
.title-field:focus,
.short-description-field:focus {
  outline: none;
}
.editor {
  min-height: 32px;
  margin-right: 104px;
}
@media (max-width: 1044px) {
  .title-field,
  .short-description-field {
    margin-left: 0px;
  }
  .editor {
    width: 80vw;
    margin-right: 0px;
  }
}
@media (max-width: 480px) {
  .card {
    padding: 20px var(--spacing-md);
    border-radius: var(--radius-lg);
  }
  .title-field {
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-2xl);
  }
  .short-description-field {
    margin-bottom: var(--spacing-lg);
    font-size: var(--font-size-md);
    min-height: 22px;
  }
  .editor {
    min-height: 22px;
  }
}
</style>
