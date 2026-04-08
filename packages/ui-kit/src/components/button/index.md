---
nav: Components
group:
  title: 通用
  order: -1
title: Button 按钮
description: 通用按钮组件，支持多种变体、尺寸、图标位置、加载状态及阴影/玻璃效果。
---

## 基本用法

<code src="./demos/index.tsx"></code>

## 变体

Button 支持多种样式变体，包括 `default`、`secondary`、`outline`、`ghost`、`link`、`destructive`、`success`、`warning` 和 `info`。

<code src="./demos/Variants.tsx"></code>

## 尺寸

<code src="./demos/Sizes.tsx"></code>

## 图标

<code src="./demos/Icons.tsx"></code>

## 加载状态

<code src="./demos/Loading.tsx"></code>

## API

### Button

| 属性      | 说明                               | 类型                                                                                    | 默认值      |
| --------- | ---------------------------------- | --------------------------------------------------------------------------------------- | ----------- |
| variant   | 样式变体                           | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' \| 'shadow' \| 'glass'` | `'default'` |
| size      | 按钮尺寸                           | `'default' \| 'sm' \| 'lg' \| 'icon'`                                                  | `'default'` |
| loading   | 是否显示加载动画                   | `boolean`                                                                               | `false`     |
| disabled  | 是否禁用按钮                       | `boolean`                                                                               | `false`     |
| block     | 是否占满父元素宽度                 | `boolean`                                                                               | `false`     |
| leftIcon  | 左侧图标                           | `ReactNode`                                                                             | -           |
| rightIcon | 右侧图标                           | `ReactNode`                                                                             | -           |
| shadow    | 是否添加阴影效果                   | `boolean`                                                                               | `false`     |
| glass     | 是否应用玻璃拟态效果               | `boolean`                                                                               | `false`     |
| asChild   | 作为子元素渲染（Radix Slot）       | `boolean`                                                                               | `false`     |
| onClick   | 点击事件处理函数                   | `MouseEventHandler<HTMLButtonElement>`                                                        | -           |
