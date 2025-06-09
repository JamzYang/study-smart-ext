# 生成UI所需的高质量Prompt

本文档旨在提供一系列详细的、高质量的英文Prompt，用于指导AI（如Midjourney, DALL-E 3）生成符合《UI概要描述文档.md》要求的用户界面。

## Prompt编写核心原则

*   **结构化描述**: 使用区域（top, middle, bottom）和编号列表来清晰地定义布局和元素。
*   **明确控件类型**: 直接指明控件类型，如 `a dropdown menu`, `a text input field`, `a toggle switch`, `a primary button`。
*   **指定标签和文本**: 为按钮、标签、标题提供精确的英文文本，例如 `labeled 'Source Text'`, `a button 'Save All'`。
*   **风格指导**: 使用 `UI design`, `modern`, `clean`, `minimalist`, `SaaS` 等词汇来引导视觉风格。
*   **关注细节**: 描述图标（`a gear icon`）、颜色（`a primary blue button`）、状态（`the switch is on`）等细节。

---

## 1. 卡片生成面板 (Generation Panel)


**目标**：此界面是插件的核心，用于展示AI生成的闪卡并让用户进行处理。

### Prompt for AI Image Generator:

```
UI design, a browser extension popup panel for generating flashcards, modern and clean SaaS aesthetic.

The panel is titled "Generate Flashcards".

**Top Section:**
1.  **Source Info**: A read-only text area showing the user's selected text. Below it, display the source URL.
2.  **Prompt Selector**: A dropdown menu labeled "Prompt Template".
3.  **Manage Prompts**: Next to the dropdown, a small button with a gear icon, labeled "Manage".

**Middle Section (Main Content):**
This section is titled "Suggested Flashcards". Below the title, two buttons: a primary blue button "Save All Selected" and a secondary gray button "Select All".

Below this is a scrollable list of generated flashcard items. Each item is a white card with a light gray border and rounded corners.

**Each flashcard item must contain:**
1.  **Checkbox**: A checkbox on the far left, checked by default.
2.  **Title**: A title like "FLASHCARD 1".
3.  **Discard Button**: A small trash can icon in the top-right corner.
4.  **Front Content**: A multi-line text input field labeled "Front Content".
5.  **Back Content**: A multi-line text input field labeled "Back Content".
6.  **Tags**: A section labeled "Tags" with an input field to add new tags. Existing tags like "Education" and "AI" are displayed as blue pills with an 'x' to remove them.

Show 2-3 flashcard items in the list to demonstrate the layout.
```

---
## 2. 悬浮工具栏 (Floating Toolbar)

**目标**：一个在用户选中文本后出现的小巧工具栏。

### Prompt for AI Image Generator:

```
UI design, a small, horizontal floating toolbar for a browser extension. It should appear above a block of selected text on a webpage.

The toolbar has rounded corners and a slightly transparent, dark background.

Inside the toolbar, there are several buttons, displayed horizontally:
1.  A button with a sparkle icon, labeled "Generate Flashcards".
2.  A button with a lightbulb icon, labeled "Explain Concept".
3.  A button with a globe icon, labeled "Translate".
4.  A button with three dots "..." for more options.

The design should be minimalist, modern, and not obtrusive.
```

---
## 3. 侧边栏 - 卡片库 (Sidebar - Card Deck)

**目标**：一个功能丰富的侧边栏，用于管理所有已保存的卡片，并清晰地展示同步状态。

### Prompt for AI Image Generator:

```
UI design for a browser extension sidebar, modern and clean SaaS aesthetic. The sidebar is for managing saved flashcards.

**Top Control Bar:**
1.  A search input field with a magnifying glass icon, placeholder text "Search cards...".
2.  Next to it, a small filter button with a funnel icon. When clicked, it should show a dropdown menu with options for "Tags" and "Sync Status (Unsynced, Synced, Failed)".
3.  To the right of the filter, two contextual buttons appear only when at least one card is selected: a primary "Move to..." button and a secondary "Delete" button.
4.  On the far right, a main "Export" button.

**Main Content (two-column layout):**

**Left Column (Collections):**
A narrow navigation panel titled "Collections".
1.  An "Inbox" item at the top, with an inbox icon. It is shown with a blue background, indicating it is currently selected.
2.  An "All Cards" item is listed below the "Inbox".
3.  A list of user-created collections, like "History" and "Computer Science", each with a folder icon.
4.  A "+ New Collection" button at the very bottom.

**Right Column (Card List):**
The main area is titled "Inbox" and shows a list of unsorted cards. Each card is a compact row item.

**Each row item must contain:**
1.  A checkbox on the far left for multi-selection.
2.  The card's front text (e.g., "What is the capital of France?").
3.  Immediately to the right of the text, a small, subtle sync status icon.
    *   One card should have a gray cloud icon (representing 'Unsynced').
    *   Another card should have a red warning icon (representing 'Sync Failed').
    *   A third card should have a green checkmark icon (representing 'Synced').
4.  Below the text, a few tags like "Geography" and "Europe".
5.  The source website's favicon.
6.  On hover, "Edit" and "Delete" icon buttons should appear on the far right.

Show 3-4 card items to demonstrate the various states. One of the cards must be shown with its checkbox ticked, which makes the "Move to..." and "Delete" buttons in the top control bar visible.
```

---
## 4. 设置页面 (Settings Page)

**目标**：一个统一的设置中心，用于管理Prompt、AI模型、导出集成和通用选项。

### Prompt for AI Image Generator:

```
UI design for a comprehensive settings page in a browser extension, modern and clean SaaS aesthetic. The page has a main title "Settings".

The layout is a two-column design with navigation on the left and content on the right.

**Left Column (Navigation):**
A vertical navigation bar with the following items. Each item has an icon and a label. The "Prompts" item is selected with a blue background.
1.  **Prompts** (selected)
2.  **AI Models**
3.  **Export Integrations**
4.  **General**

**Right Column (Content Area):**
The content shown here corresponds to the **"Prompts"** section, which is currently selected. The title of this area is "Prompts".

The Prompts section itself is a two-column layout:

**Inner Left Column (Prompt List):**
1.  A button at the top: "+ New Prompt".
2.  A scrollable list of existing prompt names. Each item in the list has:
    *   A drag handle icon (six dots) on the far left.
    *   A small icon that the user has selected (e.g., a translate icon, a summarize icon).
    *   The prompt's name (e.g., "Translate", "Summarize", "Explain").
    *   The "Translate" item is highlighted to show it's being edited.

**Inner Right Column (Editor):**
This area is titled "Edit Prompt: Translate". It contains the following fields from top to bottom:
1.  **Prompt Name**: A text input field, currently showing "Translate".
2.  **Icon**: Next to the name, a small button showing the currently selected icon (a translate icon). Clicking it would open an icon picker.
3.  **Show in floating toolbar**: A toggle switch, which is in the 'on' position.
4.  **Prompt Content**: A large, multi-line text area containing the prompt text.
5.  **Help Text**: Below the text area, a small help text: "Use {{selected_text}} to insert the selected text into the prompt."
6.  **Action Buttons**: At the bottom, a primary "Save Changes" button and a secondary "Cancel" button.
```

---
## 5. 设置页面 - AI模型 (Settings Page - AI Models)

**目标**：设计一个灵活的AI模型配置界面，允许用户创建、管理和切换多个API配置。

### Prompt for AI Image Generator:

```
UI design for the "AI Models" section of a browser extension's settings page. Modern and clean SaaS aesthetic, with a light gray background.

The page content is titled "AI Models".

**Top Section (Configuration Management):**
1.  **Configuration Profile**: A dropdown menu labeled "Configuration Profile". It shows "gemini-2.5-pro" as the selected value. The dropdown has a subtle border.
2.  **Action Buttons**: To the right of the dropdown, a row of small, simple icon buttons: a `+` (plus) icon for "New Profile", an `edit` (pencil) icon for "Rename", and a `delete` (trash can) icon for "Delete".

**Bottom Section (Configuration Details):**
A form with the settings for the currently selected profile, with clear labels above each field.

1.  **API Provider**: A dropdown menu labeled "API Provider", with "Google Gemini" selected. To the far right of the field, there is a small, subtle text link "Google Gemini Docs".
2.  **Gemini API Key**: A password input field labeled "Gemini API Key", showing dots for the hidden key. Below it, a muted help text reads "API keys are stored securely."
3.  **Use Custom Base URL**: A checkbox that is currently checked, labeled "Use custom Base URL".
4.  **Base URL Input**: Directly below the checkbox, an enabled text input field is visible, containing a URL like "http://localhost:3145".
5.  **Model**: A text input field labeled "Model", showing a value like "gemini-2.5-pro-preview-05-06".
```

---
## 6. 设置页面 - 导出集成 (Settings Page - Export Integrations)

**目标**：提供一个清晰的界面，用于配置与Anki等第三方学习平台的连接和数据同步。

### Prompt for AI Image Generator:

```
UI design for the "Export Integrations" section of a browser extension's settings page. Modern and clean SaaS aesthetic.

The layout is a two-column design. The left navigation has "Export Integrations" selected with a blue background.

**Right Column (Content Area):**
The content area is titled "Export Integrations". It features a tabbed interface.

1.  **Tabs**: Two tabs are visible: "Anki" and "RemNote". The "Anki" tab is currently active.
2.  **Anki Settings Title**: Below the tabs, a title reads "Anki Integration".

**Anki Configuration Form:**

1.  **AnkiConnect URL**: A text input field labeled "AnkiConnect URL", pre-filled with "http://localhost:8765".
2.  **Connection Status**: Next to the URL field, a "Test Connection" button. Below it, a status message in green text: "Connection successful. Anki version: 2.1.49".
3.  **Deck & Note Type**: A horizontal section with two dropdown menus:
    *   One labeled "Anki Deck", with "Default" selected.
    *   One labeled "Note Type", with "Basic (and reversed card)" selected.
4.  **Field Mapping**: A section titled "Field Mapping". This section ensures the plugin's data maps to the correct fields in Anki. It contains a list of mappings:
    *   Each row has a label for the plugin's data field (e.g., "Front", "Back", "Tags", "Source URL").
    *   Next to each label is a dropdown menu showing the fields available from the selected Anki Note Type (e.g., "Front", "Back", "Add Reverse"). The mapping is shown, like "Front" -> "Front".
5.  **Action Button**: At the bottom, a primary "Save" button.
```

---
## 7. 浏览器图标弹出菜单 (Browser Action Popup)

**目标**: 当用户点击浏览器工具栏上的插件图标时，提供一个快速访问核心功能的入口菜单。

### Prompt for AI Image Generator:

```
UI design, a browser extension popup menu that appears when clicking the extension's icon in the browser toolbar. The design should be modern, clean, and minimalist, with a light theme.

The popup is small and vertically oriented, with rounded corners. It has a main title at the top, "StudySmart".

Below the title, display a list of three distinct menu items. Each item should be in a separate row and clearly clickable, with a hover state effect (e.g., a light gray background).

1.  **New Flashcard**: A row containing a plus-circle icon on the left and the text label "New Flashcard".
2.  **Card Deck**: A row containing a layer-group icon (representing a deck of cards) on the left and the text label "Card Deck".
3.  **Settings**: A row containing a gear icon on the left and the text label "Settings".

The overall feeling should be simple and functional, providing immediate access to the main features.
```
