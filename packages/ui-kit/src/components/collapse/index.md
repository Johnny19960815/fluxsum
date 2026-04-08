---
nav: Components
group: Data Display
title: Collapse
description: Collapse component for displaying collapsible content panels. Supports single and multiple expansion modes with smooth animations.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Collapse

| Property        | Description                              | Type                                  | Default     |
| --------------- | ---------------------------------------- | ------------------------------------- | ----------- |
| items           | Array of collapse panel configurations  | `CollapseItemType[]`                  | `[]`        |
| defaultActiveKey | Default expanded key(s)                 | `string \| string[]`                  | -           |
| activeKey       | Controlled expanded key(s)              | `string \| string[]`                  | -           |
| onChange        | Callback when expanded panels change     | `(key: string \| string[]) => void`   | -           |
| variant         | Style variant                            | `'default' \| 'bordered' \| 'ghost'`  | `'default'` |
| accordion       | Whether only one panel can be open       | `boolean`                             | `false`     |

### CollapseItemType

| Property  | Description            | Type        | Default |
| --------- | ---------------------- | ----------- | ------- |
| key       | Unique key             | `string`    | -       |
| label     | Panel header text      | `ReactNode` | -       |
| children  | Panel content          | `ReactNode` | -       |
| disabled  | Disable this panel     | `boolean`   | `false` |
