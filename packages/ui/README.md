# @fluxsum/ui

FluxSum 共享 UI 组件库，基于 shadcn/ui + Radix UI + Tailwind CSS 构建。

## 特性

- **68 个生产就绪组件** — 涵盖表单、数据展示、导航、反馈、布局、代码等场景
- **12 套主题** — zinc/slate/stone/gray/red/rose/orange/green/blue/violet/amber/teal
- **多端兼容** — 适配 Desktop、iPad、Mobile (H5)，触控友好
- **深色模式** — 内置亮色/暗色/跟随系统三种模式
- **SSR 兼容** — 所有客户端组件均标注 `'use client'`，服务端组件安全
- **TypeScript** — 完整的类型定义和 IntelliSense 支持
- **可定制** — 基于 CSS 变量的设计令牌系统，主题运行时切换
- **无障碍** — 基于 Radix UI 原语，符合 WAI-ARIA 标准

## 安装

```bash
bun add @fluxsum/ui
```

## 使用

```tsx
import { Button, Dialog, Card, ThemeProvider, useTheme } from '@fluxsum/ui'
import '@fluxsum/ui/styles.css'

function App() {
  return (
    <ThemeProvider defaultTheme="blue" defaultColorMode="system">
      <YourApp />
    </ThemeProvider>
  )
}
```

## 主题系统

支持 12 套预设主题，用户选择后可存储到用户信息表中，下次加载自动应用。

```tsx
import { useTheme, THEME_NAMES } from '@fluxsum/ui'

function ThemeSwitcher() {
  const { theme, setTheme, colorMode, setColorMode } = useTheme()
  return (
    <div>
      {THEME_NAMES.map(name => (
        <button key={name} onClick={() => setTheme(name)}>
          {name}
        </button>
      ))}
    </div>
  )
}
```

### 主题列表

| 名称 | 标签 | 色系 |
|------|------|------|
| zinc | 锌灰 | 中性灰 |
| slate | 石板灰 | 冷蓝灰 |
| stone | 暖石 | 暖褐灰 |
| gray | 灰色 | 纯灰 |
| red | 红色 | 活力红 |
| rose | 玫瑰 | 粉玫瑰 |
| orange | 橙色 | 暖橙 |
| green | 绿色 | 翠绿 |
| blue | 蓝色 | 标准蓝 |
| violet | 紫罗兰 | 紫色 |
| amber | 琥珀 | 金色 |
| teal | 蓝绿 | 青色 |

## 全部组件清单（68 个）

### 通用组件（7 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 1 | Button | `Button.tsx` | 按钮，支持多种变体和尺寸 |
| 2 | ButtonGroup | `ButtonGroup.tsx` | 按钮组，水平/垂直排列 |
| 3 | Badge | `Badge.tsx` | 徽标/标签 |
| 4 | Kbd | `Kbd.tsx` | 键盘快捷键展示 |
| 5 | Spinner | `Spinner.tsx` | 加载动画指示器 |
| 6 | CopyButton | `CopyButton.tsx` | 一键复制按钮（含反馈动画） |
| 7 | DownloadButton | `DownloadButton.tsx` | 文件下载按钮 |

### 布局组件（5 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 8 | Card | `Card.tsx` | 卡片容器 |
| 9 | Separator | `Separator.tsx` | 分割线 |
| 10 | AspectRatio | `AspectRatio.tsx` | 固定宽高比容器 |
| 11 | Resizable | `Resizable.tsx` | 可调整大小的面板 |
| 12 | Sidebar | `Sidebar.tsx` | 侧边栏导航布局 |

### 导航组件（6 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 13 | Breadcrumb | `Breadcrumb.tsx` | 面包屑导航 |
| 14 | NavigationMenu | `NavigationMenu.tsx` | 顶部导航菜单 |
| 15 | Menubar | `Menubar.tsx` | 菜单栏 |
| 16 | Pagination | `Pagination.tsx` | 分页器 |
| 17 | Tabs | `Tabs.tsx` | 标签页切换 |
| 18 | Segmented | `Segmented.tsx` | 分段控制器 |

### 数据录入组件（17 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 19 | Input | `Input.tsx` | 文本输入框 |
| 20 | Textarea | `Textarea.tsx` | 多行文本域 |
| 21 | Checkbox | `Checkbox.tsx` | 复选框 |
| 22 | RadioGroup | `RadioGroup.tsx` | 单选组 |
| 23 | Select | `Select.tsx` | 下拉选择器 |
| 24 | NativeSelect | `NativeSelect.tsx` | 原生下拉选择 |
| 25 | Switch | `Switch.tsx` | 开关切换 |
| 26 | Slider | `Slider.tsx` | 滑块 |
| 27 | Calendar | `Calendar.tsx` | 日历选择器 |
| 28 | InputOtp | `InputOtp.tsx` | OTP 验证码输入 |
| 29 | Form | `Form.tsx` | 表单容器（react-hook-form 集成） |
| 30 | Field | `Field.tsx` | 表单字段容器 |
| 31 | InputGroup | `InputGroup.tsx` | 输入框组合 |
| 32 | Toggle | `Toggle.tsx` | 切换按钮 |
| 33 | ToggleGroup | `ToggleGroup.tsx` | 切换按钮组 |
| 34 | ColorSwatches | `ColorSwatches.tsx` | 颜色选择面板 |
| 35 | CodeEditor | `CodeEditor.tsx` | 代码编辑器 |

### 数据展示组件（15 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 36 | Table | `Table.tsx` | 表格 |
| 37 | Avatar | `Avatar.tsx` | 头像 |
| 38 | GroupAvatar | `GroupAvatar.tsx` | 头像组（叠加展示+溢出计数） |
| 39 | Skeleton | `Skeleton.tsx` | 骨架屏加载占位 |
| 40 | Chart | `Chart.tsx` | 图表容器（Recharts 封装） |
| 41 | Empty | `Empty.tsx` | 空状态占位 |
| 42 | Item | `Item.tsx` | 通用列表项 |
| 43 | ScrollArea | `ScrollArea.tsx` | 自定义滚动区域 |
| 44 | List | `List.tsx` | 列表组件（含 ListItem 子组件） |
| 45 | FluxImage | `FluxImage.tsx` | 增强图片（加载态+模态预览） |
| 46 | Video | `Video.tsx` | 视频播放器（含播放覆盖层） |
| 47 | Highlighter | `Highlighter.tsx` | 代码高亮展示 |
| 48 | Snippet | `Snippet.tsx` | 代码片段（含复制功能） |
| 49 | CodeDiff | `CodeDiff.tsx` | 代码差异对比 |
| 50 | Label | `Label.tsx` | 表单标签 |

### 反馈组件（10 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 51 | Alert | `Alert.tsx` | 静态警告提示 |
| 52 | AlertDialog | `AlertDialog.tsx` | 确认对话框 |
| 53 | Dialog | `Dialog.tsx` | 模态对话框 |
| 54 | Drawer | `Drawer.tsx` | 抽屉面板 |
| 55 | Sheet | `Sheet.tsx` | 侧滑面板 |
| 56 | Popover | `Popover.tsx` | 弹出气泡 |
| 57 | HoverCard | `HoverCard.tsx` | 悬浮卡片 |
| 58 | Tooltip | `Tooltip.tsx` | 文字提示 |
| 59 | Sonner | `Sonner.tsx` | Toast 通知（sonner 集成） |
| 60 | Progress | `Progress.tsx` | 进度条 |

### 菜单组件（3 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 61 | DropdownMenu | `DropdownMenu.tsx` | 下拉菜单 |
| 62 | ContextMenu | `ContextMenu.tsx` | 右键上下文菜单 |
| 63 | Command | `Command.tsx` | 命令面板（cmdk 集成） |

### 折叠组件（3 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 64 | Accordion | `Accordion.tsx` | 手风琴折叠面板 |
| 65 | Collapse | `Collapse.tsx` | 折叠面板（多面板支持） |
| 66 | Collapsible | `Collapsible.tsx` | 可折叠内容区域 |

### 其他组件（2 个）

| # | 组件 | 文件 | 说明 |
|---|------|------|------|
| 67 | Carousel | `Carousel.tsx` | 走马灯/轮播 |
| 68 | Direction | `Direction.tsx` | RTL/LTR 方向控制 |

## Hooks

| Hook | 说明 |
|------|------|
| `useTheme()` | 主题切换（12 套主题 + 亮/暗/系统模式） |
| `useIsMobile()` | 检测移动端 (<768px) |
| `useIsTablet()` | 检测平板 (768-1023px) |
| `useIsDesktop()` | 检测桌面端 (>=1024px) |
| `useIsTouchDevice()` | 检测触控设备 |
| `useMediaQuery(query)` | 通用媒体查询 hook |

## 文档预览

```bash
cd packages/ui
bun install
bun run dev:docs
# 访问 http://localhost:4000
```

## License

MIT
