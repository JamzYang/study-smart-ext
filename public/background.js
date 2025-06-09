// Background service worker
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu
  chrome.contextMenus.create({
    id: "studysmart-main",
    title: "StudySmart",
    contexts: ["selection"],
  })

  // Initialize default settings
  chrome.storage.local.get(["settings"], (result) => {
    if (!result.settings) {
      const defaultSettings = {
        enableFloatingToolbar: true,
        shortcuts: {},
        aiConfigs: [],
        prompts: [
          {
            id: "generate-flashcards",
            name: "Generate Flashcards",
            content: "Create flashcards from the following text: {{selected_text}}",
            icon: "brain",
            enabled: true,
            order: 0,
          },
          {
            id: "explain-concept",
            name: "Explain Concept",
            content: "Explain the following concept: {{selected_text}}",
            icon: "lightbulb",
            enabled: true,
            order: 1,
          },
          {
            id: "translate",
            name: "Translate",
            content: "Translate the following text: {{selected_text}}",
            icon: "languages",
            enabled: true,
            order: 2,
          },
        ],
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
      }

      chrome.storage.local.set({ settings: defaultSettings })
    }
  })
})

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "studysmart-main") {
    // Get enabled prompts and create submenu dynamically
    chrome.storage.local.get(["settings"], (result) => {
      const settings = result.settings || { prompts: [] }
      const enabledPrompts = settings.prompts.filter((p) => p.enabled)

      // Remove existing submenus
      chrome.contextMenus.removeAll(() => {
        // Recreate main menu
        chrome.contextMenus.create({
          id: "studysmart-main",
          title: "StudySmart",
          contexts: ["selection"],
        })

        // Add prompt submenus
        enabledPrompts.forEach((prompt) => {
          chrome.contextMenus.create({
            id: `prompt-${prompt.id}`,
            parentId: "studysmart-main",
            title: prompt.name,
            contexts: ["selection"],
          })
        })

        // Add separator and utility options
        chrome.contextMenus.create({
          id: "separator",
          parentId: "studysmart-main",
          type: "separator",
          contexts: ["selection"],
        })

        chrome.contextMenus.create({
          id: "open-library",
          parentId: "studysmart-main",
          title: "Open Card Library",
          contexts: ["selection"],
        })

        chrome.contextMenus.create({
          id: "open-settings",
          parentId: "studysmart-main",
          title: "Settings",
          contexts: ["selection"],
        })
      })
    })
  } else if (info.menuItemId.startsWith("prompt-")) {
    const promptId = info.menuItemId.replace("prompt-", "")

    // Open generation panel with selected prompt
    const url =
      chrome.runtime.getURL("generation/index.html") +
      `?text=${encodeURIComponent(info.selectionText)}&url=${encodeURIComponent(tab.url)}&prompt=${promptId}`

    chrome.windows.create({
      url: url,
      type: "popup",
      width: 1000,
      height: 800,
    })
  } else if (info.menuItemId === "open-library") {
    chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_SIDEBAR" })
  } else if (info.menuItemId === "open-settings") {
    chrome.tabs.create({ url: chrome.runtime.getURL("settings/index.html") })
  }
})

// Update context menu when settings change
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.settings) {
    // Refresh context menu
    chrome.contextMenus.removeAll()
    chrome.contextMenus.create({
      id: "studysmart-main",
      title: "StudySmart",
      contexts: ["selection"],
    })
  }
})
