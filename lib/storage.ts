import { type Flashcard, type Collection, type Settings, defaultPrompts } from "./types"

class StorageManager {
  private async get<T>(key: string, defaultValue: T): Promise<T> {
    if (typeof chrome !== "undefined" && chrome.storage) {
      const result = await chrome.storage.local.get(key)
      return result[key] || defaultValue
    }
    // Fallback for development
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  }

  private async set(key: string, value: any): Promise<void> {
    if (typeof chrome !== "undefined" && chrome.storage) {
      await chrome.storage.local.set({ [key]: value })
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  async getFlashcards(): Promise<Flashcard[]> {
    return this.get("flashcards", [])
  }

  async saveFlashcard(flashcard: Flashcard): Promise<void> {
    const flashcards = await this.getFlashcards()
    flashcards.push(flashcard)
    await this.set("flashcards", flashcards)
  }

  async updateFlashcard(id: string, updates: Partial<Flashcard>): Promise<void> {
    const flashcards = await this.getFlashcards()
    const index = flashcards.findIndex((card) => card.id === id)
    if (index !== -1) {
      flashcards[index] = { ...flashcards[index], ...updates }
      await this.set("flashcards", flashcards)
    }
  }

  async deleteFlashcard(id: string): Promise<void> {
    const flashcards = await this.getFlashcards()
    const filtered = flashcards.filter((card) => card.id !== id)
    await this.set("flashcards", filtered)
  }

  async getCollections(): Promise<Collection[]> {
    const collections = await this.get("collections", [])
    if (collections.length === 0) {
      const inbox: Collection = {
        id: "inbox",
        name: "Inbox",
        isInbox: true,
        createdAt: new Date(),
        cardCount: 0,
      }
      await this.set("collections", [inbox])
      return [inbox]
    }
    return collections
  }

  async saveCollection(collection: Collection): Promise<void> {
    const collections = await this.getCollections()
    collections.push(collection)
    await this.set("collections", collections)
  }

  async getSettings(): Promise<Settings> {
    return this.get("settings", {
      enableFloatingToolbar: true,
      shortcuts: {},
      aiConfigs: [],
      prompts: defaultPrompts,
      exportConfig: {
        anki: {
          url: "http://localhost:8765",
          deckName: "StudySmart",
          noteType: "Basic",
          fieldMapping: {
            front: "Front",
            back: "Back",
            sourceUrl: "Source",
          },
        },
        remnote: {
          apiKey: "",
          userId: "",
        },
      },
    })
  }

  async saveSettings(settings: Settings): Promise<void> {
    await this.set("settings", settings)
  }
}

export const storage = new StorageManager()
