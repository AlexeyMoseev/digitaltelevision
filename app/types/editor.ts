interface ParagraphBlockData {
  text: string
}

interface HeaderBlockData {
  text: string
  level: number
}

interface QuoteBlockData {
  text: string
  caption: string
  alignment?: string
}

type BlockData = ParagraphBlockData | HeaderBlockData | QuoteBlockData | Record<string, unknown>

interface EditorJsBlock<T = BlockData> {
  id?: string
  type: string
  data: T
}

export interface EditorJsData {
  time: number
  blocks: EditorJsBlock[]
  version: string
}
