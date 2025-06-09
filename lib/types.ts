export interface Flashcard {
  id: string
  front: string
  back: string
  tags: string[]
  sourceUrl: string
  sourceText: string
  collectionId: string
  createdAt: Date
  syncStatus: "pending" | "synced" | "failed"
  syncError?: string
}

export interface Collection {
  id: string
  name: string
  isInbox: boolean
  createdAt: Date
  cardCount: number
}

export interface Prompt {
  id: string
  name: string
  content: string
  icon: string
  enabled: boolean
  order: number
}

export interface AIConfig {
  id: string
  name: string
  provider: "openai" | "gemini" | "groq" | "deepseek"
  apiKey: string
  baseUrl?: string
  model: string
  isActive: boolean
}

export interface ExportConfig {
  anki: {
    url: string
    apiKey?: string
    deckName: string
    noteType: string
    fieldMapping: Record<string, string>
  }
  remnote: {
    apiKey: string
    userId: string
    knowledgeBaseUrl?: string
  }
}

export interface Settings {
  enableFloatingToolbar: boolean
  shortcuts: Record<string, string>
  aiConfigs: AIConfig[]
  prompts: Prompt[]
  exportConfig: ExportConfig
}

export const defaultPrompts: Prompt[] = [
  {
    id: "generate-flashcards",
    name: "Generate Flashcards",
    content:
      "Create flashcards from the following text: {{selected_text}}. Generate multiple cards covering key concepts, definitions, and important facts. Format each card with a clear question on the front and a comprehensive answer on the back.",
    icon: "brain",
    enabled: true,
    order: 0,
  },
  {
    id: "explain-concept",
    name: "Explain Concept",
    content:
      "Explain the following concept in simple terms: {{selected_text}}. Break it down into easy-to-understand components and provide examples if applicable.",
    icon: "lightbulb",
    enabled: true,
    order: 1,
  },
  {
    id: "translate",
    name: "Translate",
    content: "Translate the following text to Spanish: {{selected_text}}",
    icon: "languages",
    enabled: true,
    order: 2,
  },
]
