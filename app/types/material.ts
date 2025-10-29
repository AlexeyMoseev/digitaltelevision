import type { EditorJsData } from '~/types/editor'

export interface Notification {
  message: string
  type: 'success' | 'error'
  visible: boolean
}

export interface NewMaterial {
  title: string
  short_description: string
  datetime: string
  description_html: string
  description_json: EditorJsData | null
}

export interface Material extends NewMaterial {
  id: number
}

export interface MaterialsState {
  list: Material[]
  loading: boolean
  currentMaterial: NewMaterial
  notification: Notification | null
}
