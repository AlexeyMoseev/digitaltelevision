import { defineStore } from 'pinia'
import type { Material, NewMaterial, MaterialsState } from '~/types/material'
import editorJsHTML from 'editorjs-html'

const edjsParser = editorJsHTML()

const NOTIFICATIONS = {
  ERROR_LOADING: 'Ошибка при загрузке данных',
  ERROR_SAVING: 'Ошибка при сохранении',
  SUCCESS_SAVING: 'Страница сохранена',
  ERROR_FILL_FIELDS: 'Заполните все поля'
} as const

const initialCurrentMaterial: NewMaterial = {
  title: '',
  short_description: '',
  datetime: '',
  description_html: '',
  description_json: null
}

export const useMaterialsStore = defineStore('materials', {
  state: (): MaterialsState => ({
    list: [],
    loading: false,
    notification: null,
    currentMaterial: { ...initialCurrentMaterial }
  }),

  getters: {
    getById:
      (state) =>
      (id: string | number): Material | null => {
        return state.list.find((m) => String(m.id) === String(id)) ?? null
      }
  },

  actions: {
    async fetchList(): Promise<Material[]> {
      if (this.list.length > 0) return this.list

      this.loading = true

      try {
        const response = await $fetch<Material[]>('/proxy/materials')

        if (!Array.isArray(response)) {
          throw new TypeError('Invalid response format')
        }

        this.list = response.toSorted(
          (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
        )

        return this.list
      } catch {
        this.setNotification(NOTIFICATIONS.ERROR_LOADING, 'error')
        return []
      } finally {
        this.loading = false
      }
    },

    setCurrentMaterial(data: Partial<Material>) {
      this.currentMaterial = { ...this.currentMaterial, ...data }
    },

    resetCurrentMaterial() {
      this.currentMaterial = { ...initialCurrentMaterial }
    },

    clearList() {
      this.list = []
    },

    setNotification(message: string, type: 'success' | 'error') {
      this.notification = { message, type, visible: true }
      setTimeout(() => {
        this.notification = null
      }, 3000)
    },

    async saveCurrentMaterial(): Promise<boolean> {
      const material = this.currentMaterial

      if (
        !material.title?.trim() ||
        !material.short_description?.trim() ||
        !material.description_json?.blocks?.length
      ) {
        this.setNotification(NOTIFICATIONS.ERROR_FILL_FIELDS, 'error')
        return false
      }

      this.loading = true

      try {
        const datetime = new Date().toISOString()
        const htmlBlocks = edjsParser.parse(material.description_json)
        const description_html = Array.isArray(htmlBlocks)
          ? htmlBlocks.join('\n')
          : String(htmlBlocks)

        await $fetch<{ success: boolean; id?: number; errors?: string[] }>(
          '/proxy/materials/save',
          {
            method: 'POST',
            body: {
              title: material.title,
              short_description: material.short_description,
              datetime,
              description_json: material.description_json,
              description_html
            }
          }
        )

        this.setNotification(NOTIFICATIONS.SUCCESS_SAVING, 'success')
        this.resetCurrentMaterial()
        return true
      } catch {
        this.setNotification(NOTIFICATIONS.ERROR_SAVING, 'error')
        return false
      } finally {
        this.loading = false
      }
    }
  }
})
