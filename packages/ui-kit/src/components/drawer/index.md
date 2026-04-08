---
nav: Components
group: Feedback
title: Drawer
description: Drawer slides in from the edge of the screen. Supports four directions, custom sizes, and nested content.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Directions

<code src="./demos/Directions.tsx"></code>

## APIs

### Drawer

| Property     | Description                         | Type                                          | Default   |
| ------------ | ----------------------------------- | --------------------------------------------- | --------- |
| open         | Whether the drawer is visible       | `boolean`                                     | -         |
| onOpenChange | Callback when open state changes    | `(open: boolean) => void`                     | -         |
| side         | Side from which the drawer appears  | `'top' \| 'right' \| 'bottom' \| 'left'`     | `'right'` |
| title        | Drawer title                        | `ReactNode`                                   | -         |
| description  | Drawer description                  | `ReactNode`                                   | -         |
| footer       | Footer content                      | `ReactNode`                                   | -         |
| size         | Size preset                         | `'sm' \| 'default' \| 'lg' \| 'xl' \| 'full'` | `'default'` |
| closable     | Show close button                   | `boolean`                                     | `true`    |

Sub-components: `DrawerTrigger`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerContent`, `DrawerFooter`, `DrawerClose`
