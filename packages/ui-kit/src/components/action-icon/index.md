---
nav: 组件
group: 通用
title: ActionIcon 图标按钮
description: 带 Tooltip 支持的图标按钮组件，支持多种变体、尺寸、加载状态和下拉菜单。
---

## 基本用法

<code src="./demos/index.tsx"></code>

## 变体

<code src="./demos/Variants.tsx"></code>

## 尺寸

<code src="./demos/Sizes.tsx"></code>

## API

### ActionIcon

| 属性      | 说明                               | 类型                                                                     | 默认值      |
| --------- | ---------------------------------- | ------------------------------------------------------------------------ | ----------- |
| variant   | 样式变体                           | `'ghost' \| 'filled' \| 'outlined' \| 'destructive'`                    | `'ghost'`   |
| size      | 按钮尺寸                           | `'xs' \| 'small' \| 'default' \| 'middle' \| 'large' \| 'lg' \| 'xl'`  | `'default'` |
| icon      | 图标元素或组件                     | `ReactNode`                                                              | -           |
| tooltip   | Tooltip 内容文本                   | `string`                                                                 | -           |
| active    | 激活状态                           | `boolean`                                                                | `false`     |
| danger    | 显示危险样式                       | `boolean`                                                                | `false`     |
| loading   | 显示加载动画                       | `boolean`                                                                | `false`     |
| spin      | 图标旋转动画                       | `boolean`                                                                | `false`     |
| glass     | 应用玻璃效果                       | `boolean`                                                                | `false`     |
| shadow    | 添加阴影效果                       | `boolean`                                                                | `false`     |
| disabled  | 禁用按钮                           | `boolean`                                                                | `false`     |
| asChild   | 作为子元素渲染（Radix Slot）       | `boolean`                                                                | `false`     |
| onClick   | 点击事件处理函数                   | `MouseEventHandler<HTMLButtonElement>`                                   | -           |
| onClick      | Click event handler               | `MouseEventHandler<HTMLButtonElement>`                                   | -              |
