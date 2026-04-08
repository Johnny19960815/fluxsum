---
nav: Components
group: Data Entry
title: Form
description: Form component built on React Hook Form with Zod validation support. Provides field wrappers with label, description, and error message display.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Form

Wraps `FormProvider` from `react-hook-form`. Accepts all React Hook Form context props.

### FormField

| Property | Description              | Type                              |
| -------- | ------------------------ | --------------------------------- |
| control  | React Hook Form control  | `Control<TFieldValues>`           |
| name     | Field name               | `Path<TFieldValues>`              |
| render   | Render prop with field   | `({ field }) => ReactNode`        |

Sub-components: `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`
