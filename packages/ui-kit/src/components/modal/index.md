---
nav: Components
group: Feedback
title: Modal
description: Modal dialog component built on Radix UI Dialog. Supports controlled/uncontrolled mode, fullscreen, loading confirmation, and customizable footer.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Fullscreen

<code src="./demos/Fullscreen.tsx"></code>

## APIs

### Modal

| Property       | Description                              | Type                       | Default  |
| -------------- | ---------------------------------------- | -------------------------- | -------- |
| open           | Whether the modal is visible             | `boolean`                  | -        |
| onOpenChange   | Callback when open state changes         | `(open: boolean) => void`  | -        |
| title          | Modal title                              | `ReactNode`                | -        |
| description    | Modal description                        | `ReactNode`                | -        |
| onOk           | Confirm button click handler             | `() => void \| Promise<void>` | -     |
| onCancel       | Cancel button click handler              | `() => void`               | -        |
| okText         | Confirm button text                      | `string`                   | `'OK'`   |
| cancelText     | Cancel button text                       | `string`                   | `'Cancel'` |
| okLoading      | Show loading on confirm button           | `boolean`                  | `false`  |
| footer         | Custom footer content                    | `ReactNode`                | -        |
| showFooter     | Whether to show the default footer       | `boolean`                  | `true`   |
| fullscreen     | Display in fullscreen mode               | `boolean`                  | `false`  |
| width          | Width of the modal                       | `string \| number`         | -        |
| closable       | Show close button                        | `boolean`                  | `true`   |
