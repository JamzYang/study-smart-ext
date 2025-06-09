/*global chrome*/
import { apiRequest } from '@/api'

// 默认的 prompts
const defaultPrompts = [
  {
    id: 'extract-concept',
    name: '提取概念',
    prompt: '请从以下文本中提取核心概念...',
    showInToolbar: true,
    order: 0,
  },
  {
    id: 'translate',
    name: '翻译',
    prompt: '请将以下文本翻译成中文...',
    showInToolbar: true,
    order: 1,
  },
  {
    id: 'summarize',
    name: '总结',
    prompt: '请总结以下文本...',
    showInToolbar: true,
    order: 2,
  },
  {
    id: 'disabled-prompt',
    name: '禁用的Prompt',
    prompt: '这是一个被禁用的prompt',
    showInToolbar: false,
    order: 3,
  }
];

// 初始化Prompts
const initializePrompts = (callback) => {
  chrome.storage.local.get('prompts', (result) => {
    if (!result.prompts) {
      chrome.storage.local.set({ prompts: defaultPrompts }, () => {
        console.log('Default prompts initialized.');
        if (callback) callback();
      });
    } else {
      console.log('Prompts already exist.');
      if (callback) callback();
    }
  });
};

// 创建上下文菜单
const createContextMenu = () => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'studySmartParent',
      title: 'StudySmart',
      contexts: ['selection']
    });

    chrome.storage.local.get('prompts', (result) => {
      const prompts = result.prompts || [];
      const enabledPrompts = prompts
        .filter(p => p.showInToolbar)
        .sort((a, b) => a.order - b.order);

      enabledPrompts.forEach((prompt) => {
        chrome.contextMenus.create({
          id: `prompt-${prompt.id}`,
          parentId: 'studySmartParent',
          title: prompt.name,
          contexts: ['selection']
        });
      });

      if (enabledPrompts.length > 0) {
        chrome.contextMenus.create({
          id: 'separator1',
          parentId: 'studySmartParent',
          type: 'separator',
          contexts: ['selection']
        });
      }

      chrome.contextMenus.create({
        id: 'flashcard-library',
        parentId: 'studySmartParent',
        title: '闪卡库',
        contexts: ['selection']
      });

      chrome.contextMenus.create({
        id: 'settings',
        parentId: 'studySmartParent',
        title: '设置',
        contexts: ['selection']
      });
    });
  });
};

// 在插件安装或更新时进行初始化
chrome.runtime.onInstalled.addListener(() => {
  initializePrompts(() => {
    createContextMenu();
  });
});

// 监听上下文菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('Context menu clicked', info, tab);
  if (info.menuItemId.startsWith('prompt-')) {
    const promptId = info.menuItemId.replace('prompt-', '');
    // TODO: 根据promptId和selectionText执行操作
    console.log(`Executing prompt ${promptId} with text: "${info.selectionText}"`);
  } else if (info.menuItemId === 'flashcard-library') {
    // TODO: 打开闪卡库页面
    console.log('Opening flashcard library');
  } else if (info.menuItemId === 'settings') {
    // TODO: 打开设置页面
    // chrome.runtime.openOptionsPage(); // This is a good way to open the settings page if you have one
    console.log('Opening settings');
  }
});

// 监听storage变化，动态更新上下文菜单
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.prompts) {
    console.log('Prompts have changed, recreating context menu.');
    createContextMenu();
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // 接收来自content script的消息，requset里不允许传递function和file类型的参数
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const { contentRequest } = request
        // 接收来自content的api请求
        if (contentRequest === 'apiRequest') {
            let { config } = request
            // API请求成功的回调
            config.success = (data) => {
                data.result = 'succ'
                sendResponse(data)
            }
            // API请求失败的回调
            config.fail = (msg) => {
                sendResponse({
                    result: 'fail',
                    msg,
                })
            }
            // 发起请求
            apiRequest(config)
        }
    })
    return true
})
