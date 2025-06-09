"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Brain, Library, Settings, Plus } from "lucide-react"

declare const chrome: any

export default function PopupPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleNewFlashcard = () => {
    // Open generation panel with empty content
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "OPEN_GENERATION_PANEL",
          selectedText: "",
          sourceUrl: tabs[0].url,
        })
      }
    })
    window.close()
  }

  const handleOpenLibrary = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "TOGGLE_SIDEBAR",
        })
      }
    })
    window.close()
  }

  const handleOpenSettings = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("settings/index.html") })
    window.close()
  }

  if (isLoading) {
    return (
      <div className="w-80 h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="w-80 p-4 bg-white">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          StudySmart
        </h1>
      </div>

      <div className="space-y-3">
        <Button onClick={handleNewFlashcard} className="w-full justify-start gap-3 h-12 text-left" variant="ghost">
          <Plus className="h-5 w-5 text-blue-600" />
          <span>New Flashcard</span>
        </Button>

        <Button onClick={handleOpenLibrary} className="w-full justify-start gap-3 h-12 text-left" variant="ghost">
          <Library className="h-5 w-5 text-green-600" />
          <span>Card Deck</span>
        </Button>

        <Button onClick={handleOpenSettings} className="w-full justify-start gap-3 h-12 text-left" variant="ghost">
          <Settings className="h-5 w-5 text-gray-600" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  )
}
