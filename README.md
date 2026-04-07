# Fluxsum

一站式服务全球

## 项目结构

```
fluxsum/
├── apps/
│   ├── main/                    # 无界主应用 (React + Vite + PWA)
│   ├── website/                 # 官网 (React + Vite)
│   └── admin/                   # 后台管理系统 (React + Vite)
│
├── services/                    # 后端服务 (待添加)
│   ├── gateway/                 # API 网关
│   └── core/                    # 核心业务服务
│
├── packages/
│   ├── ui-kit/                  # 基于 shadcn-ui 的组件库
│   ├── wujie-config/            # 无界微前端统一配置
│   ├── api-sdk/                 # 自动生成的 API 客户端 (Connect RPC)
│   ├── tailwind-config/         # 统一 Tailwind 配置
│   ├── typescript-config/       # 统一 TypeScript 配置
│   └── shared/                  # 共享工具函数和类型
│
├── proto/                       # Protobuf 接口契约
│
├── deploy/                      # K8S 部署配置
│   ├── base/                    # Kustomize 基础配置
│   ├── overlays/                # 环境差异配置 (dev/staging/prod)
│   └── dockerfiles/             # Dockerfile 模板
│
├── turbo.json                   # Turborepo 配置
├── pnpm-workspace.yaml          # pnpm 工作区配置
└── package.json                 # 根 package.json
```

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 启动所有应用
pnpm dev

# 仅启动主应用
pnpm dev:main

# 仅启动官网
pnpm dev:website

# 仅启动后台管理
pnpm dev:admin
```

### 构建

```bash
# 构建所有包和应用
pnpm build

# 仅构建主应用
pnpm build:main

# 仅构建官网
pnpm build:website

# 仅构建后台管理
pnpm build:admin
```

### 其他命令

```bash
# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 格式化代码
pnpm format

# 生成 Proto SDK
pnpm proto:gen

# 清理构建产物
pnpm clean
```

## 技术栈

### 前端
- **框架**: React 19 + TypeScript
- **构建工具**: Vite + Turborepo
- **样式**: Tailwind CSS v4
- **组件库**: shadcn/ui (封装在 @fluxsum/ui-kit)
- **微前端**: 无界 (Wujie)
- **状态管理**: Zustand
- **路由**: React Router v6

### 后端
- **协议**: Connect RPC (基于 Protobuf)
- **API 生成**: Buf

### 部署
- **容器化**: Docker
- **编排**: Kubernetes + Kustomize

## 包说明

| 包名 | 说明 |
|------|------|
| `@fluxsum/main` | 无界主应用 |
| `@fluxsum/website` | 官网 |
| `@fluxsum/admin` | 后台管理系统 |
| `@fluxsum/ui-kit` | 基于 shadcn-ui 封装的组件库 |
| `@fluxsum/wujie-config` | 无界微前端统一配置 |
| `@fluxsum/api-sdk` | 自动生成的 API 客户端 |
| `@fluxsum/tailwind-config` | 统一 Tailwind 配置 |
| `@fluxsum/typescript-config` | 统一 TypeScript 配置 |
| `@fluxsum/shared` | 共享工具函数和类型 |
| `@fluxsum/i18n` | 多语言国际化 (15种语言，CDN部署) |

## License

MIT
