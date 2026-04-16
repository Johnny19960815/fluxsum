# FluxSum 主项目重构方案

> 基于 lobehub (Next.js AI Chat) + new-api (Go API Gateway) 的深度分析，
> 重构为 **微前端 (Module Federation 2.0) + SSO 中央认证 + Go + Python** 架构。

---

## 一、架构总览

### 1.1 技术栈

| 层级 | 技术选型 | 职责 |
|------|---------|------|
| **微前端框架** | Module Federation 2.0 + Rsbuild | 主壳 Host + 子项目 Remote 动态加载 |
| **前端主壳 (main)** | Rsbuild + React 18 + Zustand + TanStack Query | MF Host，路由调度，全局布局，子项目集成 |
| **SSO 登录中心 (passport)** | Next.js 16 (App Router) + Better Auth | 独立登录/注册项目，单点登录，用户中心 |
| **运营后台 (admin)** | Next.js 16 (App Router) + Shadcn/Radix + TanStack Table | 运营管理系统 (MF Remote 或独立部署) |
| **AI Chat 子项目** | Next.js 16 (App Router) + Zustand + tRPC | AI 对话/Agent/知识库 (MF Remote) |
| **其他子项目** | 各自技术栈 (Rsbuild/Next.js/Vite) | 通过 MF Remote 接入主壳 |
| **中央网关 (Go)** | Gin + GORM + go-i18n + Redis | API 中转、模型代理、计费、渠道管理、SSO Token 验证 |
| **AI 服务 (Python)** | FastAPI + LangChain/LlamaIndex | RAG、向量检索、Agent 执行、工具运行时 |
| **数据库** | PostgreSQL (主库) + 分离的 Log DB | 全量业务数据 |
| **缓存** | Redis | 会话、Token 缓存、速率限制、渠道选择 |
| **对象存储** | S3 兼容 (阿里云 OSS / Cloudflare R2) | 文件、头像、翻译资源 CDN |
| **消息队列** | Redis Streams / BullMQ | 异步任务：翻译、文件处理、定时任务 |
| **认证** | Better Auth (SSO) + JWT (Go/Python/子项目) | 全平台单点登录 |
| **通信协议** | tRPC (子项目↔BFF)、gRPC/REST (BFF↔Go↔Python) | 类型安全的跨服务调用 |
| **基础设施** | Docker + K8s + Turborepo | 容器化部署、Monorepo 管理 |

### 1.2 整体架构图 — 微前端 + SSO + 中央集群

```
┌───────────────────────────────────────────────────────────────────────────┐
│                              用户浏览器                                    │
│                                                                           │
│  ┌───────────────────────────────────────────────────────────────────┐    │
│  │                    apps/main (MF Host 主壳)                       │    │
│  │  ┌─────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐          │    │
│  │  │ AI Chat  │ │ FixBuy    │ │ AIFoot    │ │ 未来子项目  │ ← Remote │    │
│  │  │ (Remote) │ │ (Remote)  │ │ (Remote)  │ │ (Remote)  │          │    │
│  │  └─────────┘ └───────────┘ └───────────┘ └───────────┘          │    │
│  │  ┌──────────────────────────────────────────────┐                │    │
│  │  │ 全局：路由分发 / 布局 / 导航 / 权限守卫 / i18n  │                │    │
│  │  └──────────────────────────────────────────────┘                │    │
│  └──────────┬────────────────────────────────────────────────────────┘    │
│             │                                                             │
│  ┌──────────▼──────────────────┐  ┌────────────────────────────────┐     │
│  │ apps/passport (SSO 登录中心) │  │ apps/admin (运营后台)           │     │
│  │ 登录 / 注册 / OAuth / 2FA   │  │ 独立部署，或作为 MF Remote      │     │
│  │ 用户中心 / 个人设置          │  └────────────────────────────────┘     │
│  └──────────┬──────────────────┘                                         │
└─────────────┼────────────────────────────────────────────────────────────┘
              │
  ┌───────────▼───────────────────────────────────────────────────┐
  │                    中央服务集群 (Backend)                       │
  │                                                                │
  │  ┌────────────────────┐  ┌──────────────┐  ┌──────────────┐  │
  │  │  Go API Gateway    │  │  Python AI   │  │  SSO Token   │  │
  │  │  (apps/gateway)    │  │  Service     │  │  Validator   │  │
  │  │                    │  │              │  │  (Go 内置)    │  │
  │  │  • 模型代理/中转    │  │  • RAG 引擎  │  │              │  │
  │  │  • 渠道管理        │  │  • Agent 运行 │  │  验证 JWT     │  │
  │  │  • 计费/额度       │  │  • 向量检索   │  │  权限校验     │  │
  │  │  • Token 管理      │  │  • 工具执行   │  │  用户信息缓存  │  │
  │  │  • 订阅/支付       │  │  • 文件解析   │  │              │  │
  │  │  • 速率限制        │  │  • 记忆系统   │  │              │  │
  │  │  • 用户CRUD        │  │              │  │              │  │
  │  └────────┬───────────┘  └──────┬───────┘  └──────────────┘  │
  │           │                      │                             │
  │    ┌──────▼──────────────────────▼─────────────────────────┐  │
  │    │      PostgreSQL + Redis + S3/OSS + Vector DB          │  │
  │    └───────────────────────────────────────────────────────┘  │
  └────────────────────────────────────────────────────────────────┘
```

### 1.3 微前端分层说明

| 层级 | 项目 | 部署形态 | 说明 |
|------|------|---------|------|
| **MF Host (主壳)** | `apps/main` | 独立部署 `https://app.fluxsum.com` | 全局路由、布局、导航、SSO 守卫、MF runtime |
| **SSO 登录中心** | `apps/passport` | 独立部署 `https://passport.fluxsum.com` | 登录/注册/OAuth/2FA/用户中心，签发 JWT |
| **MF Remote (AI Chat)** | `apps/ai-chat` | 独立部署，Host 动态加载 | AI 对话、Agent、知识库 |
| **MF Remote (Admin)** | `apps/admin` | 独立部署 `https://admin.fluxsum.com` | 运营后台，可独立访问也可嵌入 Host |
| **MF Remote (子项目 N)** | `apps/xxx` | 独立部署，Host 动态加载 | 未来的业务子项目 |
| **Go API Gateway** | `apps/gateway` | 集群部署 | 中央 API 网关 |
| **Python AI Service** | `apps/ai-service` | 集群部署 | AI 专项服务 |

### 1.4 职责边界 (参考 lobehub + new-api 拆分)

| 来源模块 | 重构归属 | 说明 |
|---------|---------|------|
| lobehub `src/app/` (SPA shell) | **apps/main** (MF Host) | 主壳全局布局 + 路由调度 |
| lobehub `src/app/[variants]/(auth)/` | **apps/passport** (SSO) | 认证页面独立为 SSO 项目 |
| lobehub `src/routes/` (React Router) | **apps/ai-chat** (MF Remote) | AI 功能迁移为独立子项目 |
| lobehub `src/server/routers/` (tRPC) | **apps/ai-chat** 内的 BFF | 保留 tRPC，后端调 Go/Python |
| lobehub `src/server/modules/AgentRuntime` | **apps/ai-service** (Python) | Agent 执行引擎迁移到 Python |
| lobehub `src/server/modules/ModelRuntime` | **apps/gateway** (Go) | 模型调用走 Go 中转 |
| lobehub `packages/database/` (Drizzle) | **apps/gateway** (Go GORM) | 主数据模型迁移到 Go 管理 |
| lobehub `packages/context-engine/` | **apps/ai-service** (Python) | 上下文引擎迁移 |
| new-api `relay/` | **apps/gateway** (Go) | 完整保留模型代理/中转系统 |
| new-api `controller/` + `model/` | **apps/gateway** (Go) | 渠道、Token、计费、订阅 |
| new-api `web2/` | **apps/admin** (Next.js) | 用 Next.js 重写运营后台 |

---

## 一-A、微前端架构详细设计

### 1A.1 Module Federation 2.0 架构

当前项目已使用 MF 2.0，`apps/main` 作为 Host 加载 `fixbuyAdmin` 和 `aifootWeb` 两个 Remote。
重构后扩展为完整的微前端体系：

```
apps/main (Host)
├── 自身页面：首页、全局设置、公告
├── MF Remote 注册表 (动态发现)
│   ├── ai-chat     → https://chat.fluxsum.com/mf-manifest.json
│   ├── fixbuyAdmin → https://admin.antf.io/mf-manifest.json
│   ├── aifootWeb   → https://aifoot.antf.io/mf-manifest.json
│   ├── admin       → https://admin.fluxsum.com/mf-manifest.json (可选嵌入)
│   └── ...未来子项目
├── 全局 Provider
│   ├── AuthProvider (SSO Token 管理)
│   ├── QueryClientProvider (TanStack Query)
│   ├── I18nProvider (多语言)
│   ├── ThemeProvider (主题)
│   └── NotificationProvider (全局通知)
└── 全局布局
    ├── Sidebar (导航，根据权限 + 注册表动态渲染)
    ├── Header (用户头像/通知/语言切换)
    └── Content (Outlet / MF Remote 渲染区)
```

### 1A.2 MF Host 配置 (apps/main)

#### Rsbuild 配置 — 动态 Remote 注册

```typescript
// apps/main/rsbuild.config.ts
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { sharedConfig, runtimePlugins } from '@fluxsum/mf-shared';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      // 静态 Remote（编译时已知的子项目）
      remotes: {
        fixbuyAdmin: 'fixbuyAdmin@https://admin.antf.io/mf-manifest.json',
        aifootWeb: 'aifootWeb@https://aifoot.antf.io/mf-manifest.json',
      },
      shared: {
        ...sharedConfig,
        // SSO 相关共享
        '@fluxsum/auth-sdk': { singleton: true },
        '@fluxsum/i18n': { singleton: true },
      },
      runtimePlugins,
    }),
  ],
});
```

#### 动态 Remote 加载机制

子项目可以在**运行时**通过 MF 2.0 的 `loadRemote()` 动态加载，不需要在编译时写死：

```typescript
// apps/main/src/lib/remote-registry.ts
import { registerRemotes, loadRemote } from '@module-federation/enhanced/runtime';

export interface RemoteAppConfig {
  name: string;             // MF name，如 'aiChat'
  entry: string;            // manifest URL
  routePrefix: string;      // 路由前缀，如 '/chat'
  displayName: string;      // 显示名称
  icon: string;             // 导航图标
  requiredRoles?: string[]; // 需要的角色
  enabled: boolean;
}

// 从 Go API 获取已注册的子项目列表
export async function fetchRemoteRegistry(): Promise<RemoteAppConfig[]> {
  const res = await fetch('/api/remote-registry', {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

// 动态注册 Remote
export async function initRemotes(apps: RemoteAppConfig[]) {
  const remotes = apps
    .filter((app) => app.enabled)
    .map((app) => ({
      name: app.name,
      entry: app.entry,
    }));

  registerRemotes(remotes, { force: true });
}

// 动态加载某个 Remote 的组件
export async function loadRemoteComponent(
  remoteName: string,
  componentPath: string,
) {
  return loadRemote(`${remoteName}/${componentPath}`);
}
```

#### Host 路由 — 静态 + 动态混合

```tsx
// apps/main/src/App.tsx
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthGuard from './components/AuthGuard';
import RemoteLoader from './components/RemoteLoader';
import {
  fetchRemoteRegistry,
  initRemotes,
  type RemoteAppConfig,
} from './lib/remote-registry';

const Home = lazy(() => import('./pages/Home'));

function App() {
  const [remoteApps, setRemoteApps] = useState<RemoteAppConfig[]>([]);

  useEffect(() => {
    fetchRemoteRegistry().then((apps) => {
      initRemotes(apps);
      setRemoteApps(apps);
    });
  }, []);

  return (
    <AuthGuard>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout remoteApps={remoteApps} />}>
            <Route index element={<Home />} />
            {/* 动态生成的子项目路由 */}
            {remoteApps.map((app) => (
              <Route
                key={app.name}
                path={`${app.routePrefix}/*`}
                element={
                  <RemoteLoader
                    remoteName={app.name}
                    componentPath="App"
                    fallback={<div>加载 {app.displayName} 中...</div>}
                  />
                }
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </AuthGuard>
  );
}
```

#### RemoteLoader 组件

```tsx
// apps/main/src/components/RemoteLoader.tsx
import React, { Suspense, lazy, useMemo } from 'react';
import { loadRemoteComponent } from '../lib/remote-registry';

interface RemoteLoaderProps {
  remoteName: string;
  componentPath: string;
  fallback?: React.ReactNode;
}

export default function RemoteLoader({
  remoteName,
  componentPath,
  fallback,
}: RemoteLoaderProps) {
  const Component = useMemo(
    () =>
      lazy(async () => {
        const mod = await loadRemoteComponent(remoteName, componentPath);
        return { default: mod.default || mod };
      }),
    [remoteName, componentPath],
  );

  return (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
```

### 1A.3 子项目 Remote 接入规范

每个子项目作为 MF Remote 需要遵循以下规范：

#### 目录结构

```
apps/ai-chat/                      ← 某个子项目
├── src/
│   ├── App.tsx                    ← 必须导出的根组件（MF expose）
│   ├── bootstrap.tsx              ← 独立运行入口
│   ├── index.tsx                  ← import('./bootstrap')
│   ├── app/                       ← 子项目内部路由 (如果是 Next.js)
│   ├── components/
│   ├── store/
│   └── services/
├── rsbuild.config.ts              ← MF Remote 配置
│   或 next.config.ts              ← 如果子项目是 Next.js
└── package.json
```

#### MF Remote 配置示例 (Rsbuild)

```typescript
// apps/ai-chat/rsbuild.config.ts
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { sharedConfig, runtimePlugins } from '@fluxsum/mf-shared';

export default defineConfig({
  plugins: [
    pluginModuleFederation({
      name: 'aiChat',
      exposes: {
        './App': './src/App.tsx',           // 主入口（必须）
        './ChatPanel': './src/features/ChatPanel.tsx', // 可选：独立组件
      },
      shared: {
        ...sharedConfig,
        '@fluxsum/auth-sdk': { singleton: true },
        '@fluxsum/i18n': { singleton: true },
      },
      runtimePlugins,
    }),
  ],
});
```

#### 子项目根组件约定

```tsx
// apps/ai-chat/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@fluxsum/auth-sdk';

export default function AiChatApp() {
  const { user } = useAuth();

  // 子项目内部路由（相对于 Host 分配的 routePrefix）
  return (
    <Routes>
      <Route index element={<ChatHome />} />
      <Route path="agent/:id" element={<AgentDetail />} />
      <Route path="resource" element={<KnowledgeBase />} />
      <Route path="settings" element={<ChatSettings />} />
    </Routes>
  );
}
```

#### 子项目接入清单

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 配置 MF Remote `exposes` | 至少导出 `./App` |
| 2 | 使用 `@fluxsum/mf-shared` 共享配置 | 保证 React/Zustand 单例 |
| 3 | 使用 `@fluxsum/auth-sdk` 获取用户信息 | 不要自己管理登录态 |
| 4 | 使用 `@fluxsum/i18n` 多语言 | 统一翻译体系 |
| 5 | 部署后输出 `mf-manifest.json` | Host 通过 manifest 发现 |
| 6 | 在 Go API 注册 Remote App | 添加到 `remote_apps` 表 |
| 7 | 独立运行入口 (bootstrap.tsx) | 子项目可以脱离 Host 独立运行调试 |

---

## 一-B、SSO 单点登录中心详细设计

### 1B.1 为什么需要独立的 SSO

| 场景 | 说明 |
|------|------|
| 多子项目共享登录态 | AI Chat、FixBuy、AIFoot... 不需要每个项目都做登录 |
| 统一用户管理 | 用户注册/信息/设置在一个地方管理 |
| 跨域 Token 传递 | 子项目部署在不同域名，需要统一的 Token 机制 |
| 第三方 OAuth 集中管理 | GitHub/Google/WeChat 等 OAuth 只需配置一次 |
| 安全审计 | 登录日志、设备管理、异常告警集中处理 |

### 1B.2 SSO 认证流程

```
用户访问 app.fluxsum.com/chat
          │
          ▼
    ┌─ Host AuthGuard 检查 ─┐
    │  localStorage 有       │  localStorage 无
    │  sso_token?            │  sso_token?
    │                        │
    ▼                        ▼
  验证 Token           重定向到 SSO 登录页
  (Go API 校验)        passport.fluxsum.com/signin
    │                     ?redirect_uri=app.fluxsum.com/chat
    │ 有效    │ 过期/无效       │
    ▼         ▼               ▼
  放行      刷新 Token     用户登录 (密码/OAuth/Passkey)
  进入页面  或重定向SSO         │
                              ▼
                        SSO 签发 JWT
                        Set-Cookie (HttpOnly, passport 域)
                              │
                              ▼
                        回调 redirect_uri
                        附带 code (Authorization Code)
                              │
                              ▼
                        Host 用 code 换 Token
                        (调 Go API /auth/token)
                              │
                              ▼
                        存储 sso_token → localStorage
                        存储 refresh_token → HttpOnly Cookie
                              │
                              ▼
                        进入目标页面
```

### 1B.3 SSO 项目 (apps/passport) 详细设计

#### 项目结构

```
apps/passport/                        ★ SSO 登录中心 (Next.js 16)
├── src/
│   ├── app/
│   │   ├── layout.tsx               根布局（全局样式 + i18n）
│   │   ├── (auth)/                  认证流程页面
│   │   │   ├── signin/
│   │   │   │   └── page.tsx         登录页
│   │   │   ├── signup/
│   │   │   │   └── page.tsx         注册页
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx         忘记密码
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx         重置密码
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx         邮箱验证
│   │   │   ├── 2fa/
│   │   │   │   └── page.tsx         两步验证
│   │   │   ├── oauth/
│   │   │   │   ├── callback/        OAuth 回调
│   │   │   │   └── consent/[uid]/   授权同意页
│   │   │   └── layout.tsx           认证页面公共布局
│   │   ├── (user)/                  用户中心页面
│   │   │   ├── profile/
│   │   │   │   └── page.tsx         个人资料
│   │   │   ├── security/
│   │   │   │   └── page.tsx         安全设置 (密码/2FA/Passkey)
│   │   │   ├── sessions/
│   │   │   │   └── page.tsx         登录设备管理
│   │   │   ├── linked-accounts/
│   │   │   │   └── page.tsx         绑定的第三方账号
│   │   │   ├── preferences/
│   │   │   │   └── page.tsx         偏好设置 (语言/主题/通知)
│   │   │   ├── subscription/
│   │   │   │   └── page.tsx         订阅与账单
│   │   │   ├── api-keys/
│   │   │   │   └── page.tsx         API 密钥管理
│   │   │   └── layout.tsx           用户中心公共布局
│   │   └── api/
│   │       ├── auth/[...all]/       Better Auth API Handler
│   │       └── sso/
│   │           ├── authorize/        SSO 授权端点
│   │           ├── token/            Token 签发/刷新
│   │           ├── userinfo/         用户信息端点
│   │           └── logout/           统一登出
│   ├── lib/
│   │   ├── auth.ts                  Better Auth 配置
│   │   ├── jwt.ts                   JWT 签发/验证工具
│   │   └── oauth-providers.ts       OAuth Provider 配置
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── OAuthButtons.tsx
│   │   ├── TwoFactorInput.tsx
│   │   └── UserMenu.tsx
│   └── locales/
├── locales/                         翻译文件
└── package.json
```

#### SSO API 端点设计

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/sso/authorize` | GET | SSO 授权入口，检查登录态，未登录跳转 `/signin` |
| `/api/sso/token` | POST | 用 authorization_code 换取 access_token + refresh_token |
| `/api/sso/token/refresh` | POST | 刷新过期的 access_token |
| `/api/sso/userinfo` | GET | 获取当前用户信息 (头像/昵称/角色/权限) |
| `/api/sso/logout` | POST | 统一登出，清除所有端的 session |
| `/api/sso/validate` | POST | 验证 access_token 有效性（Go API 调用） |
| `/api/auth/[...all]` | ALL | Better Auth 内置路由 (密码/OAuth/Passkey/2FA) |

#### JWT Token 结构

```typescript
interface SSOAccessToken {
  // Standard JWT claims
  sub: string;            // 用户 ID
  iss: string;            // 签发者 'passport.fluxsum.com'
  aud: string[];          // 受众 ['app.fluxsum.com', 'admin.fluxsum.com']
  exp: number;            // 过期时间（15 分钟）
  iat: number;            // 签发时间

  // FluxSum 自定义 claims
  username: string;
  display_name: string;
  email: string;
  avatar_url: string;
  role: number;           // 0=guest, 1=user, 10=admin, 100=root
  group: string;          // 用户分组
  permissions: string[];  // RBAC 权限码
  locale: string;         // 语言偏好
}

interface SSORefreshToken {
  sub: string;
  jti: string;            // Token ID，用于吊销
  exp: number;            // 过期时间（30 天）
  device_id: string;      // 设备标识
}
```

### 1B.4 Auth SDK — 子项目认证接入包

为所有子项目提供统一的认证接入 SDK：

```
packages/auth-sdk/
├── src/
│   ├── index.ts           导出所有 API
│   ├── provider.tsx       AuthProvider React 上下文
│   ├── hooks.ts           useAuth / useUser / usePermission
│   ├── token.ts           Token 存储/刷新/自动续期
│   ├── guard.tsx          AuthGuard / RoleGuard / PermissionGuard
│   ├── api.ts             SSO API 调用封装
│   └── types.ts           类型定义
└── package.json
```

#### AuthProvider

```tsx
// packages/auth-sdk/src/provider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { TokenManager } from './token';
import { SSOApi } from './api';
import type { SSOUser } from './types';

interface AuthContextValue {
  user: SSOUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (redirectUri?: string) => void;
  logout: () => Promise<void>;
  getToken: () => string | null;
  hasPermission: (code: string) => boolean;
  hasRole: (minRole: number) => boolean;
}

const AuthContext = createContext<AuthContextValue>(null!);

export function AuthProvider({
  ssoUrl,          // passport.fluxsum.com
  children,
}: {
  ssoUrl: string;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<SSOUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenManager = new TokenManager();
  const ssoApi = new SSOApi(ssoUrl);

  useEffect(() => {
    // 1. 检查 URL 中的 authorization_code
    const code = new URL(window.location.href).searchParams.get('sso_code');
    if (code) {
      ssoApi.exchangeToken(code).then((tokens) => {
        tokenManager.setTokens(tokens);
        window.history.replaceState({}, '', window.location.pathname);
        loadUser();
      });
      return;
    }

    // 2. 检查现有 Token
    if (tokenManager.hasValidToken()) {
      loadUser();
    } else if (tokenManager.hasRefreshToken()) {
      tokenManager.refresh(ssoApi).then(() => loadUser());
    } else {
      setIsLoading(false);
    }
  }, []);

  async function loadUser() {
    try {
      const userInfo = await ssoApi.getUserInfo(tokenManager.getAccessToken()!);
      setUser(userInfo);
    } catch {
      tokenManager.clear();
    } finally {
      setIsLoading(false);
    }
  }

  function login(redirectUri?: string) {
    const target = redirectUri || window.location.href;
    window.location.href =
      `${ssoUrl}/api/sso/authorize?redirect_uri=${encodeURIComponent(target)}`;
  }

  async function logout() {
    await ssoApi.logout(tokenManager.getAccessToken()!);
    tokenManager.clear();
    setUser(null);
    window.location.href = `${ssoUrl}/signin`;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        getToken: () => tokenManager.getAccessToken(),
        hasPermission: (code) => user?.permissions.includes(code) ?? false,
        hasRole: (minRole) => (user?.role ?? 0) >= minRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useUser = () => useAuth().user;
```

#### Token 管理器

```typescript
// packages/auth-sdk/src/token.ts
export class TokenManager {
  private readonly ACCESS_KEY = 'sso_token';
  private readonly REFRESH_KEY = 'sso_refresh';
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now() + 30_000; // 30s buffer
  }

  hasRefreshToken(): boolean {
    return !!localStorage.getItem(this.REFRESH_KEY);
  }

  setTokens(tokens: { access_token: string; refresh_token: string; expires_in: number }) {
    localStorage.setItem(this.ACCESS_KEY, tokens.access_token);
    localStorage.setItem(this.REFRESH_KEY, tokens.refresh_token);
    this.scheduleRefresh(tokens.expires_in);
  }

  // 在过期前 60 秒自动刷新
  private scheduleRefresh(expiresIn: number) {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    const refreshAt = (expiresIn - 60) * 1000;
    this.refreshTimer = setTimeout(() => {
      this.refresh(new (require('./api').SSOApi)());
    }, refreshAt);
  }

  async refresh(api: import('./api').SSOApi) {
    const refreshToken = localStorage.getItem(this.REFRESH_KEY);
    if (!refreshToken) throw new Error('No refresh token');
    const tokens = await api.refreshToken(refreshToken);
    this.setTokens(tokens);
  }

  clear() {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
  }
}
```

#### 权限守卫组件

```tsx
// packages/auth-sdk/src/guard.tsx
import { useAuth } from './provider';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) {
    login();
    return <LoadingSpinner />;
  }
  return <>{children}</>;
}

export function RoleGuard({
  minRole,
  fallback,
  children,
}: {
  minRole: number;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { hasRole } = useAuth();
  if (!hasRole(minRole)) return fallback ?? <Forbidden />;
  return <>{children}</>;
}

export function PermissionGuard({
  code,
  fallback,
  children,
}: {
  code: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { hasPermission } = useAuth();
  if (!hasPermission(code)) return fallback ?? null;
  return <>{children}</>;
}
```

### 1B.5 Go API Gateway — SSO Token 验证

```go
// apps/gateway/middleware/sso_auth.go
package middleware

import (
    "strings"
    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

type SSOClaims struct {
    Username    string   `json:"username"`
    DisplayName string   `json:"display_name"`
    Email       string   `json:"email"`
    Role        int      `json:"role"`
    Group       string   `json:"group"`
    Permissions []string `json:"permissions"`
    jwt.RegisteredClaims
}

func SSOAuth(jwtSecret []byte) gin.HandlerFunc {
    return func(c *gin.Context) {
        auth := c.GetHeader("Authorization")
        if !strings.HasPrefix(auth, "Bearer ") {
            c.AbortWithStatusJSON(401, gin.H{"error": "missing token"})
            return
        }
        tokenStr := auth[7:]

        claims := &SSOClaims{}
        token, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (any, error) {
            return jwtSecret, nil
        })
        if err != nil || !token.Valid {
            c.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
            return
        }

        c.Set("user_id", claims.Subject)
        c.Set("username", claims.Username)
        c.Set("role", claims.Role)
        c.Set("group", claims.Group)
        c.Set("permissions", claims.Permissions)
        c.Next()
    }
}

func RequireRole(minRole int) gin.HandlerFunc {
    return func(c *gin.Context) {
        role, _ := c.Get("role")
        if role.(int) < minRole {
            c.AbortWithStatusJSON(403, gin.H{"error": "forbidden"})
            return
        }
        c.Next()
    }
}

func RequirePermission(code string) gin.HandlerFunc {
    return func(c *gin.Context) {
        perms, _ := c.Get("permissions")
        for _, p := range perms.([]string) {
            if p == code { c.Next(); return }
        }
        c.AbortWithStatusJSON(403, gin.H{"error": "forbidden"})
    }
}
```

### 1B.6 SSO 用户中心功能

| 页面 | 路径 | 功能 |
|------|------|------|
| 个人资料 | `/profile` | 头像、昵称、简介、邮箱 |
| 安全设置 | `/security` | 修改密码、2FA 设置、Passkey 管理 |
| 登录设备 | `/sessions` | 查看所有活跃 session，远程注销 |
| 绑定账号 | `/linked-accounts` | GitHub/Google/WeChat 绑定/解绑 |
| 偏好设置 | `/preferences` | 语言、主题、通知偏好 |
| 订阅账单 | `/subscription` | 当前计划、用量、账单历史 |
| API 密钥 | `/api-keys` | sk-* Token 创建/管理/额度 |

用户中心页面可以在 `passport.fluxsum.com` 独立访问，
也可以在 Host 壳中通过 `<iframe>` 或 MF Remote 方式嵌入。

### 1B.7 用户数据同步到子项目

子项目**不直接读写 users 表**。通过以下方式获取用户数据：

```
子项目 → @fluxsum/auth-sdk useAuth() → JWT Claims (内存)
                                         ↑
                                    access_token 中已包含
                                    username/role/group/permissions

子项目 → @fluxsum/auth-sdk useUser() → 缓存的完整用户信息
                                         ↑
                                    /api/sso/userinfo 获取
                                    (头像/订阅/额度 等动态数据)

子项目需要写用户相关数据 → 调用 Go API（带 Bearer token）
                          Go API 解析 JWT 获取 user_id
```

### 1B.8 数据模型扩展 — Remote App 注册表

在 Go API 中新增：

```go
// apps/gateway/model/remote_app.go
type RemoteApp struct {
    Id           int    `json:"id" gorm:"primaryKey"`
    Name         string `json:"name" gorm:"uniqueIndex;type:varchar(64)"`    // MF name
    Entry        string `json:"entry" gorm:"type:varchar(512)"`              // manifest URL
    RoutePrefix  string `json:"route_prefix" gorm:"type:varchar(64)"`        // /chat
    DisplayName  string `json:"display_name" gorm:"type:varchar(128)"`       // AI 对话
    Icon         string `json:"icon" gorm:"type:varchar(64)"`                // lucide icon name
    Description  string `json:"description" gorm:"type:text"`
    RequiredRole int    `json:"required_role" gorm:"default:0"`              // 最低角色要求
    SortOrder    int    `json:"sort_order" gorm:"default:0"`
    Enabled      bool   `json:"enabled" gorm:"default:true"`
    Version      string `json:"version" gorm:"type:varchar(32)"`
    CreatedAt    int64  `json:"created_at" gorm:"bigint"`
    UpdatedAt    int64  `json:"updated_at" gorm:"bigint"`
}
```

| API | 方法 | 说明 |
|-----|------|------|
| `/api/remote-registry` | GET | 获取当前用户可见的 Remote App 列表 (按角色过滤) |
| `/api/admin/remote-apps` | GET | Admin: 所有 Remote App 列表 |
| `/api/admin/remote-apps` | POST | Admin: 注册新的 Remote App |
| `/api/admin/remote-apps/:id` | PUT | Admin: 更新 Remote App 配置 |
| `/api/admin/remote-apps/:id` | DELETE | Admin: 删除 Remote App |

### 1B.9 MF auth-plugin 与 SSO 集成

更新现有的 auth-plugin，使其从 `@fluxsum/auth-sdk` 获取 Token：

```typescript
// packages/mf-shared/src/plugins/auth-plugin.ts
import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

const authPlugin: () => FederationRuntimePlugin = () => ({
  name: 'auth-plugin',
  beforeRequest(args) {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('sso_token')
      : null;
    if (token && args.options) {
      args.options.headers = {
        ...args.options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return args;
  },
});

export default authPlugin;
```

---

## 一-C、跨子项目通信机制

### 1C.1 通信方式矩阵

| 场景 | 方式 | 说明 |
|------|------|------|
| Host ↔ Remote 组件间 | **Zustand 共享 Store** | 通过 MF singleton 共享 zustand 实例 |
| Host → Remote 传参 | **Props 透传** | Host 渲染 Remote 时传入 props |
| Remote → Host 事件 | **CustomEvent** | `window.dispatchEvent(new CustomEvent('fluxsum:xxx'))` |
| Remote ↔ Remote | **EventBus / BroadcastChannel** | 解耦的跨 Remote 通信 |
| 全局状态 | **@fluxsum/auth-sdk** | 用户信息/Token/权限 |
| 服务端数据 | **Go API (REST)** | 所有子项目统一调用中央 API |

### 1C.2 共享 Store (Host 提供，子项目消费)

```typescript
// packages/mf-shared/src/stores/global-store.ts
import { create } from 'zustand';

interface GlobalState {
  sidebarCollapsed: boolean;
  currentLocale: string;
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
  toggleSidebar: () => void;
  setLocale: (locale: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (n: Notification) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  sidebarCollapsed: false,
  currentLocale: 'zh-CN',
  theme: 'system',
  notifications: [],
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setLocale: (locale) => set({ currentLocale: locale }),
  setTheme: (theme) => set({ theme }),
  addNotification: (n) =>
    set((s) => ({ notifications: [...s.notifications, n] })),
}));
```

### 1C.3 EventBus (跨 Remote 解耦通信)

```typescript
// packages/mf-shared/src/event-bus.ts
type EventHandler = (data: any) => void;

class FluxsumEventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  on(event: string, handler: EventHandler) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.handlers.get(event)?.delete(handler);
  }

  emit(event: string, data?: any) {
    this.handlers.get(event)?.forEach((h) => h(data));
    // 同时广播到 BroadcastChannel（跨 tab）
    this.channel?.postMessage({ event, data });
  }

  private channel =
    typeof BroadcastChannel !== 'undefined'
      ? new BroadcastChannel('fluxsum')
      : null;

  constructor() {
    this.channel?.addEventListener('message', (e) => {
      this.handlers.get(e.data.event)?.forEach((h) => h(e.data.data));
    });
  }
}

export const eventBus = new FluxsumEventBus();
```

---

## 二、数据模型设计 (合并 lobehub + new-api)

### 2.1 核心实体 (来自两个项目的合并)

#### 用户与认证

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `users` | lobehub + new-api 合并 | id, username, email, password_hash, display_name, avatar, role, status, group, quota, used_quota, stripe_customer, setting(JSON), preference(JSON), aff_code |
| `auth_sessions` | Better Auth | id, token, user_id, expires_at, ip_address, user_agent |
| `accounts` | Better Auth | id, user_id, provider_id, account_id, OAuth tokens |
| `passkey` | Better Auth | id, user_id, credential_id, public_key |
| `two_factor` | Better Auth | id, user_id, secret, backup_codes |
| `user_oauth_bindings` | new-api | id, user_id, provider, external_id |
| `rbac_roles` | lobehub + new-api | id, name, is_system |
| `rbac_permissions` | lobehub | id, code, category |
| `rbac_role_permissions` | lobehub | role_id, permission_id |
| `rbac_user_roles` | lobehub | user_id, role_id, expires_at |

#### 对话与消息

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `session_groups` | lobehub | id, name, user_id, sort_order |
| `sessions` | lobehub | id, slug, title, type(agent/group), user_id, group_id, pinned |
| `topics` | lobehub | id, session_id, user_id, agent_id, title, metadata |
| `threads` | lobehub | id, topic_id, user_id, type, status, parent_thread_id |
| `messages` | lobehub | id, role, content, user_id, session_id, topic_id, thread_id, agent_id, model, provider, tokens |
| `message_plugins` | lobehub | id(=message_id), tool_call_id, api_name, arguments, content |
| `message_files` | lobehub | file_id, message_id |
| `chat_groups` | lobehub | id, user_id, config(JSON) |
| `chat_groups_agents` | lobehub | chat_group_id, agent_id, role, order |

#### Agent 系统

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `agents` | lobehub | id, user_id, slug, chat_config, agency_config, plugins, tts, model, provider, system_role |
| `agents_knowledge_bases` | lobehub | agent_id, knowledge_base_id, enabled |
| `agents_files` | lobehub | file_id, agent_id |
| `agent_skills` | lobehub | id, user_id, identifier, source |
| `agent_cron_jobs` | lobehub | id, agent_id, user_id, cron_pattern, status |
| `agent_eval_benchmarks` | lobehub | id, identifier, rubrics |
| `agent_eval_datasets` | lobehub | id, benchmark_id, eval_mode |
| `agent_eval_test_cases` | lobehub | id, dataset_id, content |
| `agent_eval_runs` | lobehub | id, dataset_id, target_agent_id, status, metrics |

#### 知识库与 RAG

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `knowledge_bases` | lobehub | id, user_id, name, type, is_public, settings |
| `documents` | lobehub | id, user_id, source_type, source, file_id, knowledge_base_id |
| `chunks` | lobehub | id, text, metadata |
| `embeddings` | lobehub | id, chunk_id, embeddings(vector 1024), model |
| `global_files` | lobehub | hash_id, url, size (去重存储) |
| `files` | lobehub | id, user_id, file_hash, name, type, size |

#### 模型中转与渠道 (来自 new-api)

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `channels` | new-api | id, type, key, name, base_url, models, group, weight, priority, status, balance, model_mapping, setting |
| `tokens` | new-api | id, user_id, key(sk-*), name, status, remain_quota, model_limits, allow_ips, group |
| `abilities` | new-api | group, model, channel_id, enabled, priority, weight |
| `logs` | new-api | id, user_id, type, model_name, prompt_tokens, completion_tokens, quota, channel_id, request_id, ip |

#### 计费与订阅 (来自 new-api)

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `subscription_plans` | new-api | id, title, price_amount, currency, duration, quota, reset_period, stripe_price_id |
| `subscription_orders` | new-api | id, user_id, plan_id, money, trade_no, payment_method, status |
| `user_subscriptions` | new-api | id, user_id, plan_id, amount_total, amount_used, start_time, end_time, status |
| `topups` | new-api | id, user_id, amount, trade_no, status |
| `redemptions` | new-api | id, name, key, status, quota, count |
| `pricing` (内存) | new-api | model_name, model_ratio, completion_ratio, quota_type |

#### 用户记忆 (来自 lobehub)

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `user_memories` | lobehub | id, user_id, title, summary, details, vectors |
| `user_memories_contexts` | lobehub | id, user_id, description_vector |
| `user_memories_preferences` | lobehub | id, user_id, preference_vectors |
| `user_memories_identities` | lobehub | id, user_id, identity_vectors |

#### AI 基础设施配置

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `ai_providers` | lobehub | id, user_id, key_vaults, settings, config |
| `ai_models` | lobehub | id, provider_id, user_id, pricing, abilities |
| `model_meta` | new-api | model_name, vendor_id, icon, tags |
| `vendor_meta` | new-api | id, name, description, icon |

#### 通知与任务

| 表名 | 来源 | 关键字段 |
|------|------|---------|
| `notifications` | lobehub | id, user_id, category, type, read, archived |
| `async_tasks` | lobehub | id, user_id, type, status, metadata |
| `tasks` (工作任务) | lobehub | id, identifier, created_by, assignees, status, parent_task_id |

---

## 三、功能模块详细设计

### 模块 1：认证与用户系统 (SSO 体系)

**参考**: lobehub Better Auth + new-api session/OAuth → 统一为 SSO 登录中心

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| 注册/登录 (密码) | Better Auth, bcrypt | **Passport (SSO)** |
| OAuth (GitHub/Google/Discord/WeChat/Telegram) | Better Auth + 自定义 Provider | **Passport (SSO)** |
| 自定义 OIDC Provider (数据库存储) | 参考 new-api `custom_oauth_provider` | Go API |
| Passkey (WebAuthn) | Better Auth passkey 插件 | **Passport (SSO)** |
| 2FA (TOTP) | Better Auth 2FA 插件 | **Passport (SSO)** |
| 邮箱验证 | 验证码 + SMTP | **Passport (SSO)** + Go |
| SSO Token 签发/验证 | JWT (access + refresh) | **Passport** ↔ Go API |
| 用户角色 (RBAC) | 参考 lobehub `rbac_*` 表 | Go API |
| 用户中心 (资料/安全/设备/绑定/偏好) | 独立页面 | **Passport (SSO)** |
| Access Token (API 密钥) | 参考 new-api Token 系统 | **Passport** + Go API |
| 子项目认证接入 | `@fluxsum/auth-sdk` | **所有子项目** |
| 会话管理 | Better Auth sessions + Redis | **Passport (SSO)** |
| 统一登出 | 清除所有端 session + Token 吊销 | **Passport (SSO)** + Go |

### 模块 2：对话系统

**参考**: lobehub `store/chat/` + `src/services/chat/`

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| 会话管理 (创建/列表/删除/分组) | tRPC → Go CRUD | Next.js + Go |
| 话题管理 (自动/手动创建) | tRPC → Go | Next.js + Go |
| 消息发送 (流式 SSE) | Next.js Route Handler → Go relay → 上游模型 | Next.js + Go |
| 线程 (分支对话) | 参考 lobehub threads | Go |
| 消息操作 (编辑/删除/重新生成/翻译) | tRPC → Go | Next.js + Go |
| 插件调用 (工具执行) | 消息中的 tool_call → Python 执行 | Python |
| TTS / STT | 调用模型 API | Go relay |
| 消息文件附件 | 上传 S3 → 关联消息 | Go + S3 |
| 对话分享 | 生成分享链接 + 快照 | Next.js + Go |
| 上下文工程 (Context Engine) | 参考 lobehub `context-engine` | Python |

### 模块 3：Agent 系统

**参考**: lobehub `store/agent/` + `packages/agent-runtime/`

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| Agent CRUD | tRPC → Go | Next.js + Go |
| Agent 配置 (模型/提示词/插件/知识库) | JSON 配置存储 | Go |
| Agent 执行运行时 | 参考 lobehub AgentRuntime → Python 重写 | Python |
| 多 Agent 群聊 | 参考 lobehub chat_groups | Go + Python |
| Agent 定时任务 (Cron) | 参考 lobehub agent_cron_jobs | Go (调度) + Python (执行) |
| Agent 技能 (Skills) | 参考 lobehub agent_skills | Python |
| Agent 评测 (Benchmark) | 参考 lobehub agent_eval | Python |
| Agent 模板 | 预置模板库 | Go |
| Agent 机器人发布 (WeChat/QQ/Feishu) | 参考 lobehub chat-adapter-* | Python |

### 模块 4：知识库与 RAG

**参考**: lobehub `store/library/` + `packages/database/schemas/rag.ts`

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| 知识库 CRUD | tRPC → Go | Next.js + Go |
| 文档上传/解析 | 文件上传 → Python 解析 (PDF/Word/HTML/Markdown) | Go (上传) + Python (解析) |
| 文档分块 (Chunking) | Unstructured / LangChain Splitters | Python |
| 向量嵌入 (Embedding) | 调用 Embedding 模型 API | Python → Go relay |
| 向量存储 | pgvector (PostgreSQL 扩展) | Python |
| 检索增强生成 (RAG Query) | Hybrid search (向量 + 关键词) | Python |
| RAG 评测 | 参考 lobehub rag_eval_* | Python |
| 文档权限控制 | 参考 lobehub agent_documents 权限位 | Go |

### 模块 5：模型中转与渠道管理

**参考**: new-api `relay/` + `controller/channel.go` — **完整保留此系统**

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| OpenAI 兼容 API (`/v1/*`) | 参考 new-api relay 完整移植 | Go |
| 多模型适配器 (OpenAI/Claude/Gemini/Azure/国内模型) | 参考 new-api `relay/adaptor/` | Go |
| 渠道管理 (CRUD/测试/余额) | 参考 new-api channel controller | Go |
| 多 Key 轮询/负载均衡 | 参考 new-api ChannelInfo multi-key | Go |
| 智能渠道选择 (Distributor) | 参考 new-api `middleware/distributor.go` | Go |
| 渠道亲和性 | 参考 new-api channel_affinity | Go |
| 模型映射 (Model Mapping) | 参考 new-api model_mapping | Go |
| 异步任务 (图片/视频/Midjourney/Suno) | 参考 new-api task relay | Go |
| WebSocket 实时 API | 参考 new-api `/v1/realtime` | Go |
| Playground (管理端调试) | 参考 new-api playground | Go + Next.js Admin |

### 模块 6：计费与订阅系统

**参考**: new-api `service/billing.go` + `model/subscription.go`

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| 钱包额度 (Quota) | 参考 new-api user.Quota + pre_consume/settle | Go |
| 订阅计划管理 | 参考 new-api SubscriptionPlan | Go |
| 订阅购买流程 | Stripe/支付宝/Creem webhook | Go |
| 额度重置 (周期性) | 参考 new-api subscription_reset_task | Go |
| 兑换码系统 | 参考 new-api Redemption | Go |
| 充值 (TopUp) | 参考 new-api topup | Go |
| 用量统计/日志 | 参考 new-api Log + QuotaData | Go |
| 计费定价 (Pricing) | 参考 new-api pricing + model_ratio | Go |
| 邀请返利 (Affiliate) | 参考 new-api aff_code/aff_quota | Go |

### 模块 7：插件与工具系统

**参考**: lobehub `store/tool/` + `packages/builtin-tool-*/`

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| 插件安装/管理 | tRPC → Go CRUD | Next.js + Go |
| 内置工具 (Web 搜索/代码执行/文件操作) | Python 工具运行时 | Python |
| MCP (Model Context Protocol) | 参考 lobehub MCP 集成 | Python |
| 自定义插件 (OpenAPI Manifest) | 解析 manifest → 注册 | Go + Python |
| 插件商店 | 参考 lobehub discover/skill store | Go + Next.js |
| Python 解释器 | 参考 lobehub python-interpreter | Python |

### 模块 8：文件与媒体

**参考**: lobehub `store/file/` + `global_files`

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| 文件上传 (S3/OSS) | 预签名 URL → 直传 | Go |
| 全局文件去重 | 参考 lobehub global_files (hash_id) | Go |
| 图片生成 | 调用图片模型 → 存储 | Go relay + Python |
| 视频生成 | 参考 new-api video relay | Go relay |
| 文件预览/下载 | 签名 URL | Go |

### 模块 9：用户记忆系统

**参考**: lobehub `store/userMemory/` + `packages/memory-user-memory/`

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| 记忆提取 (从对话中) | LLM 分析 → 结构化存储 | Python |
| 记忆分类 (身份/偏好/习惯/经验/活动) | 向量聚类 + LLM 分类 | Python |
| 记忆检索 (对话时注入上下文) | 向量相似度搜索 | Python |
| 记忆管理 (CRUD) | tRPC → Go | Next.js + Go |
| 人设文档 (Persona) | 参考 lobehub persona_documents | Python |

### 模块 10：社区与市场

**参考**: lobehub `store/discover/` + `src/services/discover.ts`

| 功能 | 实现方式 | 服务归属 |
|------|---------|---------|
| Agent 市场 (浏览/搜索/安装) | Next.js SSR + Go API | Next.js + Go |
| 插件市场 | 同上 | Next.js + Go |
| 模型市场 (Provider 列表) | 同上 | Next.js + Go |
| Agent 发布/Fork | 参考 lobehub market API | Go |
| 社区用户主页 | 参考 lobehub social service | Next.js + Go |

---

## 四、运营后台管理系统设计

### 4.1 总体结构

**参考**: new-api `web2/` 的管理功能 + lobehub 缺失的运营后台需求

```
运营后台 (apps/admin)
├── 仪表盘 (Dashboard)
├── 用户管理
├── 渠道管理
├── 模型管理
├── Token 管理
├── 计费管理
│   ├── 订阅计划
│   ├── 兑换码
│   ├── 充值记录
│   └── 定价配置
├── 内容管理
│   ├── Agent 审核
│   ├── 插件审核
│   └── 社区内容
├── 系统配置
│   ├── 基础设置
│   ├── 支付配置
│   ├── 认证配置 (OAuth/OIDC)
│   ├── 速率限制
│   ├── 安全设置
│   └── 监控告警
├── 日志管理
│   ├── API 调用日志
│   ├── 系统日志
│   └── 审计日志
├── 数据分析
│   ├── 用量趋势
│   ├── 模型使用分布
│   ├── 收入报表
│   └── 用户增长
└── 权限管理 (RBAC)
    ├── 角色管理
    ├── 权限管理
    └── 菜单管理
```

### 4.2 运营后台功能清单

#### 仪表盘

| 功能 | 数据来源 | 说明 |
|------|---------|------|
| 今日请求数/Token 消耗 | `logs` 聚合 | 实时 + 趋势图 |
| 活跃用户数 | `users.last_active_at` | 日/周/月 |
| 收入概览 | `topups` + `subscription_orders` | 当日/当月 |
| 渠道状态 | `channels.status` + 响应时间 | 异常告警 |
| 模型调用排行 | `logs.model_name` 聚合 | Top 10 |
| 系统负载 | Go runtime + pprof | CPU/内存/协程 |

#### 用户管理 (参考 new-api `controller/user.go`)

- 用户列表 (搜索/筛选/分页)
- 用户详情 (基本信息/额度/用量/订阅)
- 封禁/解封用户
- 手动调整额度
- 重置密码
- 用户分组管理
- 邀请关系查看
- OAuth 绑定管理

#### 渠道管理 (参考 new-api `controller/channel.go`)

- 渠道列表 (状态/类型/余额/响应时间)
- 渠道创建 (40+ 提供商类型)
- 渠道测试 (连通性 + 响应时间)
- 渠道余额查询
- 多 Key 管理 (轮询/随机)
- 批量操作 (启用/禁用/删除)
- 模型映射配置
- 渠道标签分组
- Codex OAuth 授权
- 渠道亲和性配置

#### 模型管理 (参考 new-api `controller/model.go`)

- 模型列表 (按供应商分组)
- 模型元数据编辑 (图标/标签/描述)
- 模型能力矩阵 (`abilities` 表)
- 上游模型同步
- 缺失模型检测
- 供应商管理 (Vendor)
- 预填充分组 (Prefill Group)

#### Token 管理 (参考 new-api `controller/token.go`)

- Token 列表 (用户/状态/额度/过期)
- Token 创建 (额度/模型限制/IP 白名单)
- Token 状态管理 (启用/禁用)
- 使用统计

#### 订阅与计费

- 订阅计划 CRUD (价格/周期/额度/分组)
- 用户订阅管理 (绑定/失效/续费)
- 兑换码批量生成
- 充值记录查看
- 定价规则配置 (模型比率/补全比率)
- 分组定价覆盖

#### 系统配置 (参考 new-api `setting/`)

| 配置模块 | 具体项 |
|---------|--------|
| 基础设置 | 站点名称、Logo、公告、用户协议 |
| 注册配置 | 开放注册、邮箱验证、Turnstile |
| 支付配置 | Stripe/支付宝 密钥、Webhook |
| 额度配置 | 初始额度、签到额度、邀请奖励 |
| 速率限制 | 全局/模型/用户 RPM/TPM |
| 监控告警 | Webhook 通知、邮件告警、Bark 推送 |
| 渠道策略 | 自动禁用、自动测试、亲和性 |
| 敏感词 | 输入/输出过滤词 |
| 日志配置 | 日志保留天数、IP 记录 |

#### 日志与审计

- API 调用日志 (参考 new-api `Log` 模型)
- 按用户/模型/渠道/时间筛选
- 错误日志专项
- 请求详情查看 (Token 消耗/耗时/流式)
- 系统操作审计日志

#### 数据分析

- 调用量趋势 (日/周/月)
- Token 消耗趋势
- 模型使用分布 (饼图/柱状图)
- 用户增长曲线
- 收入报表 (订阅 + 充值 + 兑换)
- 渠道使用率排行
- 导出 CSV/Excel

---

## 五、项目结构设计

```
fluxsum/
├── apps/
│   ├── main/                          ★ MF Host 主壳 (Rsbuild + React 18)
│   │   ├── src/
│   │   │   ├── App.tsx                路由分发 (静态 + 动态 Remote)
│   │   │   ├── bootstrap.tsx          应用初始化
│   │   │   ├── index.tsx              入口
│   │   │   ├── layouts/
│   │   │   │   └── MainLayout.tsx     全局布局 (侧边栏/Header/Outlet)
│   │   │   ├── pages/
│   │   │   │   └── Home.tsx           主壳自有首页
│   │   │   ├── components/
│   │   │   │   ├── AuthGuard.tsx      SSO 登录守卫
│   │   │   │   ├── RemoteLoader.tsx   MF Remote 动态加载器
│   │   │   │   └── ErrorBoundary.tsx  Remote 加载失败兜底
│   │   │   ├── lib/
│   │   │   │   └── remote-registry.ts 动态 Remote 注册 + 加载
│   │   │   └── styles.css
│   │   ├── rsbuild.config.ts          MF Host 配置 + Remote 声明
│   │   └── package.json
│   │
│   ├── passport/                      ★ SSO 登录中心 (Next.js 16)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (auth)/            认证流程页面
│   │   │   │   │   ├── signin/        登录
│   │   │   │   │   ├── signup/        注册
│   │   │   │   │   ├── forgot-password/ 忘记密码
│   │   │   │   │   ├── reset-password/  重置密码
│   │   │   │   │   ├── verify-email/    邮箱验证
│   │   │   │   │   ├── 2fa/            两步验证
│   │   │   │   │   └── oauth/          OAuth 回调/授权
│   │   │   │   ├── (user)/            用户中心页面
│   │   │   │   │   ├── profile/       个人资料
│   │   │   │   │   ├── security/      安全设置
│   │   │   │   │   ├── sessions/      登录设备管理
│   │   │   │   │   ├── linked-accounts/ 第三方账号绑定
│   │   │   │   │   ├── preferences/   偏好设置
│   │   │   │   │   ├── subscription/  订阅与账单
│   │   │   │   │   └── api-keys/      API 密钥管理
│   │   │   │   ├── api/
│   │   │   │   │   ├── auth/[...all]/ Better Auth Handler
│   │   │   │   │   └── sso/           SSO 端点 (authorize/token/userinfo/logout)
│   │   │   │   └── layout.tsx
│   │   │   ├── lib/
│   │   │   │   ├── auth.ts            Better Auth 配置
│   │   │   │   └── jwt.ts             JWT 签发/验证
│   │   │   └── components/
│   │   ├── locales/
│   │   └── package.json
│   │
│   ├── ai-chat/                       ★ AI 对话子项目 (MF Remote, Next.js 16)
│   │   ├── src/
│   │   │   ├── App.tsx                MF expose 根组件
│   │   │   ├── bootstrap.tsx          独立运行入口
│   │   │   ├── app/                   Next.js App Router (内部路由)
│   │   │   │   ├── (main)/
│   │   │   │   │   ├── page.tsx       对话首页
│   │   │   │   │   ├── chat/[id]/     对话详情
│   │   │   │   │   ├── agent/         Agent 管理
│   │   │   │   │   ├── community/     市场/社区
│   │   │   │   │   ├── resource/      知识库
│   │   │   │   │   ├── memory/        记忆管理
│   │   │   │   │   ├── image/         图片生成
│   │   │   │   │   └── video/         视频生成
│   │   │   │   ├── api/
│   │   │   │   │   └── trpc/[...all]/ tRPC Handler
│   │   │   │   └── layout.tsx
│   │   │   ├── server/                tRPC 路由 + BFF 逻辑
│   │   │   │   ├── routers/           chat/agent/session/file/knowledge/user
│   │   │   │   └── services/          调用 Go/Python 的适配层
│   │   │   ├── store/                 Zustand stores (chat/agent/tool/file...)
│   │   │   ├── services/              客户端 API 层
│   │   │   ├── components/
│   │   │   ├── features/              Conversation/ChatInput/AgentSetting...
│   │   │   └── hooks/
│   │   ├── locales/
│   │   ├── rsbuild.config.ts          MF Remote 配置 (expose ./App)
│   │   └── package.json
│   │
│   ├── admin/                         ★ 运营后台 (Next.js 16, 可作为 MF Remote)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (auth)/login/
│   │   │   │   ├── (admin)/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── users/
│   │   │   │   │   ├── channels/
│   │   │   │   │   ├── models/
│   │   │   │   │   ├── tokens/
│   │   │   │   │   ├── billing/
│   │   │   │   │   │   ├── subscriptions/
│   │   │   │   │   │   ├── redemptions/
│   │   │   │   │   │   ├── topups/
│   │   │   │   │   │   └── pricing/
│   │   │   │   │   ├── content/
│   │   │   │   │   ├── settings/
│   │   │   │   │   ├── logs/
│   │   │   │   │   ├── analytics/
│   │   │   │   │   └── rbac/
│   │   │   │   └── layout.tsx
│   │   │   ├── server/
│   │   │   ├── components/
│   │   │   └── locales/
│   │   └── package.json
│   │
│   ├── gateway/                       ★ Go API 网关
│   │   ├── main.go
│   │   ├── router/
│   │   │   ├── api_router.go          管理 API
│   │   │   ├── relay_router.go        模型中转 (/v1/*)
│   │   │   └── video_router.go        视频 API
│   │   ├── controller/                HTTP Handler
│   │   ├── model/                     GORM 数据模型
│   │   ├── service/                   业务逻辑
│   │   ├── middleware/                中间件
│   │   ├── relay/                     模型代理适配器
│   │   │   ├── adaptor/              各模型适配
│   │   │   ├── handler/              请求处理
│   │   │   └── common/               公共逻辑
│   │   ├── dto/                       数据传输对象
│   │   ├── constant/                  常量
│   │   ├── setting/                   系统配置
│   │   ├── oauth/                     OAuth 提供商
│   │   ├── i18n/                      多语言 YAML
│   │   ├── pkg/                       工具包
│   │   ├── go.mod
│   │   └── Dockerfile
│   │
│   └── ai-service/                    ★ Python AI 服务
│       ├── main.py
│       ├── api/
│       │   ├── chat.py                对话/Agent 执行
│       │   ├── rag.py                 RAG 检索
│       │   ├── embedding.py           向量嵌入
│       │   ├── memory.py              记忆系统
│       │   ├── tools.py               工具执行
│       │   └── file_parser.py         文件解析
│       ├── core/
│       │   ├── agent_runtime.py       Agent 执行引擎
│       │   ├── context_engine.py      上下文引擎
│       │   ├── rag_engine.py          RAG 引擎
│       │   ├── memory_engine.py       记忆引擎
│       │   └── tool_runtime.py        工具运行时
│       ├── models/                    Pydantic 模型
│       ├── i18n/                      多语言 JSON
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/
│   ├── auth-sdk/                      ★ SSO 认证 SDK (AuthProvider/Token/Guard)
│   ├── mf-shared/                     MF 共享配置 + Runtime Plugins + EventBus + 全局 Store
│   ├── i18n/                          统一多语言 (已创建)
│   ├── ui/                            共享 UI 组件库
│   ├── go-utils/                      Go 共享工具 (含 SSO JWT 验证中间件)
│   ├── py-utils/                      Python 共享工具
│   ├── proto/                         gRPC Proto 定义
│   └── eslint-config/                 ESLint 配置
│
├── infra/
│   ├── docker/                        Docker 编排
│   ├── k8s/                           K8s 部署清单
│   └── sql/                           数据库迁移 SQL
│
└── turbo.json
```

---

## 六、阶段划分与任务清单

### Phase 0：基础设施搭建 (预计 2 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 0.1 | 重构 `apps/main` MF Host 主壳 (已有 Rsbuild) | P0 | 增加 AuthGuard、RemoteLoader、动态 Remote 注册 |
| 0.2 | 创建 `apps/passport` SSO 登录中心 (Next.js 16) | P0 | Better Auth + SSO 端点 + JWT 签发 |
| 0.3 | 创建 `packages/auth-sdk` 统一认证 SDK | P0 | AuthProvider/TokenManager/Guard 组件 |
| 0.4 | 创建 `apps/ai-chat` AI 对话子项目 (MF Remote) | P0 | Next.js 16 + tRPC + MF expose |
| 0.5 | 创建 `apps/admin` 运营后台 (Next.js 16) | P0 | Shadcn UI + TanStack Table |
| 0.6 | 创建 `apps/gateway` Go API 网关脚手架 | P0 | Gin + GORM + Redis + SSO JWT 验证中间件 |
| 0.7 | 创建 `apps/ai-service` Python AI 服务脚手架 | P0 | FastAPI + gRPC client |
| 0.8 | 搭建 Docker Compose 本地开发环境 | P0 | PG + Redis + MinIO + 各服务 |
| 0.9 | 配置 Turborepo pipeline (dev/build/test) | P0 | 多服务并行开发 |
| 0.10 | 集成 `@fluxsum/i18n` 多语言到各项目 | P1 | 已有包，接入即可 |
| 0.11 | 搭建 gRPC/Proto 服务间通信 | P1 | Next→Go、Go→Python 调用 |
| 0.12 | 扩展 `@fluxsum/mf-shared` (EventBus/全局 Store) | P1 | 跨 Remote 通信基础 |

### Phase 1：SSO 认证 + 用户体系 (预计 3 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 1.1 | Go: 实现 User 数据模型 + CRUD API | P0 | 合并 lobehub + new-api User 字段 |
| 1.2 | Go: 实现 RBAC 权限系统 | P0 | roles/permissions/user_roles |
| 1.3 | Go: 实现 Remote App 注册表 API | P0 | remote_apps 表 + CRUD + 注册表查询 |
| 1.4 | Passport: Better Auth 集成 (密码+OAuth) | P0 | 注册/登录/密码重置/OAuth |
| 1.5 | Passport: SSO 端点开发 | P0 | authorize/token/refresh/userinfo/logout |
| 1.6 | Passport: 认证页面 UI (登录/注册/重置) | P0 | 多语言、响应式 |
| 1.7 | auth-sdk: AuthProvider + TokenManager | P0 | 子项目统一接入 SSO |
| 1.8 | auth-sdk: AuthGuard + RoleGuard + PermissionGuard | P0 | 权限守卫组件 |
| 1.9 | Host: 集成 auth-sdk + 动态 Remote 路由 | P0 | main 壳接入 SSO + 动态加载子项目 |
| 1.10 | Go: SSO JWT 验证中间件 | P0 | SSOAuth + RequireRole + RequirePermission |
| 1.11 | Passport: 用户中心 (profile/security/sessions) | P1 | 个人资料/安全设置/设备管理 |
| 1.12 | Go: OAuth Provider 管理 | P1 | 自定义 OIDC + 内置 Provider |
| 1.13 | Go: 2FA + Passkey 支持 | P2 | TOTP + WebAuthn |
| 1.14 | Passport: 用户中心 (linked-accounts/preferences) | P1 | 绑定账号/偏好设置 |
| 1.15 | Admin: 用户管理页面 | P1 | 列表/详情/封禁/额度调整 |
| 1.16 | Admin: Remote App 管理页面 | P1 | 子项目注册/启停/排序 |

### Phase 2：模型中转与渠道 (预计 3 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 2.1 | Go: 移植 new-api Channel 模型 + CRUD | P0 | 40+ 渠道类型 |
| 2.2 | Go: 移植 new-api relay 核心 (适配器架构) | P0 | OpenAI/Claude/Gemini/Azure 优先 |
| 2.3 | Go: 移植 Token 系统 (sk-* API 密钥) | P0 | 创建/验证/额度 |
| 2.4 | Go: 实现 Distributor 中间件 (渠道选择) | P0 | 优先级/权重/亲和性 |
| 2.5 | Go: 移植 OpenAI 兼容 `/v1/*` 路由 | P0 | chat/completions/embeddings/images |
| 2.6 | Go: 移植速率限制中间件 | P0 | 全局/模型/用户 |
| 2.7 | Go: 移植国内模型适配器 | P1 | Volcengine/Qwen/DeepSeek/Moonshot |
| 2.8 | Go: 异步任务系统 (Midjourney/Suno/视频) | P2 | task relay |
| 2.9 | Go: WebSocket 实时 API | P2 | /v1/realtime |
| 2.10 | Admin: 渠道管理页面 | P0 | CRUD/测试/余额/多 Key |
| 2.11 | Admin: 模型管理页面 | P1 | 元数据/能力矩阵/同步 |
| 2.12 | Admin: Token 管理页面 | P1 | CRUD/用量 |

### Phase 3：对话系统 (预计 4 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 3.1 | Go: Session/Topic/Message 数据模型 | P0 | 参考 lobehub schema |
| 3.2 | Go: Session CRUD API | P0 | 创建/列表/分组/删除 |
| 3.3 | Go: Topic + Message CRUD API | P0 | |
| 3.4 | Next.js tRPC: 对话 Server Router | P0 | 调用 Go API |
| 3.5 | Next.js: 对话 UI (消息列表 + 输入框) | P0 | 参考 lobehub Conversation + ChatInput |
| 3.6 | Next.js: 流式 SSE 消息渲染 | P0 | Server Route → Go relay → SSE |
| 3.7 | Next.js: Zustand chat store | P0 | 参考 lobehub store/chat |
| 3.8 | Next.js: 话题侧边栏 | P1 | |
| 3.9 | Go: Thread (分支对话) 支持 | P2 | |
| 3.10 | Next.js: 消息操作 (编辑/删除/重新生成) | P1 | |
| 3.11 | Next.js: 对话分享 | P2 | |
| 3.12 | Next.js: 首页 (Home) 布局 | P1 | 会话列表 + Agent 卡片 |

### Phase 4：Agent 系统 (预计 3 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 4.1 | Go: Agent 数据模型 + CRUD | P0 | |
| 4.2 | Next.js: Agent 配置页面 | P0 | 模型/提示词/插件/知识库 |
| 4.3 | Python: Agent 执行运行时 | P0 | 参考 lobehub AgentRuntime |
| 4.4 | Next.js: Agent 设置 UI | P0 | |
| 4.5 | Go: 多 Agent 群聊支持 | P1 | chat_groups |
| 4.6 | Python: Agent 定时任务执行 | P2 | cron_jobs |
| 4.7 | Python: Agent 技能系统 | P2 | skills |
| 4.8 | Admin: Agent 审核管理 | P2 | |

### Phase 5：知识库与 RAG (预计 3 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 5.1 | Go: 知识库 + 文档 数据模型 | P0 | |
| 5.2 | Python: 文档解析引擎 | P0 | PDF/Word/HTML/Markdown |
| 5.3 | Python: 文档分块 (Chunking) | P0 | |
| 5.4 | Python: 向量嵌入 + pgvector 存储 | P0 | |
| 5.5 | Python: RAG 检索引擎 | P0 | Hybrid search |
| 5.6 | Next.js: 知识库管理 UI | P0 | 上传/列表/配置 |
| 5.7 | Next.js tRPC: 知识库 Router | P0 | |
| 5.8 | Python: RAG 评测系统 | P2 | |
| 5.9 | Go: 文档权限控制 | P2 | |

### Phase 6：计费与订阅 (预计 2 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 6.1 | Go: 移植 new-api 计费系统 (pre_consume/settle) | P0 | |
| 6.2 | Go: 订阅计划 + 用户订阅 模型 | P0 | |
| 6.3 | Go: Stripe/支付宝 Webhook 集成 | P0 | |
| 6.4 | Go: 兑换码 + 充值系统 | P1 | |
| 6.5 | Go: 定价配置 (模型比率) | P0 | |
| 6.6 | Go: 订阅额度重置定时任务 | P1 | |
| 6.7 | Next.js: 用户订阅/账单页面 | P1 | |
| 6.8 | Admin: 订阅管理页面 | P0 | 计划/订单/用户订阅 |
| 6.9 | Admin: 定价配置页面 | P1 | |
| 6.10 | Admin: 兑换码/充值管理 | P1 | |

### Phase 7：插件与工具 (预计 2 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 7.1 | Go: 插件数据模型 + 安装管理 | P0 | |
| 7.2 | Python: 内置工具运行时 (搜索/代码/文件) | P0 | |
| 7.3 | Python: MCP 协议集成 | P1 | |
| 7.4 | Next.js: 插件商店 UI | P1 | |
| 7.5 | Python: 自定义插件加载器 | P2 | |

### Phase 8：用户记忆 (预计 2 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 8.1 | Python: 记忆提取引擎 | P1 | |
| 8.2 | Python: 记忆向量化 + 分类 | P1 | |
| 8.3 | Go: 记忆 CRUD API | P1 | |
| 8.4 | Next.js: 记忆管理 UI | P2 | |
| 8.5 | Python: 人设文档生成 | P2 | |

### Phase 9：社区市场 (预计 2 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 9.1 | Go: 市场 Agent/插件 上架 API | P1 | |
| 9.2 | Next.js: 社区浏览 UI (SSR) | P1 | |
| 9.3 | Go: 审核/举报系统 | P2 | |
| 9.4 | Admin: 内容审核页面 | P2 | |

### Phase 10：运营后台完善 (预计 3 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 10.1 | Admin: 仪表盘 (核心指标 + 图表) | P0 | |
| 10.2 | Admin: 系统配置面板 | P0 | 参考 new-api settings |
| 10.3 | Admin: 日志管理 (搜索/筛选/详情) | P0 | |
| 10.4 | Admin: 数据分析报表 | P1 | |
| 10.5 | Admin: RBAC 权限管理 UI | P1 | |
| 10.6 | Admin: 监控告警配置 | P2 | |
| 10.7 | Admin: 审计日志 | P2 | |
| 10.8 | Admin: Playground (模型调试) | P1 | |

### Phase 11：优化与上线 (预计 2 周)

| # | 任务 | 优先级 | 说明 |
|---|------|--------|------|
| 11.1 | 性能优化 (SSR 缓存/Redis 缓存策略) | P0 | |
| 11.2 | 安全加固 (SSRF/XSS/CSRF/Rate Limit) | P0 | |
| 11.3 | E2E 测试 (Playwright) | P1 | |
| 11.4 | CI/CD pipeline (GitHub Actions) | P0 | |
| 11.5 | Docker 镜像优化 (多阶段构建) | P0 | |
| 11.6 | K8s 部署清单 | P1 | |
| 11.7 | 监控接入 (OpenTelemetry / Prometheus) | P1 | |
| 11.8 | 文档编写 (API 文档/部署文档) | P1 | |

---

## 七、关键技术实现细节

### 7.1 前端 → Go 通信 (Next.js tRPC → Go REST/gRPC)

```typescript
// Next.js tRPC Router 调用 Go API
// server/services/gateway.ts
import { env } from '@/env';

const GATEWAY_URL = env.GATEWAY_INTERNAL_URL; // 如 http://gateway:8080

export async function gatewayFetch<T>(
  path: string,
  options?: RequestInit & { token?: string },
): Promise<T> {
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`Gateway error: ${res.status}`);
  return res.json();
}

// 用法 (tRPC Router)
export const channelRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return gatewayFetch('/api/channel/', {
      token: ctx.session.accessToken,
    });
  }),
});
```

### 7.2 Go → Python 通信 (gRPC)

```protobuf
// packages/proto/ai_service.proto
service AIService {
  rpc ExecuteAgent(AgentRequest) returns (stream AgentResponse);
  rpc RAGQuery(RAGQueryRequest) returns (RAGQueryResponse);
  rpc ParseDocument(ParseDocumentRequest) returns (ParseDocumentResponse);
  rpc EmbedText(EmbedRequest) returns (EmbedResponse);
  rpc ExtractMemory(MemoryRequest) returns (MemoryResponse);
  rpc ExecuteTool(ToolRequest) returns (ToolResponse);
}
```

### 7.3 流式对话实现

```
用户 → Next.js Route Handler → Go /v1/chat/completions (SSE)
                                    ↓
                              Distributor 选渠道
                                    ↓
                              Adaptor 转发上游
                                    ↓
                              SSE chunks 回传
                                    ↓
                              计费 settle
```

```typescript
// Next.js: app/api/chat/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();

  const response = await fetch(`${GATEWAY_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.apiToken}`,
    },
    body: JSON.stringify(body),
  });

  // 直接透传 SSE 流
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
```

### 7.4 多语言加载 (环境感知)

```typescript
// apps/main/src/lib/i18n.ts
import { createFluxsumI18n } from '@fluxsum/i18n/react';

export const { instance: i18n, initPromise } = createFluxsumI18n({
  project: 'main',
  region: process.env.NEXT_PUBLIC_DEPLOY_REGION as 'local' | 'cn' | 'global',
  defaultNS: ['common', 'chat', 'agent'],
  cdn: {
    ossBaseUrl: process.env.NEXT_PUBLIC_OSS_URL!,
    cfBaseUrl: process.env.NEXT_PUBLIC_CF_CDN_URL!,
  },
});
```

### 7.5 运营后台认证 (Admin 通过 SSO 登录)

Admin 后台不再自己处理登录逻辑，而是通过 SSO 统一认证：

```typescript
// apps/admin/src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createNextI18nMiddleware } from '@fluxsum/i18n/next';

const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL!;          // passport.fluxsum.com
const GATEWAY_URL = process.env.GATEWAY_INTERNAL_URL!;      // http://gateway:8080

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('sso_token')?.value
    || req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    const redirect = `${SSO_URL}/api/sso/authorize?redirect_uri=${encodeURIComponent(req.url)}`;
    return NextResponse.redirect(redirect);
  }

  // 通过 Go API 验证 Token + 检查 admin 角色
  const res = await fetch(`${GATEWAY_URL}/api/sso/validate`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const redirect = `${SSO_URL}/api/sso/authorize?redirect_uri=${encodeURIComponent(req.url)}`;
    return NextResponse.redirect(redirect);
  }

  const user = await res.json();
  if (user.role < 10) { // 10 = ADMIN
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return createNextI18nMiddleware({ defaultLocale: 'zh-CN' })(req);
}
```

### 7.6 MF Host 初始化 (SSO + Remote 注册)

```typescript
// apps/main/src/bootstrap.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@fluxsum/auth-sdk';
import { I18nProvider } from '@fluxsum/i18n/react';
import App from './App';
import './styles.css';

const SSO_URL = import.meta.env.VITE_SSO_URL || 'https://passport.fluxsum.com';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider ssoUrl={SSO_URL}>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
```

---

## 八、开发环境配置

### Docker Compose (本地开发)

```yaml
# infra/docker/docker-compose.dev.yml
services:
  postgres:
    image: pgvector/pgvector:pg17
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: fluxsum
      POSTGRES_USER: fluxsum
      POSTGRES_PASSWORD: fluxsum

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  minio:
    image: minio/minio
    ports: ["9000:9000", "9001:9001"]
    command: server /data --console-address ":9001"

  gateway:
    build: ../../apps/gateway
    ports: ["8080:8080"]
    environment:
      JWT_SECRET: ${JWT_SECRET}
      DATABASE_URL: postgres://fluxsum:fluxsum@postgres:5432/fluxsum
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]

  ai-service:
    build: ../../apps/ai-service
    ports: ["8090:8090"]
    depends_on: [postgres, redis]
```

### Turbo 开发命令

```bash
# 全部服务启动 (main + passport + ai-chat + admin + gateway + ai-service)
bun run dev

# 单独启动
turbo run dev --filter=@fluxsum/main      # MF Host 主壳 (localhost:3000)
turbo run dev --filter=@fluxsum/passport  # SSO 登录中心 (localhost:3001)
turbo run dev --filter=@fluxsum/ai-chat   # AI 对话子项目 (localhost:3002)
turbo run dev --filter=@fluxsum/admin     # 运营后台 (localhost:3003)
turbo run dev --filter=@fluxsum/gateway   # Go API 网关 (localhost:8080)

# 多语言
bun run i18n              # 同步 + 翻译 + 校验
bun run i18n:gen-go       # 生成 Go YAML
bun run i18n:gen-python   # 生成 Python JSON
```

### 本地域名配置 (hosts)

开发时建议配置本地 hosts，模拟生产环境的跨域 SSO：

```bash
# /etc/hosts
127.0.0.1  app.fluxsum.local        # apps/main (Port 3000)
127.0.0.1  passport.fluxsum.local   # apps/passport (Port 3001)
127.0.0.1  chat.fluxsum.local       # apps/ai-chat (Port 3002)
127.0.0.1  admin.fluxsum.local      # apps/admin (Port 3003)
127.0.0.1  api.fluxsum.local        # apps/gateway (Port 8080)
```

---

## 八-B、生产部署拓扑

### 域名规划

| 服务 | 域名 | 说明 |
|------|------|------|
| MF Host 主壳 | `app.fluxsum.com` | 用户访问入口 |
| SSO 登录中心 | `passport.fluxsum.com` | 统一认证中心 |
| AI 对话子项目 | `chat.fluxsum.com` | MF Remote 静态资源 + manifest |
| 运营后台 | `admin.fluxsum.com` | 独立访问或嵌入 Host |
| Go API 网关 | `api.fluxsum.com` | 后端 API 入口 |
| CDN (中国) | `cdn.fluxsum.com` (阿里云) | 静态资源 + i18n |
| CDN (海外) | `assets.fluxsum.com` (Cloudflare) | 静态资源 + i18n |

### 部署架构

```
                   ┌─── CDN (Cloudflare / 阿里云) ───────────────────┐
                   │  • MF Remote manifest + chunks                  │
                   │  • 静态资源 (图片/字体/i18n)                      │
                   └──────────────────────────────────────────────────┘
                                        ↑ 上传
                                        │
┌──────────────── K8s Cluster ──────────────────────────────────────────┐
│                                                                       │
│  ┌─ Ingress (Nginx / Traefik) ──────────────────────────────────────┐ │
│  │  app.fluxsum.com     → main-pod (静态服务 / SSR)                  │ │
│  │  passport.fluxsum.com → passport-pod (Next.js SSR)                │ │
│  │  chat.fluxsum.com    → ai-chat-pod (静态服务 / SSR)               │ │
│  │  admin.fluxsum.com   → admin-pod (Next.js SSR)                   │ │
│  │  api.fluxsum.com     → gateway-pod (Go)                          │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─ 内部服务 ─────────────────────────────────────────────────────┐   │
│  │  gateway (Go)      ← 2+ replicas, HPA                          │   │
│  │  ai-service (Python) ← 2+ replicas, GPU node pool              │   │
│  │  passport (Next.js) ← 2+ replicas                              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─ 数据层 ──────────────────────────────────────────────────────┐   │
│  │  PostgreSQL (主库 + 只读副本)                                   │   │
│  │  PostgreSQL (日志库)                                            │   │
│  │  Redis Cluster (会话 + 缓存 + 速率限制)                         │   │
│  │  MinIO / S3 (对象存储)                                          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────────┘
```

### MF Remote 部署 — CDN + 回源

MF Remote 子项目打包后的静态资源部署到 CDN，Host 通过 `mf-manifest.json` 发现：

```
子项目 CI/CD 流程：
1. bun run build            → dist/ (含 mf-manifest.json)
2. 上传 dist/ → CDN          → https://chat.fluxsum.com/mf-manifest.json
3. 更新 Go API remote_apps 表 → version 字段更新

Host 加载流程：
1. 从 Go API 获取 remote_apps → 得到 entry: 'https://chat.fluxsum.com/mf-manifest.json'
2. MF runtime registerRemotes → 注册 Remote
3. 用户访问 /chat/* → loadRemote('aiChat/App') → 从 CDN 加载 chunks
```

---

## 九、总结

| 维度 | 说明 |
|------|------|
| **来源** | lobehub (用户端 AI Chat 全功能) + new-api (API 网关 + 计费 + 管理) |
| **前端架构** | 微前端 (Module Federation 2.0)：Host 主壳 + N 个 Remote 子项目 |
| **SSO** | 独立 `apps/passport` 登录中心，JWT Token 跨域共享，`@fluxsum/auth-sdk` 统一接入 |
| **前端项目** | main (MF Host) + passport (SSO) + ai-chat (MF Remote) + admin (运营后台) + 未来子项目 |
| **后端** | Go Gateway (数据 + 模型中转 + 计费 + SSO 验证) + Python (AI + RAG + 记忆) |
| **共享包** | auth-sdk (SSO)、mf-shared (MF)、i18n (多语言)、ui (组件)、go-utils、py-utils、proto |
| **数据库** | PostgreSQL (pgvector) + Redis |
| **多语言** | `@fluxsum/i18n` 统一体系，zh-CN 源，22 种语言 |
| **阶段** | 12 个 Phase，约 28 周（可并行压缩至 16-18 周） |
| **核心创新** | MF 微前端 + SSO 单点登录 + 动态子项目注册，将 lobehub 拆为微服务，整合 new-api 计费/中转 |
