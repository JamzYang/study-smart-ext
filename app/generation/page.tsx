"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Trash2, Loader2 } from "lucide-react"
import type { Flashcard, Prompt } from "@/lib/types"
import { storage } from "@/lib/storage"
import { generateId } from "@/lib/utils"

interface GeneratedCard {
  id: string
  front: string
  back: string
  tags: string[]
  selected: boolean
}

export default function GenerationPage() {
  const [selectedText, setSelectedText] = useState("")
  const [sourceUrl, setSourceUrl] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState<string>("")
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    loadInitialData()
    loadPrompts()
  }, [])

  const loadInitialData = () => {
    // Get data from URL params or message
    const params = new URLSearchParams(window.location.search)
    setSelectedText(params.get("text") || "")
    setSourceUrl(params.get("url") || "")
    setSelectedPrompt(params.get("prompt") || "")
  }

  const loadPrompts = async () => {
    const settings = await storage.getSettings()
    setPrompts(settings.prompts)
  }

  const generateCards = async () => {
    if (!selectedText || !selectedPrompt) return

    setIsGenerating(true)
    setError("")

    try {
      const settings = await storage.getSettings()
      const activeConfig = settings.aiConfigs.find((config) => config.isActive)

      if (!activeConfig) {
        throw new Error("No active AI configuration found. Please configure AI settings.")
      }

      const prompt = prompts.find((p) => p.id === selectedPrompt)
      if (!prompt) {
        throw new Error("Selected prompt not found.")
      }

      const processedPrompt = prompt.content.replace("{{selected_text}}", selectedText)

      // Simulate AI API call (replace with actual implementation)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock generated cards
      const mockCards: GeneratedCard[] = [
        {
          id: generateId(),
          front: "What is the primary benefit of using a virtual DOM?",
          back: "It improves performance by minimizing direct manipulations of the browser's DOM, batching updates efficiently.",
          tags: ["JavaScript", "Performance"],
          selected: true,
        },
        {
          id: generateId(),
          front: "Core Principle of React",
          back: "React follows a component-based architecture where UI is broken down into reusable components.",
          tags: ["React", "Architecture"],
          selected: true,
        },
      ]

      setGeneratedCards(mockCards)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate cards")
    } finally {
      setIsGenerating(false)
    }
  }

  const updateCard = (id: string, field: "front" | "back", value: string) => {
    setGeneratedCards((cards) => cards.map((card) => (card.id === id ? { ...card, [field]: value } : card)))
  }

  const toggleCardSelection = (id: string) => {
    setGeneratedCards((cards) => cards.map((card) => (card.id === id ? { ...card, selected: !card.selected } : card)))
  }

  const removeCard = (id: string) => {
    setGeneratedCards((cards) => cards.filter((card) => card.id !== id))
  }

  const saveSelectedCards = async () => {
    const selectedCards = generatedCards.filter((card) => card.selected)

    for (const card of selectedCards) {
      const flashcard: Flashcard = {
        id: generateId(),
        front: card.front,
        back: card.back,
        tags: card.tags,
        sourceUrl,
        sourceText: selectedText,
        collectionId: "inbox",
        createdAt: new Date(),
        syncStatus: "pending",
      }

      await storage.saveFlashcard(flashcard)
    }

    // Close the panel
    window.close()
  }

  const selectAll = () => {
    setGeneratedCards((cards) => cards.map((card) => ({ ...card, selected: true })))
  }

  useEffect(() => {
    if (selectedText && selectedPrompt) {
      generateCards()
    }
  }, [selectedText, selectedPrompt])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-gray-900 text-white">
          <CardTitle className="flex items-center justify-between">
            Generate Flashcards
            <Button variant="ghost" size="sm" onClick={() => window.close()} className="text-white hover:bg-gray-800">
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="selectedText">Selected Text</Label>
              <Textarea
                id="selectedText"
                value={selectedText}
                onChange={(e) => setSelectedText(e.target.value)}
                className="mt-1 bg-gray-50"
                rows={4}
                placeholder="Enter or paste text to generate flashcards from..."
              />
            </div>

            <div>
              <Label htmlFor="sourceUrl">Source URL</Label>
              <Input
                id="sourceUrl"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="mt-1"
                placeholder="https://example.com/article-name"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="prompt">Prompt</Label>
                <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a prompt" />
                  </SelectTrigger>
                  <SelectContent>
                    {prompts.map((prompt) => (
                      <SelectItem key={prompt.id} value={prompt.id}>
                        {prompt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={generateCards} disabled={isGenerating || !selectedText}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Regenerate"
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Generated Cards Section */}
          {generatedCards.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Suggested Flashcards</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button onClick={saveSelectedCards} disabled={!generatedCards.some((card) => card.selected)}>
                    Save All Selected
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {generatedCards.map((card) => (
                  <Card key={card.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={card.selected}
                          onCheckedChange={() => toggleCardSelection(card.id)}
                          className="mt-1"
                        />

                        <div className="flex-1 space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Front Content</Label>
                            <Textarea
                              value={card.front}
                              onChange={(e) => updateCard(card.id, "front", e.target.value)}
                              className="mt-1"
                              rows={2}
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Back Content</Label>
                            <Textarea
                              value={card.back}
                              onChange={(e) => updateCard(card.id, "back", e.target.value)}
                              className="mt-1"
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Tags</Label>
                            <div className="flex gap-2 mt-1">
                              {card.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                                  {tag}
                                </span>
                              ))}
                              <Input
                                placeholder="Add tag..."
                                className="w-24 h-6 text-xs"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    const value = e.currentTarget.value.trim()
                                    if (value) {
                                      setGeneratedCards((cards) =>
                                        cards.map((c) => (c.id === card.id ? { ...c, tags: [...c.tags, value] } : c)),
                                      )
                                      e.currentTarget.value = ""
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCard(card.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">AI is working hard to generate your flashcards...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
