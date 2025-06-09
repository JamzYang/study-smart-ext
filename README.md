# StudySmart Chrome 插件

## 项目简介

**StudySmart** 是一款AI驱动的个性化知识点萃取工具。它能将任意网络内容（如文章、视频字幕）高效转化为高质量、可复用的记忆卡片，并支持导出到专业的记忆平台（如 Anki, RemNote），致力于提升用户的学习效率和知识管理能力。

## 核心功能

*   **GPT驱动的智能提取**: 利用大语言模型，从选定文本中智能生成多样化的闪卡建议（如词汇、概念、语法、摘要等）。
*   **高度自定义的Prompt系统**: 用户可以创建和管理自己的Prompt模板，精准控制AI生成卡片的内容和格式，适应各种学习场景。
*   **便捷的集成与导出**: 支持一键将闪卡导出到 Anki 和 RemNote，同时也提供 CSV/JSON 格式导出，方便数据迁移和管理。

## 技术栈

*   **构建工具**: [Vite](httpss://vitejs.dev/)
*   **前端框架**: [React](httpss://reactjs.org/)
*   **状态管理**: [Redux Toolkit](httpss://redux-toolkit.js.org/) & [react-redux](httpss://react-redux.js.org/)
*   **路由**: [React Router DOM](httpss://reactrouter.com/)
*   **UI 组件库**: [Ant Design 5.x](httpss://ant.design/)
*   **CSS预处理器**: [Stylus](httpss://stylus-lang.com/)
*   **HTTP 请求**: [Axios](httpss://axios-http.com/)
*   **Mock 数据**: [Mock.js](http://mockjs.com/)

## 目录结构说明

```
.
├── public/               # 存放公共静态资源，如 favicon.ico，构建时会直接复制到输出目录
├── src/                  # 项目核心源代码目录
│   ├── api/              # 负责与后端 API 的交互，封装 axios 请求
│   ├── common/           # 存放项目通用的资源
│   │   └── styles/       # 存放全局、重置等公共样式文件
│   ├── components/       # 存放全局可复用的 React 组件 (如 Header, ThemeModal)
│   ├── pages/            # 存放页面级组件，每个子目录代表一个页面 (如 Home, Login)
│   ├── router/           # 定义应用的路由配置，使用 react-router-dom
│   ├── store/            # 全局状态管理 (Redux Toolkit) 的核心目录
│   │   └── slices/       # 按功能模块拆分 state (如 theme.jsx 管理主题)
│   ├── globalConfig.jsx  # 全局配置文件，存放主题色、localStorage key 等常量
│   ├── main.jsx          # 应用的入口文件，负责初始化 React、Redux、路由等
│   └── mock.jsx          # 开发阶段模拟 API 数据
├── .eslintrc.cjs         # ESLint 配置文件，用于代码规范检查
├── .gitignore            # Git 忽略配置，排除不需要版本控制的文件
├── index.html            # 应用的 HTML 入口文件
├── package.json          # 项目依赖和脚本配置文件 (npm/yarn)
├── vite.config.js        # Vite 的配置文件 (开发服务器, 构建选项, 代理等)
└── yarn.lock             # Yarn 依赖版本锁定文件，确保依赖一致性
```
