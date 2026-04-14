import { baseColors, type BaseColor } from "@/registry/_legacy-base-colors"

export const THEMES = baseColors
  .filter((theme: BaseColor) => !["slate", "stone", "gray", "zinc"].includes(theme.name))
  .sort((a: BaseColor, b: BaseColor) => a.name.localeCompare(b.name))
