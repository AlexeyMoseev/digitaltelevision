<template>
  <div class="card-wrapper">
    <div class="card">
      <input
        v-model="store.currentMaterial.title"
        class="title-field"
        maxlength="80"
        placeholder="Введите заголовок"
      />
      <textarea
        v-model="store.currentMaterial.short_description"
        class="short-description-field"
        maxlength="255"
        placeholder="Введите краткое описание..."
      />
      <EditorJs v-model:content="editorContent" class="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useMaterialsStore()

const editorContent = ref(store.currentMaterial.description_json)

watch(
  () => store.currentMaterial.title,
  (val) => {
    store.setCurrentMaterial({ title: val })
  }
)

watch(
  () => store.currentMaterial.short_description,
  (val) => {
    store.setCurrentMaterial({ short_description: val })
  }
)

watch(editorContent, (val) => {
  store.setCurrentMaterial({ description_json: val })
})
</script>

<style scoped>
.card-wrapper {
  padding: 20px 0px;
  border-radius: 32px;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow:
    -2px 5px 13px 0px #0000000a,
    -9px 21px 23px 0px #0000000a,
    -21px 48px 31px 0px #00000005,
    -37px 85px 37px 0px #00000003,
    -57px 133px 40px 0px #00000000;
}
.card {
  overflow-y: auto;
  width: 100%;
  height: 598px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.title-field,
.short-description-field {
  margin-left: 106px;
  border: none;
  padding: 0;
  line-height: 120%;
  color: #14142a;
}
.title-field {
  margin-bottom: 24px;
  font-family: 'SourceSans3', Roboto, Arial, sans-serif;
  font-weight: 600;
  font-size: 36px;
}
.short-description-field {
  margin-bottom: 40px;
  font-family: 'FuturaPT', Roboto, Arial, sans-serif;
  font-weight: 400;
  font-size: 22px;
  resize: vertical;
  min-height: 26px;
}
.title-field::placeholder,
.short-description-field::placeholder {
  color: #bec2da;
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
  .card-wrapper {
    padding: 10px 0px;
    border-radius: 16px;
  }
  .card {
    overflow-y: auto;
    height: 540px;
    padding: 10px 16px;
  }
  .title-field {
    margin-bottom: 12px;
    font-size: 24px;
  }
  .short-description-field {
    margin-bottom: 24px;
    font-size: 18px;
    min-height: 22px;
  }
  .editor {
    min-height: 22px;
  }
}
</style>
