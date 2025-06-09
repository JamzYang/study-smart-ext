// Content script for handling text selection and floating toolbar
;(() => {
  let floatingToolbar = null
  let selectedText = ""
  let selectionPosition = { x: 0, y: 0 }

  // Create floating toolbar
  function createFloatingToolbar(text, position) {
    removeFloatingToolbar()

    selectedText = text
    selectionPosition = position

    // Create toolbar container
    const toolbar = document.createElement("div")
    toolbar.id = "studysmart-floating-toolbar"
    toolbar.style.cssText = `
      position: fixed;
      z-index: 10000;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      padding: 8px;
      display: flex;
      gap: 4px;
      left: ${position.x}px;
      top: ${position.y - 50}px;
      max-width: 400px;
    `

    // Get enabled prompts from storage
    chrome.storage.local.get(["settings"], (result) => {
      const settings = result.settings || { prompts: [] }
      const enabledPrompts = settings.prompts
        .filter((p) => p.enabled)
        .sort((a, b) => a.order - b.order)
        .slice(0, 4) // Show max 4 buttons

      enabledPrompts.forEach((prompt) => {
        const button = document.createElement("button")
        button.textContent = prompt.name
        button.style.cssText = `
          padding: 6px 12px;
          border: none;
          background: transparent;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
          white-space: nowrap;
        `

        button.addEventListener("mouseenter", () => {
          button.style.backgroundColor = "#f3f4f6"
        })

        button.addEventListener("mouseleave", () => {
          button.style.backgroundColor = "transparent"
        })

        button.addEventListener("click", () => {
          handlePromptClick(prompt)
        })

        toolbar.appendChild(button)
      })
    })

    document.body.appendChild(toolbar)
    floatingToolbar = toolbar

    // Auto-hide after 5 seconds
    setTimeout(() => {
      removeFloatingToolbar()
    }, 5000)
  }

  function removeFloatingToolbar() {
    if (floatingToolbar) {
      floatingToolbar.remove()
      floatingToolbar = null
    }
  }

  function handlePromptClick(prompt) {
    removeFloatingToolbar()

    // Open generation panel
    const url =
      chrome.runtime.getURL("generation/index.html") +
      `?text=${encodeURIComponent(selectedText)}&url=${encodeURIComponent(window.location.href)}&prompt=${prompt.id}`

    window.open(url, "studysmart-generation", "width=1000,height=800,scrollbars=yes")
  }

  // Handle text selection
  function handleTextSelection() {
    const selection = window.getSelection()
    const text = selection.toString().trim()

    if (text.length > 0) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      const position = {
        x: rect.left + rect.width / 2 - 100, // Center the toolbar
        y: rect.top + window.scrollY,
      }

      // Check if floating toolbar is enabled
      chrome.storage.local.get(["settings"], (result) => {
        const settings = result.settings || { enableFloatingToolbar: true }
        if (settings.enableFloatingToolbar) {
          setTimeout(() => {
            createFloatingToolbar(text, position)
          }, 100)
        }
      })
    } else {
      removeFloatingToolbar()
    }
  }

  // Event listeners
  document.addEventListener("mouseup", handleTextSelection)
  document.addEventListener("keyup", handleTextSelection)

  // Hide toolbar when clicking elsewhere
  document.addEventListener("click", (e) => {
    if (floatingToolbar && !floatingToolbar.contains(e.target)) {
      removeFloatingToolbar()
    }
  })

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "OPEN_GENERATION_PANEL") {
      const url =
        chrome.runtime.getURL("generation/index.html") +
        `?text=${encodeURIComponent(message.selectedText || "")}&url=${encodeURIComponent(message.sourceUrl || window.location.href)}`
      window.open(url, "studysmart-generation", "width=1000,height=800,scrollbars=yes")
    } else if (message.type === "TOGGLE_SIDEBAR") {
      // Toggle sidebar implementation
      toggleSidebar()
    }
  })

  function toggleSidebar() {
    let sidebar = document.getElementById("studysmart-sidebar")

    if (sidebar) {
      sidebar.remove()
    } else {
      // Create sidebar iframe
      sidebar = document.createElement("iframe")
      sidebar.id = "studysmart-sidebar"
      sidebar.src = chrome.runtime.getURL("sidebar/index.html")
      sidebar.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 400px;
        height: 100vh;
        border: none;
        z-index: 9999;
        background: white;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
      `

      document.body.appendChild(sidebar)
    }
  }
})()
