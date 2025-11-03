<template>
  <div class="editor-wrap">
    <div id="editorjs" />
  </div>
</template>

<script setup lang="ts">
import type EditorJS from '@editorjs/editorjs'
import type { OutputData, ToolConstructable } from '@editorjs/editorjs'

const props = defineProps<{
  content: OutputData | null
}>()

const emit = defineEmits(['update:content'])

const editorRef = ref<EditorJS | null>(null)

onMounted(async () => {
  const [{ default: EditorJS }, { default: Header }, { default: Quote }] = await Promise.all([
    import('@editorjs/editorjs'),
    import('@editorjs/header'),
    import('@editorjs/quote')
  ])

  const editor = new EditorJS({
    holder: 'editorjs',
    autofocus: true,
    placeholder: 'Введите текст…',
    tools: {
      paragraph: { inlineToolbar: true },
      header: {
        class: Header as unknown as ToolConstructable,
        inlineToolbar: true,
        config: { levels: [1, 2, 3], defaultLevel: 2 }
      },
      quote: {
        class: Quote as unknown as ToolConstructable,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Цитата',
          captionPlaceholder: 'Автор'
        }
      }
    },
    data: {
      time: Date.now(),
      blocks: [{ type: 'paragraph', data: { text: '' } }]
    },
    onChange: async () => {
      if (!editorRef.value) return
      const data = await editorRef.value.save()
      emit('update:content', data)
    }
  })

  await editor.isReady
  editorRef.value = editor
})

// Watch for external content changes
watch(
  () => props.content,
  async (val) => {
    const editor = editorRef.value
    if (!editor) return
    if (!val) {
      await editor.blocks.render({
        time: Date.now(),
        blocks: [{ type: 'paragraph', data: { text: '' } }]
      })
      return
    }
    await editor.blocks.render(val)
  }
)

onBeforeUnmount(() => {
  if (editorRef.value) {
    editorRef.value.destroy()
    editorRef.value = null
  }
})
</script>

<style scoped>
:deep(.ce-toolbar__actions) {
  padding-right: 24px;
}
:deep(.codex-editor__redactor) {
  padding-bottom: 0 !important;
}
:deep(.ce-block__content) {
  font-family: 'FuturaPT', Roboto, Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  color: #14142a;
}
:deep(.codex-editor [data-placeholder-active]:empty:before) {
  color: #bec2da;
}
@media (max-width: 1044px) {
  :deep(.ce-toolbar__actions) {
    left: 100%;
  }
  :deep(.ce-block__content) {
    margin: 0;
  }
}
@media (max-width: 650px) {
  :deep(.ce-toolbar__actions) {
    left: 0;
  }
  :deep(.ce-block__content) {
    margin: 0 auto;
  }
}
@media (max-width: 480px) {
  :deep(.ce-block__content) {
    font-size: 16px;
  }
}
</style>
