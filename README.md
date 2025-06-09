# StudySmart Chrome 插件

## 项目简介

**StudySmart** 是一款AI驱动的个性化知识点萃取工具。它能将任意网络内容（如文章、视频字幕）高效转化为高质量、可复用的记忆卡片，并支持导出到专业的记忆平台（如 Anki, RemNote），致力于提升用户的学习效率和知识管理能力。

## 核心功能
*   **GPT驱动的智能提取**: 利用大语言模型，从选定文本中智能生成多样化的闪卡建议（如词汇、概念、语法、摘要等）。
*   **高度自定义的Prompt系统**: 用户可以创建和管理自己的Prompt模板，精准控制AI生成卡片的内容和格式，适应各种学习场景。
*   **便捷的集成与导出**: 支持一键将闪卡导出到 Anki 和 RemNote，同时也提供 CSV/JSON 格式导出，方便数据迁移和管理。

## 技术栈说明

- 基于Vite 4.x搭建
- 基于Chrome Extension Manifest V3规范
- 集成Sass/Scss/Less/Stylus
- 集成Ant Design 5.x
- 集成mock.js、mockjs-fetch模拟请求
- 集成react-router-dom
- 将popup、content、background目录互相独立，便于团队协作开发维护
- 按照Chrome Extension最终生成目录要求配置Vite
- 封装fetch，满足popup、content script、background script跨域请求

## 安装项目
执行：
```
npm install
```
或
```
yarn
```

## 使用方法：开发环境

> ※注：为方便演示接口请求，本Demo使用了mock.js，也配置了反向代理。
> mock.js便于直接调试，使用前请修改src/api/index.jsx，将import '@/mock'前的注释去掉，保证mock.js的正确引入。
> 如使用反向代理，需要自行在本地搭建API服务，接口返回数据可参考src/mock.jsx中的数据。

执行：
```
npm run dev
```
或
```
yarn dev
```

## 使用方法：build项目

> ※注：
> 1. 执行build前一定检查是否取消mock.js，即确认src/api/index.jsx中，将import '@/mock'注释掉。这是因为mock.js使用window变量，而运行background script的Service Worker不支持window，将导致插件运行失败。
> 2. 执行build前一定检查src/main.jsx代码中，注释掉import '@/content'。这段代码是用于方便在开发环境调试content script的，否则content script会被集成到popup页面中。

执行：
```
npm run build
```
或
```
yarn build
```

## 目录结构说明

```
├── public
│   ├── images
│   │   └── app.png           # 插件图标
│   ├── favicon.ico
│   ├── insert.js           # 插入到目标页面执行的js（非必须，视业务需求而定）
│   └── manifest.json       # 插件的配置文件
├── src
│   ├── api
│   │   └── index.jsx         # api库
│   ├── background
│   │   └── index.jsx         # background script主文件
│   ├── common
│   │   ├── fonts             # 字体文件目录
│   │   ├── images            # 图片文件目录
│   │   ├── js                # 公用js文件目录
│   │   └── styles            # 公用样式文件目录
│   ├── content
│   │   ├── components      # content 组件目录
│   │   ├── images          # content 图片目录
│   │   ├── content.styl    # content 样式
│   │   └── index.jsx       # content script主文件
│   ├── popup
│   │   ├── components      # popup 组件目录
│   │   ├── pages           # popup 页面目录
│   │   ├── router
│   │   │   └── index.jsx   # popup 路由配置文件
│   │   ├── index.jsx       # popup 主文件
│   │   └── popup.styl      # popup 样式文件
│   ├── main.jsx              # 项目主文件，也是popup入口文件
│   └── mock.jsx              # mock数据文件
├── .eslintrc.cjs           # ESLint配置文件
├── .gitignore
├── build.js                # 补充的build脚本文件
├── globalConfig.js         # 全局配置文件
├── index.html              # popup页面入口
├── package.json
├── vite.popup.config.js      # popup的Vite配置文件
├── vite.content.config.js    # content的Vite配置文件
├── vite.background.config.js # background的Vite配置文件
└── yarn.lock
```

