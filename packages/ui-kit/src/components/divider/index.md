---
nav: Components
group: Layout
title: Divider
description: Divider separates content into groups. Supports horizontal and vertical orientations, dashed and dotted styles, and optional text label.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## With Text

<code src="./demos/WithText.tsx"></code>

## APIs

### Divider

| Property    | Description                       | Type                                           | Default        |
| ----------- | --------------------------------- | ---------------------------------------------- | -------------- |
| orientation | Direction of the divider          | `'horizontal' \| 'vertical'`                   | `'horizontal'` |
| variant     | Line style                        | `'solid' \| 'dashed' \| 'dotted'`              | `'solid'`      |
| thickness   | Line thickness                    | `'thin' \| 'default' \| 'thick'`               | `'default'`    |
| align       | Label alignment (when has label)  | `'left' \| 'center' \| 'right'`                | `'center'`     |
| label       | Text label on the divider         | `ReactNode`                                    | -              |
| decorative  | Mark as decorative (aria)         | `boolean`                                      | `true`         |
