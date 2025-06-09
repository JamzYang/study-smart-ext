import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Prompt = {
  id: string
  name: string
  content: string
  icon: string
  enabled: boolean
  order: number
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

export const generateId = () => Math.random().toString(36).substr(2, 9)

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
