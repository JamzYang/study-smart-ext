"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Brain, Lightbulb, Languages, MoreHorizontal } from "lucide-react"
import type { Prompt } from "@/lib/types"
import { storage } from "@/lib/storage"

interface FloatingToolbarProps {
  selectedText: string
  position: { x: number; y: number }
  onPromptSelect: (prompt: Prompt) => void
  onClose: () => void
}

const iconMap = {
  brain: Brain,
  lightbulb: Lightbulb,
  languages: Languages,
}

export function FloatingToolbar({ selectedText, position, onPromptSelect, onClose }: FloatingToolbarProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    loadPrompts()
  }, [])

  const loadPrompts = async () => {
    const settings = await storage.getSettings()
    const enabledPrompts = settings.prompts.filter((p) => p.enabled).sort((a, b) => a.order - b.order)
    setPrompts(enabledPrompts)
  }

  const visiblePrompts = showAll ? prompts : prompts.slice(0, 3)
  const hasMore = prompts.length > 3

  return (
    <div
      className="fixed z-[10000] bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center gap-1"
      style={{
        left: position.x,
        top: position.y - 50,
        maxWidth: "400px",
      }}
    >
      {visiblePrompts.map((prompt) => {
        const Icon = iconMap[prompt.icon as keyof typeof iconMap] || Brain
        return (
          <Button
            key={prompt.id}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-sm"
            onClick={() => onPromptSelect(prompt)}
          >
            <Icon className="h-4 w-4" />
            {prompt.name}
          </Button>
        )
      })}

      {hasMore && !showAll && (
        <Button variant="ghost" size="sm" onClick={() => setShowAll(true)}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
