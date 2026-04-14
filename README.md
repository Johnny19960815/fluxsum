# fluxsum
一站式服务全球

### 一、 核心架构设计：中央集群枢纽（The Hub）

系统分为四个逻辑层：**控制平面（Control Plane）**、**数据平面（Data Plane）**、**应用层（App Layer）** 和 **微前端层（Micro-Frontend Layer）**。

- **中央集群 (Central Hub)**：基于 **Go (Gin)** 编写，负责全局路由分发、SSO 鉴权、各子服务健康监测、以及全局配置中心。

- **SSO 模块**：集成在中央集群中，采用 **OIDC (OpenID Connect) / OAuth2** 协议，支持全站一处登录、处处通行。

- **通讯协议**：所有多语言项目（Go, Python, TS）之间通过 **gRPC + Protobuf** 强耦合打通，彻底告别拼写错误的 JSON。

- **微前端架构 (Module Federation 2.0)**：
  - **Host 应用**：`ai-platform-web` 作为主壳应用，动态加载各子应用模块
  - **Remote 应用**：`fixbuy-admin`、`aifoot-web` 等作为独立部署的远程模块
  - **共享依赖**：`react`、`react-dom`、`zustand`、`@tanstack/react-query` 等通过 `shared` 配置实现单例共享，避免重复加载
  - **类型安全**：通过 `dts` 配置自动生成/消费 TypeScript 类型，跨应用调用零类型错误


---

### 二、 完整项目结构 (Monorepo Directory Tree)

```
/fluxsum
  ├── .bunfig.toml              # Bun 1.3 全局配置（registry、lockfile）
  ├── turbo.json                # Turborepo 任务编排（支持跨语言任务依赖）
  ├── package.json              # 根目录声明 Bun Workspaces
  ├── eslint.config.ts          # 根目录 ESLint 配置（@antfu/eslint-config）
  ├── module-federation.config.ts  # MF 2.0 全局共享配置
  │
  ├── /apps                     # --- 应用层 (独立部署的应用) ---
  │   ├── /hub-central-server   # [Go/Gin] 中央集群核心 (SSO + Gateway)
  │   │
  │   ├── /ai-platform-web      # [Rsbuild + React] MF Host 主壳应用
  │   │   ├── rsbuild.config.ts # MF Host 配置 (remotes 声明 + Tailwind 4 PostCSS)
  │   │   └── src/
  │   │       ├── bootstrap.tsx # 异步入口 (MF 必需，导入全局 CSS)
  │   │       ├── styles.css    # 全局样式 (@import "tailwindcss")
  │   │       ├── App.tsx       # 动态加载 Remote 模块
  │   │       ├── layouts/      # 页面布局（shadcn/ui + Tailwind）
  │   │       └── pages/        # 页面组件
  │   │
  │   └── /service-xxx          # 剩余微服务（Go / Python / Next.js）
  │
  ├── /packages                 # --- 共享层 (多语言共享包) ---
  │   ├── /proto                # [Central Proto] 核心！所有 IDL 定义在此
  │   │   ├── chat.proto        # 聊天通讯协议
  │   │   ├── auth.proto        # SSO/用户协议
  │   │   └── common.proto      # 公共结构定义
  │   ├── /ui                   # [TS] 基于 shadcn/ui + Tailwind 4 的共享组件库
  │   │   ├── src/components/   # Button、Card、ErrorFallback 等 shadcn 组件
  │   │   ├── src/lib/utils.ts  # cn() 工具函数（clsx + tailwind-merge）
  │   │   └── src/styles.css    # Tailwind 4 CSS 变量主题配置
  │   ├── /mf-shared            # [TS] MF 共享依赖配置 & Runtime Plugins
  │   │   ├── shared.config.ts  # 统一的 shared 依赖版本声明
  │   │   └── plugins/          # 自定义 Runtime Plugins
  │   │       ├── auth-plugin.ts    # SSO Token 注入插件
  │   │       └── error-plugin.ts   # 远程模块加载失败降级处理
  │   ├── /eslint-config        # [TS] 全局前端规范（@antfu/eslint-config 封装）
  │   ├── /go-utils             # [Go] 共享的 Gin 中间件、数据库连接池、Log
  │   ├── /py-utils             # [Py] 共享的 FastAPI 依赖、AI 处理逻辑
  │   └── /scripts              # 全局自动化脚本（Bun 驱动，protoc 代码生成等）
  │
  ├── /infra                    # --- 基础设施层 ---
  │   ├── /docker               # 各服务的 Dockerfile 及 Compose
  │   ├── /k8s                  # Kubernetes 部署清单（中央集群部署）
  │   └── /nginx                # 全局反向代理配置 + MF manifest 路由
  └── go.work                   # Go Workspace（打通所有 Go 子项目）
```

---

### 三、 核心技术栈 (The Modern Stack)

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| **包管理 & 构建** | **Bun 1.3** + **Turborepo** | 全栈统一使用 Bun，速度快 3x+ |
| **前端框架** | **React 18** + **TypeScript 5.6** | 微前端各应用标准基础 |
| **构建工具** | **Rsbuild 1.x** (基于 Rspack) | 原生支持 MF 2.0，热更新极速 |
| **UI 组件** | **shadcn/ui** + **Tailwind 4** | CSS-first，无运行时，零额外包体积 |
| **图标** | **lucide-react** | 轻量 SVG 图标库 |
| **微前端** | **Module Federation 2.0** | 独立部署，共享依赖，类型安全 |
| **状态管理** | **Zustand 5** | 轻量全局状态 |
| **数据请求** | **@tanstack/react-query 5** | 服务端状态管理 |
| **路由** | **react-router-dom 6** | 客户端路由 |
| **代码规范** | **@antfu/eslint-config** | Flat Config，开箱即用的最佳实践 |
| **后端网关** | **Go + Gin** | 高性能中央 Hub |
| **AI 服务** | **Python 3.12 + FastAPI** | AI 编排与推理 |
| **通信协议** | **gRPC + Protobuf** | 跨语言强类型 RPC |
| **数据库** | **PostgreSQL 16** + **ClickHouse** | 业务数据 + 海量审计日志 |
| **缓存** | **Redis Cluster** | SSO Session + 全局配置 |

---

### 四、 微前端架构：Module Federation 2.0 详解

#### 1. 为什么选择 Module Federation 2.0？

| 对比项 | 无界 (Wujie) | Module Federation 2.0 |
|--------|-------------|------------------------|
| **隔离方式** | WebComponent + iframe | JS 沙箱 + 共享依赖 |
| **性能** | iframe 有额外开销 | 原生 JS 模块，零额外开销 |
| **共享依赖** | 需手动处理 | `shared` 配置自动去重 |
| **类型安全** | 无 | `dts` 自动生成/消费类型 |
| **构建工具** | Webpack 为主 | Rspack/Rsbuild 原生支持 |
| **运行时 API** | 有限 | `loadRemote` 动态加载 |
| **调试工具** | 无 | Chrome DevTool 插件 |

#### 2. Host 应用配置 (ai-platform-web)

```typescript
// apps/ai-platform-web/rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { sharedConfig, runtimePlugins } from '../../module-federation.config'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      remotes: {
        fixbuyAdmin: 'fixbuyAdmin@https://admin.antf.io/mf-manifest.json',
        aifootWeb: 'aifootWeb@https://aifoot.antf.io/mf-manifest.json',
      },
      shared: sharedConfig,
      runtimePlugins,
    }),
  ],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: ['@tailwindcss/postcss'],
      },
    },
  },
})
```

#### 3. Remote 应用配置 (fixbuy-admin)

```typescript
// apps/fixbuy-admin/rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { sharedConfig } from '../../module-federation.config'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'fixbuyAdmin',
      exposes: {
        './AssetList': './src/exposes/AssetList.tsx',
        './Dashboard': './src/exposes/Dashboard.tsx',
      },
      shared: sharedConfig,
      dts: {
        generateTypes: true,
      },
    }),
  ],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: ['@tailwindcss/postcss'],
      },
    },
  },
})
```

#### 4. 全局共享依赖配置 (module-federation.config.ts)

shadcn/ui 是 CSS-first 方案，组件代码随各应用各自打包，**无需** 作为 MF singleton 共享。
真正需要单例共享的是运行时状态相关的库：

```typescript
// module-federation.config.ts
export const sharedConfig = {
  react: { singleton: true, requiredVersion: '^18.3.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.3.0' },
  dayjs: { singleton: true },
  zustand: { singleton: true, requiredVersion: '^5.0.0' },
  '@tanstack/react-query': { singleton: true, requiredVersion: '^5.60.0' },
}
```

#### 5. Host 中动态加载 Remote 模块

```tsx
// apps/ai-platform-web/src/App.tsx
import { loadRemote } from '@module-federation/enhanced/runtime'
import { Suspense, lazy } from 'react'

const AssetList = lazy(() => import('fixbuyAdmin/AssetList'))

const loadDashboard = () => loadRemote<{ default: React.FC }>('fixbuyAdmin/Dashboard')

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
        <AssetList />
      </Suspense>
    </div>
  )
}
```

#### 6. SSO Token 注入 (Runtime Plugin)

```typescript
// packages/mf-shared/plugins/auth-plugin.ts
import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime'

const authPlugin: () => FederationRuntimePlugin = () => ({
  name: 'auth-plugin',
  beforeRequest(args) {
    const token = localStorage.getItem('sso_token')
    if (token) {
      args.options.headers = {
        ...args.options.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return args
  },
})

export default authPlugin
```

#### 7. 错误处理 & 降级 (Runtime Plugin)

```typescript
// packages/mf-shared/plugins/error-plugin.ts
import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime'

const errorPlugin: () => FederationRuntimePlugin = () => ({
  name: 'error-plugin',
  errorLoadRemote({ id, error }) {
    console.error(`[MF] Failed to load remote: ${id}`, error)
    return () => import('@fluxsum/ui/components/ErrorFallback')
  },
})

export default errorPlugin
```

---

### 五、 UI 组件库：shadcn/ui + Tailwind 4

#### 设计原则

shadcn/ui 不是传统 UI 库，而是**可复制的组件源码**。每个组件直接存在于 `packages/ui/src/components/`，完全可控、可定制。

```
packages/ui/
  ├── src/
  │   ├── components/       # shadcn 组件（Button、Card、Dialog 等）
  │   ├── lib/utils.ts      # cn() = clsx + tailwind-merge
  │   └── styles.css        # Tailwind 4 CSS 变量主题（Light + Dark）
  └── package.json
```

#### Tailwind 4 配置方式（CSS-first）

Tailwind 4 放弃了 `tailwind.config.js`，改为纯 CSS 配置：

```css
/* packages/ui/src/styles.css */
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --radius: 0.5rem;
  /* ... 其余 CSS 变量 */
}

.dark {
  --background: 222.2 84% 4.9%;
  /* ... dark mode 变量 */
}
```

#### 应用侧接入方式

```css
/* apps/ai-platform-web/src/styles.css */
@import "tailwindcss";
@import "@fluxsum/ui/styles.css";
```

```typescript
/* apps/ai-platform-web/rsbuild.config.ts */
tools: {
  postcss: {
    postcssOptions: {
      plugins: ['@tailwindcss/postcss'],
    },
  },
}
```

---

### 六、 代码规范：@antfu/eslint-config

使用 **ESLint Flat Config** 格式，由 `@antfu/eslint-config` 提供开箱即用的最佳实践：

```typescript
// eslint.config.ts（根目录）
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  react: true,
  ignores: ['**/dist/**', '**/es/**', '**/node_modules/**'],
})
```

各子包通过 `@fluxsum/eslint-config` 复用并扩展：

```typescript
// packages/eslint-config/index.ts
import antfu from '@antfu/eslint-config'

export function createConfig(options, ...userConfigs) {
  return antfu({ typescript: true, react: true, ...options }, ...userConfigs)
}
```

---

### 七、 深度技术栈：如何打通与管控？

#### 1. 多语言打通：Protobuf 驱动

- **方案**：在 `/packages/proto` 编写协议。

- **实现**：通过一个全局脚本，使用 `protoc` 同时生成 **TS**、**Go**、**Python** 的代码包。

- **效果**：Go 的网关调用 Python 的 AI 引擎时，直接像调用本地函数一样：`client.GetAIResponse(ctx, req)`。


#### 2. 中央 SSO 与单点登录

- **核心逻辑**：

    - **Hub Server** 充当 Identity Provider (IdP)。

    - **子应用 (Next.js/Python)** 启动时向 Hub 注册。

    - **鉴权流**：用户访问任一应用 -> 重定向至 Hub 登录 -> 返回 JWT/Cookie。

    - **无感验证**：在 Go 网关中使用自定义中间件校验 Token，通过后将 `UserID` 注入 Header 传给下游 Python 服务。


#### 3. 成本监控与 Token 审计 (ClickHouse 核心)

- **设计**：每个 AI 请求都会经过 Go 网关。

- **埋点**：网关在 Response 完成时，异步触发一个 `Event`。

- **落盘**：通过高性能的 `ClickHouse-Go` 驱动，将 `UserID`、`ModelID`、`InputTokens`、`OutputTokens` 批量打入 ClickHouse。

- **结果**：中央集群提供一个 `/admin/billing` 接口，一秒查询出 50 个项目中谁最费钱。


#### 4. 内容安全与 RAG 插件系统

- **安全审核**：在中央 Hub 侧挂载全局钩子，所有输入输出强制流经 Moderation 服务。

- **知识库 (RAG)**：

    - **存储**：PostgreSQL + `pgvector`（主存用户上传文档的向量）。

    - **检索**：Python 端使用 **LlamaIndex** 进行语义搜索。

- **插件执行**：采用 **MCP (Model Context Protocol)**。AI 生成一个查询请求，通过 Hub 转发给对应的微服务执行，返回结果再给 AI。


#### 5. 多级缓存策略

- **中央级缓存 (Redis Cluster)**：存储全局配置和 SSO Session。

- **边缘级缓存 (Cloudflare Workers)**：加速 R2 中的图片和视频。

- **语义缓存**：在 Python 端利用向量匹配，减少重复的 AI API 调用。


---

### 八、 架构优势总结

1. **Bun 1.3 的全速开发**：在 M4 Mac 上运行 `bun run dev`，Turborepo 会同时启动 Go、Python 和 Rsbuild 的热更新，速度比传统方案快 3x+。

2. **shadcn/ui + Tailwind 4 的 UI 优势**：
   - **零运行时**：纯 CSS 方案，无 CSS-in-JS 性能损耗
   - **完全可控**：组件源码直接在项目中，随意定制
   - **MF 友好**：无需作为 singleton 共享，各 Remote 应用独立包含样式
   - **Dark Mode 开箱即用**：CSS 变量驱动，一行切换主题

3. **Module Federation 2.0 的微前端优势**：
   - **独立部署**：各子应用可独立构建、独立上线，不影响主应用
   - **共享依赖**：`react`、`zustand` 等运行时库只加载一次
   - **类型安全**：跨应用调用有完整 TypeScript 提示
   - **运行时动态加载**：根据用户权限按需加载子应用

4. **ClickHouse 的成本追踪**：精确到"每分钱"，这在 2026 年是 AI 产品商业化成功的关键。


### 💡 架构搭建的第一步建议

1. **配置 Go Workspace (`go.work`)**：确保你的 Hub Server 能直接引用 `packages/go-utils`。
2. **配置 Bun Workspaces**：确保 `apps/ai-platform-web` 能找到 `packages/ui`。
3. **初始化 Module Federation**：先搭建 Host + 一个 Remote 的最小可用架构。
4. **定义第一个 `auth.proto`**：这是所有项目联动的开端。

<!-- 
------

## 🏗️ AntF-Global 项目全景总结

### 1. 核心技术栈 (The Modern Stack)

- **语言与运行环境**：**Bun 1.3** (前端 & 工具)、**Go** (高性能中央网关 & 计费)、**Python 3.12** (AI 编排 & 渲染)。
- **前端架构**：**Rsbuild + React 18** + **Module Federation 2.0** + **Tailwind 4.0** + **shadcn/ui**。
- **数据库层**：**PostgreSQL 16** (业务核心) + **ClickHouse** (海量审计/日志)。
- **通信协议**：**gRPC/Protobuf** (跨服务调用) + **Cloudflare Tunnel** (安全内网穿透)。

### 2. 数据库分治方案 (Scaling 1500+ Tables)

为了防止 1500 张表拖垮系统，采用 **"逻辑 Schema + 物理分库"** 模式：

- **中央库 (Central DB)**：存放 SSO 鉴权、用户主表、全局计费和套餐。
- **业务库 (App DBs)**：将 50 个子项目按领域（如 AI 类、金融类、预测类）分到 3-5 个物理库中，每个项目拥有独立的 **Schema**。
- **解耦手段**：子项目不使用跨库外键，通过 **UUID v7** 逻辑关联，利用 **JWT Payload** 透传常用用户信息。

### 3. 部署与算力架构 (Global & High Performance)

采用 **"异构混合云"**，追求极致性价比：

- **静态资源**：存放在 **Cloudflare R2**。**0 流量费**，全球 CDN 边缘加速（10ms 级别延迟）。
- **核心服务器**：租用 **Hetzner 物理机** (Ryzen 9 / 128G RAM)。性能远超同价位云服务器，支撑高 IO 数据库需求。
- **AI 推理**：接入 **RunPod/Lambda Labs** 的 GPU API。按需计费，规避昂贵的 GPU 硬件维护成本。
- **集群管理**：使用 **K3s (轻量级 K8s)** 配合 **Tailscale**。实现多台物理机（开发机 + 线上机）的高效组网与自动调度。

### 4. 商业闭环 (Income & Growth)

- **AI 视频**：模仿 MovieFlow 模式，通过"分镜编排"+"角色一致性 LoRA"生成长电影，降低渲染成本。
- **AI 音乐**：集成 **Fish Speech / MusicGen** 开源库，通过 API 对接 **DistroKid** 等分发商，打通"创作-发布-分润"链路。
- **成本控制**：本地 M4 打样 + 廉价云插帧 + 核心镜头顶级 API，将 60 分钟电影成本压至工业级最低。

------

## 🛠️ 下一步行动计划 (Action Plan)

1. **基础设施搭建**：
   - 在 **Hetzner** 拍卖区或 AX 系列租用第一台物理机。
   - 通过 **Cloudflare** 解析域名并开启 R2 桶。
2. **Monorepo 初始化**：
   - 建立 Turborepo 结构，配置共享的 `packages/ui` 和 `packages/database`。
3. **Cursor 开发接入**：
   - 将之前整理的 **"项目全景提示词"** 喂给 Cursor。
   - 优先开发 **中央 SSO 网关** 和 **数据库初始化脚本**。 -->
