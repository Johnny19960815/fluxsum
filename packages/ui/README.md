# @fluxsum/ui

FluxSum 共享 UI 组件库，基于 shadcn/ui + Radix UI + Tailwind CSS 构建，面向中后台、AI 应用、微前端子系统和多端业务页面复用。

## AI 使用前必读

如果你是 AI 助手，或希望后续让 AI 基于本库生成页面代码，请优先遵守下面这些规则：

1. **导出源以 `src/index.ts` 为准。**
   文档页里有些内容是“文档模式”或“组合示例”，并不是包的直接导出。
2. **样式文件全局只引入一次。**
   ```tsx
   import "@fluxsum/ui/styles.css"
   ```
3. **需要主题能力时，应用根节点外层包裹 `ThemeProvider`。**
4. **如果业务文件里直接调用 React Hook，例如 `useTheme()`、`useIsMobile()`，当前文件必须加 `'use client'`。**
5. **图表能力的推荐入口不是 `Chart`，而是：**
   `ChartContainer`、`ChartTooltip`、`ChartTooltipContent`、`ChartLegend`、`ChartLegendContent`。
6. **Toast 能力的导出名是 `Toaster`，不是 `Sonner`。**
7. **OTP 组件的导出名是 `InputOTP`，不是 `InputOtp`。**
8. **方向控制能力的导出名是 `DirectionProvider` 和 `useDirection()`，不是 `Direction`。**
9. **文档里的 `Combobox`、`Data Table`、`Date Picker`、`Typography` 是文档页面，不是 `@fluxsum/ui` 的直接导出。**
10. **业务代码中推荐只导入实际使用到的组件。**

## 特性

- **68 个生产可用组件**：覆盖表单、布局、导航、反馈、代码展示、媒体展示等常见场景
- **12 套主题预设**：`zinc`、`slate`、`stone`、`gray`、`red`、`rose`、`orange`、`green`、`blue`、`violet`、`amber`、`teal`
- **多端兼容**：适配 Desktop、iPad、Mobile (H5)
- **深色模式**：内置亮色、暗色、跟随系统三种模式
- **SSR 兼容**：客户端交互组件已处理客户端边界
- **TypeScript 友好**：完整类型导出，便于 AI 和 IDE 自动补全
- **可定制**：基于 CSS 变量和主题令牌系统
- **无障碍**：基于 Radix UI 原语，默认具备较好的键盘和语义支持

## 安装

```bash
bun add @fluxsum/ui
```

## 快速开始

```tsx
import "@fluxsum/ui/styles.css"
import { Button, Card, Dialog, ThemeProvider } from "@fluxsum/ui"

export default function App() {
  return (
    <ThemeProvider defaultTheme="blue" defaultColorMode="system">
      <Card>
        <Button>提交</Button>
      </Card>
    </ThemeProvider>
  )
}
```

## 主题系统

支持 12 套预设主题，适合将用户主题偏好存入用户信息表，并在下次进入时恢复。

```tsx
'use client'

import { THEME_NAMES, useTheme } from "@fluxsum/ui"

export function ThemeSwitcher() {
  const { theme, setTheme, colorMode, setColorMode } = useTheme()

  return (
    <div>
      <div>当前主题：{theme}</div>
      <div>当前模式：{colorMode}</div>

      {THEME_NAMES.map((name) => (
        <button key={name} onClick={() => setTheme(name)}>
          {name}
        </button>
      ))}

      <button onClick={() => setColorMode("light")}>浅色</button>
      <button onClick={() => setColorMode("dark")}>深色</button>
      <button onClick={() => setColorMode("system")}>跟随系统</button>
    </div>
  )
}
```

### 主题列表

| 名称 | 标签 | 色系 |
| --- | --- | --- |
| `zinc` | 锌灰 | 中性灰 |
| `slate` | 石板灰 | 冷蓝灰 |
| `stone` | 暖石 | 暖褐灰 |
| `gray` | 灰色 | 纯灰 |
| `red` | 红色 | 活力红 |
| `rose` | 玫瑰 | 粉玫瑰 |
| `orange` | 橙色 | 暖橙 |
| `green` | 绿色 | 翠绿 |
| `blue` | 蓝色 | 标准蓝 |
| `violet` | 紫罗兰 | 紫色 |
| `amber` | 琥珀 | 金色 |
| `teal` | 蓝绿 | 青色 |

## 推荐选型

| 场景 | 推荐组件 |
| --- | --- |
| 普通按钮 / 提交按钮 | `Button` |
| 一组互斥按钮 | `Segmented`、`Tabs`、`ToggleGroup` |
| 表单容器 | `Form`、`Field` |
| 输入框前后缀 | `InputGroup` |
| 二次确认 | `AlertDialog` |
| 弹窗表单 | `Dialog`、`Drawer`、`Sheet` |
| 下拉菜单 / 右键菜单 | `DropdownMenu`、`ContextMenu` |
| 代码展示 | `Highlighter`、`Snippet`、`CodeDiff` |
| 文件操作 | `CopyButton`、`DownloadButton` |
| 媒体展示 | `FluxImage`、`Video` |
| 图表 | `ChartContainer` + Recharts 组件 |
| 左侧导航布局 | `Sidebar` |
| 列表型内容 | `List`、`Item`、`ScrollArea` |

## 导出源与文档源

- **包导出源**：`packages/ui/src/index.ts`
- **组件源码目录**：`packages/ui/src/components`
- **文档目录**：`packages/ui/apps/v4/content/docs/components`
- **图表文档目录**：`packages/ui/apps/v4/content/docs/charts`

如果 AI 需要判断“一个名字能不能直接从 `@fluxsum/ui` 导入”，请以 `src/index.ts` 为最终准则。

## 全部组件清单（68 个）

下面按“文档名称 / 推荐导入名 / 典型用途”列出，便于 AI 直接生成正确 import。

### 通用组件（7 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 1 | Button | `Button` | 主按钮、次按钮、危险操作按钮 |
| 2 | ButtonGroup | `ButtonGroup` | 一组水平或垂直按钮 |
| 3 | Badge | `Badge` | 状态标签、数量标签 |
| 4 | Kbd | `Kbd` | 快捷键提示 |
| 5 | Spinner | `Spinner` | 加载指示器 |
| 6 | CopyButton | `CopyButton` | 复制文本、代码、命令 |
| 7 | DownloadButton | `DownloadButton` | 下载文件、导出内容 |

### 布局组件（5 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 8 | Card | `Card` | 卡片容器 |
| 9 | Separator | `Separator` | 分隔区域 |
| 10 | AspectRatio | `AspectRatio` | 固定比例媒体容器 |
| 11 | Resizable | `ResizablePanelGroup` | 可拖拽面板布局 |
| 12 | Sidebar | `Sidebar` | 应用级侧边栏布局 |

### 导航组件（6 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 13 | Breadcrumb | `Breadcrumb` | 面包屑导航 |
| 14 | NavigationMenu | `NavigationMenu` | 顶部导航菜单 |
| 15 | Menubar | `Menubar` | 桌面端菜单栏 |
| 16 | Pagination | `Pagination` | 列表分页 |
| 17 | Tabs | `Tabs` | 标签页切换 |
| 18 | Segmented | `Segmented` | 轻量分段切换 |

### 数据录入组件（17 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 19 | Input | `Input` | 单行输入 |
| 20 | Textarea | `Textarea` | 多行输入 |
| 21 | Checkbox | `Checkbox` | 多选 |
| 22 | RadioGroup | `RadioGroup` | 单选 |
| 23 | Select | `Select` | 自定义下拉选择 |
| 24 | NativeSelect | `NativeSelect` | 原生选择器 |
| 25 | Switch | `Switch` | 开关 |
| 26 | Slider | `Slider` | 连续值滑动输入 |
| 27 | Calendar | `Calendar` | 日期面板 |
| 28 | InputOtp | `InputOTP` | 验证码输入 |
| 29 | Form | `Form` | 表单容器，集成 `react-hook-form` |
| 30 | Field | `Field` | 字段级标签、描述、错误信息 |
| 31 | InputGroup | `InputGroup` | 前后缀输入框 |
| 32 | Toggle | `Toggle` | 可开关按钮 |
| 33 | ToggleGroup | `ToggleGroup` | 一组 Toggle |
| 34 | ColorSwatches | `ColorSwatches` | 颜色选择面板 |
| 35 | CodeEditor | `CodeEditor` | 代码编辑输入 |

### 数据展示组件（15 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 36 | Table | `Table` | 表格展示 |
| 37 | Avatar | `Avatar` | 单个头像 |
| 38 | GroupAvatar | `GroupAvatar` | 多头像叠加 |
| 39 | Skeleton | `Skeleton` | 骨架屏 |
| 40 | Chart | `ChartContainer` | 图表容器与图例/提示框能力 |
| 41 | Empty | `Empty` | 空状态页 |
| 42 | Item | `Item` | 通用信息项 |
| 43 | ScrollArea | `ScrollArea` | 自定义滚动容器 |
| 44 | List | `List` | 列表与列表项 |
| 45 | FluxImage | `FluxImage` | 带加载态和预览的图片 |
| 46 | Video | `Video` | 视频播放器 |
| 47 | Highlighter | `Highlighter` | 代码展示与复制 |
| 48 | Snippet | `Snippet` | 一行命令或短代码片段 |
| 49 | CodeDiff | `CodeDiff` | 差异比对视图 |
| 50 | Label | `Label` | 表单标签 |

### 反馈组件（10 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 51 | Alert | `Alert` | 静态提示 |
| 52 | AlertDialog | `AlertDialog` | 危险操作确认 |
| 53 | Dialog | `Dialog` | 模态弹窗 |
| 54 | Drawer | `Drawer` | 底部或侧边抽屉 |
| 55 | Sheet | `Sheet` | 侧滑面板 |
| 56 | Popover | `Popover` | 小浮层 |
| 57 | HoverCard | `HoverCard` | Hover 信息卡片 |
| 58 | Tooltip | `Tooltip` | 文本提示 |
| 59 | Sonner | `Toaster` | Toast 通知容器 |
| 60 | Progress | `Progress` | 进度条 |

### 菜单组件（3 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 61 | DropdownMenu | `DropdownMenu` | 操作菜单 |
| 62 | ContextMenu | `ContextMenu` | 右键菜单 |
| 63 | Command | `Command` | 命令面板、搜索面板 |

### 折叠组件（3 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 64 | Accordion | `Accordion` | 手风琴结构 |
| 65 | Collapse | `Collapse` | 多面板折叠 |
| 66 | Collapsible | `Collapsible` | 局部展开/收起 |

### 其他组件（2 个）

| # | 文档名称 | 推荐导入名 | 典型用途 |
| --- | --- | --- | --- |
| 67 | Carousel | `Carousel` | 轮播图 |
| 68 | Direction | `DirectionProvider` | RTL / LTR 方向控制 |

## 仅文档示例，不是包的直接导出

下面这些页面存在于文档站中，但 **不能** 直接写成 `import { Xxx } from "@fluxsum/ui"`：

| 文档页 | 说明 | 正确做法 |
| --- | --- | --- |
| `Combobox` | 组合模式示例 | 用 `Popover` + `Command` + `Button` 组合实现 |
| `Data Table` | 表格方案示例 | 用 `Table` 配合业务逻辑、筛选、分页自己组合 |
| `Date Picker` | 组合模式示例 | 用 `Popover` + `Calendar` 组合实现 |
| `Typography` | 文档样式示例 | 在业务里自行定义排版组件或样式 |

## 图表使用方式

图表文档在 `/docs/charts`，推荐组合方式如下：

```tsx
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@fluxsum/ui"
import { Bar, BarChart, XAxis } from "recharts"
```

图表本身使用 Recharts 组件，`@fluxsum/ui` 负责容器、主题颜色、tooltip 和 legend 这些 UI 层能力。

## Hooks

| Hook | 用途 |
| --- | --- |
| `useTheme()` | 切换 12 套主题和亮/暗/系统模式 |
| `useIsMobile()` | 检测移动端（`<768px`） |
| `useIsTablet()` | 检测平板（`768-1023px`） |
| `useIsDesktop()` | 检测桌面端（`>=1024px`） |
| `useIsTouchDevice()` | 检测是否为触控设备 |
| `useMediaQuery(query)` | 通用媒体查询 Hook |
| `useDirection()` | 获取当前方向上下文 |

## 文档预览

```bash
cd packages/ui
bun install
bun run dev:docs
# 打开 http://localhost:4000
```

## License

MIT
