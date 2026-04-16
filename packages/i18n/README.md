# @fluxsum/i18n - 统一多语言体系

## 架构概览

```
fluxsum/
├── packages/i18n/                    ← 多语言核心包（你在这里）
│   ├── src/
│   │   ├── config.ts                 ← 语言定义、normalizeLocale、常量
│   │   ├── loader.ts                 ← CDN 加载器（本地/阿里云 OSS/Cloudflare）
│   │   ├── index.ts                  ← 统一导出
│   │   ├── react/
│   │   │   └── create.ts             ← React i18next 工厂函数
│   │   └── next/
│   │       ├── middleware.ts          ← Next.js middleware 语言检测
│   │       └── server.ts             ← Server Components 翻译函数
│   ├── scripts/
│   │   ├── translate.ts              ← AI 自动翻译（zh-CN → 其他语言）
│   │   ├── sync.ts                   ← 源语言变更同步
│   │   ├── validate.ts               ← 多语言校验
│   │   ├── upload-cdn.ts             ← CDN 上传（阿里云 OSS + Cloudflare R2）
│   │   ├── gen-go.ts                 ← 生成 Go 后端 YAML
│   │   └── gen-python.ts             ← 生成 Python 后端 JSON
│   └── locales/
│       └── zh-CN/                    ← 源语言（中文）翻译文件
│           ├── common.json           ← 公共前端翻译
│           └── backend.json          ← 公共后端翻译
│
├── packages/go-utils/i18n/           ← Go 后端 i18n 工具
│   ├── i18n.go                       ← 翻译函数 + 语言规范化
│   └── middleware.go                 ← Gin 中间件
│
├── packages/py-utils/fluxsum_utils/  ← Python 后端 i18n 工具
│   ├── i18n.py                       ← I18n 类 + 翻译函数
│   └── i18n_middleware.py            ← FastAPI 中间件
│
└── .github/workflows/
    └── i18n-translate.yml            ← 自动翻译 CI/CD
```

## 核心设计理念

### 1. 单一源语言 → 自动翻译

- **源语言**: `zh-CN`（中文）
- **翻译方向**: zh-CN → 21 种目标语言
- **翻译引擎**: OpenAI 兼容 API（可配置为任意 LLM）
- **增量翻译**: 仅翻译新增/变更的 key，保留已有翻译

### 2. 统一语言定义

所有项目（前端/后端/子项目）共享同一份语言列表：

```
zh-CN, en-US, zh-TW, ja-JP, ko-KR, hi-IN, id-ID, vi-VN, th-TH,
fr-FR, de-DE, es-ES, pt-BR, it-IT, ru-RU, nl-NL, pl-PL, bg-BG,
tr-TR, ar, fa-IR, he-IL
```

### 3. 环境感知加载策略

| 环境 | 加载方式 | 说明 |
|------|---------|------|
| 本地开发 | 本地文件 `locales/` | 直接 import 或 HTTP 请求本地文件 |
| 中国区线上 | 阿里云 OSS | `https://oss-bucket.oss-cn-xxx.aliyuncs.com/project/locales/` |
| 海外线上 | Cloudflare R2/CDN | `https://cdn.example.com/project/locales/` |

## 快速开始

### 前端 (Next.js / React)

#### 1. 安装依赖

```bash
# 已在 monorepo workspace 中，无需额外安装
```

#### 2. 创建项目翻译文件

```
your-app/
└── locales/
    └── zh-CN/
        ├── common.json      ← 公共翻译
        └── dashboard.json   ← 业务翻译
```

#### 3. 初始化 i18n (React)

```typescript
import { createFluxsumI18n } from '@fluxsum/i18n/react';

const { instance, initPromise } = createFluxsumI18n({
  project: 'ai-platform',
  region: process.env.NODE_ENV === 'development' ? 'local' : 'cn',
  defaultNS: ['common'],
  cdn: {
    ossBaseUrl: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com',
    cfBaseUrl: 'https://cdn.your-domain.com',
  },
});

// 在应用入口等待初始化
await initPromise;
```

#### 4. 使用翻译

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  return <button>{t('action.save')}</button>;
}
```

#### 5. Next.js Server Components

```typescript
import { getServerTranslation } from '@fluxsum/i18n/next';

export default async function Page() {
  const { t } = await getServerTranslation('zh-CN', ['common', 'dashboard']);
  return <h1>{t('page.title')}</h1>;
}
```

#### 6. Next.js Middleware (语言检测)

```typescript
// middleware.ts
import { createNextI18nMiddleware } from '@fluxsum/i18n/next';

export default createNextI18nMiddleware({
  defaultLocale: 'zh-CN',
  cookieName: 'FLUXSUM_LOCALE',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

### 后端 (Go)

#### 1. 生成 YAML 文件

```bash
bun run i18n:gen-go --dir packages/i18n --output apps/hub-central-server/i18n/locales
```

#### 2. 在 Go 项目中使用

```go
package main

import (
    "embed"
    fsi18n "github.com/fluxsum/go-utils/i18n"
)

//go:embed i18n/locales/*.yaml
var localeFS embed.FS

func main() {
    fsi18n.Init(fsi18n.InitConfig{
        LocaleFS: localeFS,
        Files:    []string{"i18n/locales/zh-CN.yaml", "i18n/locales/en-US.yaml"},
    })

    // 在 Gin 路由中使用中间件
    r := gin.Default()
    r.Use(fsi18n.Middleware())

    r.GET("/hello", func(c *gin.Context) {
        msg := fsi18n.T(c, "common.operation_success")
        c.JSON(200, gin.H{"message": msg})
    })
}
```

### 后端 (Python / FastAPI)

#### 1. 生成 JSON 文件

```bash
bun run i18n:gen-python --dir packages/i18n --output apps/your-python-svc/i18n/locales
```

#### 2. 在 Python 项目中使用

```python
from fastapi import FastAPI, Request
from fluxsum_utils.i18n import I18n
from fluxsum_utils.i18n_middleware import I18nMiddleware, get_locale

app = FastAPI()
app.add_middleware(I18nMiddleware)

i18n = I18n(locales_dir="./i18n/locales")

@app.get("/hello")
async def hello(request: Request):
    locale = get_locale(request)
    return {"message": i18n.t(locale, "common.operation_success")}
```

## 自动化工作流

### 本地开发

```bash
# 同步源语言变更 → 翻译 → 校验（一键完成）
bun run i18n

# 分步执行
bun run i18n:sync        # 同步 key 变更
bun run i18n:translate   # AI 翻译
bun run i18n:validate    # 校验完整性
```

### CI/CD 自动化

GitHub Actions 每天自动执行：

1. **同步**: 检测 zh-CN 源文件变更
2. **翻译**: 调用 AI 翻译缺失的 key
3. **校验**: 检查所有语言文件的完整性和格式
4. **PR**: 自动创建 Pull Request
5. **上传**: 合并后自动上传到阿里云 OSS + Cloudflare R2

### 环境变量

| 变量 | 用途 | 必填 |
|------|------|------|
| `OPENAI_API_KEY` | AI 翻译 API 密钥 | 翻译时 |
| `OPENAI_BASE_URL` | 自定义 API 地址 | 否 |
| `TRANSLATE_MODEL` | 翻译模型（默认 gpt-4o） | 否 |
| `ALIYUN_OSS_REGION` | 阿里云 OSS 区域 | 上传 CN 时 |
| `ALIYUN_OSS_BUCKET` | 阿里云 OSS 桶名 | 上传 CN 时 |
| `ALIYUN_ACCESS_KEY_ID` | 阿里云 AK | 上传 CN 时 |
| `ALIYUN_ACCESS_KEY_SECRET` | 阿里云 SK | 上传 CN 时 |
| `CF_R2_ACCOUNT_ID` | Cloudflare Account ID | 上传海外时 |
| `CF_R2_ACCESS_KEY_ID` | Cloudflare R2 AK | 上传海外时 |
| `CF_R2_ACCESS_KEY_SECRET` | Cloudflare R2 SK | 上传海外时 |
| `CF_R2_BUCKET` | R2 桶名 | 上传海外时 |

## 新增子项目 Checklist

1. 在项目目录下创建 `locales/zh-CN/` 目录
2. 添加 namespace JSON 文件（如 `common.json`, `dashboard.json`）
3. 在 `package.json` 中添加 i18n 相关脚本：
   ```json
   {
     "scripts": {
       "i18n": "tsx ../../packages/i18n/scripts/sync.ts --dir . && tsx ../../packages/i18n/scripts/translate.ts --dir . && tsx ../../packages/i18n/scripts/validate.ts --dir .",
       "i18n:translate": "tsx ../../packages/i18n/scripts/translate.ts --dir .",
       "i18n:validate": "tsx ../../packages/i18n/scripts/validate.ts --dir ."
     }
   }
   ```
4. 前端项目：使用 `createFluxsumI18n()` 初始化
5. Go 后端：运行 `gen-go.ts` 生成 YAML，使用 `go-utils/i18n` 包
6. Python 后端：运行 `gen-python.ts` 生成 JSON，使用 `fluxsum_utils.i18n`

## 翻译文件格式

所有翻译文件采用 **flat key** 格式（与 lobehub 保持一致）：

```json
{
  "action.cancel": "取消",
  "action.confirm": "确认",
  "error.network": "网络错误，请检查网络连接",
  "validation.field_required": "{{field}} 不能为空"
}
```

- Key 用 `.` 分隔层级，但在 i18next 中作为完整字符串（`keySeparator: false`）
- 插值变量使用 `{{variable}}` 格式
- 按 key 字母序排列
