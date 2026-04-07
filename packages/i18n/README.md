# @fluxsum/i18n

多语言国际化包，支持 15 种语言，采用 CDN 部署方式。

## 支持的语言

| 代码 | 语言 | 本地名称 | 方向 | CDN |
|------|------|----------|------|-----|
| en | English | English | LTR | Cloudflare |
| zh-CN | Chinese (Simplified) | 简体中文 | LTR | Aliyun |
| zh-TW | Chinese (Traditional) | 繁體中文 | LTR | Cloudflare |
| ja | Japanese | 日本語 | LTR | Cloudflare |
| ko | Korean | 한국어 | LTR | Cloudflare |
| es | Spanish | Español | LTR | Cloudflare |
| de | German | Deutsch | LTR | Cloudflare |
| fr | French | Français | LTR | Cloudflare |
| pt | Portuguese | Português | LTR | Cloudflare |
| it | Italian | Italiano | LTR | Cloudflare |
| ar | Arabic | العربية | RTL | Cloudflare |
| ru | Russian | Русский | LTR | Cloudflare |
| id | Indonesian | Bahasa Indonesia | LTR | Cloudflare |
| vi | Vietnamese | Tiếng Việt | LTR | Cloudflare |
| th | Thai | ไทย | LTR | Cloudflare |

## 使用方法

### 安装

```bash
pnpm add @fluxsum/i18n
```

### 初始化

```typescript
import { initI18n } from "@fluxsum/i18n";

await initI18n({
  locale: "zh-CN",
  debug: process.env.NODE_ENV === "development",
});
```

### React 中使用

```tsx
import { useI18n, useInitI18n } from "@fluxsum/i18n/react";

function App() {
  const { isReady, error } = useInitI18n();
  
  if (!isReady) return <div>Loading...</div>;
  if (error) return <div>Error loading translations</div>;
  
  return <MyApp />;
}

function MyComponent() {
  const { t, locale, switchLanguage, supportedLocales } = useI18n();
  
  return (
    <div>
      <h1>{t("app.name")}</h1>
      <select 
        value={locale} 
        onChange={(e) => switchLanguage(e.target.value)}
      >
        {supportedLocales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## 命令

```bash
# 生成缺失的语言文件
pnpm generate

# 验证所有语言文件
pnpm validate

# 从源码提取翻译 key
pnpm extract

# 上传到阿里云 OSS
pnpm upload:aliyun

# 上传到 Cloudflare R2
pnpm upload:cloudflare

# 上传到所有 CDN
pnpm upload
```

## CDN 部署

### 阿里云 OSS (中国区)

设置环境变量：
```bash
ALIYUN_OSS_REGION=oss-cn-shanghai
ALIYUN_ACCESS_KEY_ID=xxx
ALIYUN_ACCESS_KEY_SECRET=xxx
ALIYUN_OSS_BUCKET=fluxsum-i18n
```

### Cloudflare R2 (海外)

设置环境变量：
```bash
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_R2_ACCESS_KEY_ID=xxx
CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxx
CLOUDFLARE_R2_BUCKET=fluxsum-i18n
```

## 目录结构

```
packages/i18n/
├── src/
│   ├── index.ts          # 主入口
│   ├── react.ts          # React hooks
│   ├── types.ts          # 类型定义
│   ├── config.ts         # 配置
│   ├── i18n.ts           # i18next 封装
│   └── utils.ts          # 工具函数
├── locales/
│   ├── en/               # 英语 (基准)
│   │   ├── common.json
│   │   └── auth.json
│   ├── zh-CN/            # 简体中文
│   ├── ja/               # 日语
│   └── ...               # 其他语言
└── scripts/
    ├── generate.ts       # 生成缺失文件
    ├── validate.ts       # 验证文件
    ├── extract.ts        # 提取 key
    ├── upload-aliyun.ts  # 上传阿里云
    └── upload-cloudflare.ts # 上传 Cloudflare
```

## 添加新翻译

1. 在 `locales/en/` 中添加英文翻译（作为基准）
2. 运行 `pnpm generate` 生成其他语言文件
3. 翻译各语言文件
4. 运行 `pnpm validate` 验证
5. 运行 `pnpm upload` 部署到 CDN
