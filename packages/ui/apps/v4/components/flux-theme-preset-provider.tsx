"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  getThemePreset,
  themePresets,
  THEME_NAMES,
  type ThemeName,
  type ThemeTokens,
} from "../../../src/themes/presets"

const STORAGE_KEY = "fluxsum-docs-theme-preset"

function applyThemeTokens(tokens: ThemeTokens, root: HTMLElement) {
  const entries = Object.entries(tokens) as [keyof ThemeTokens, string][]
  for (const [key, value] of entries) {
    root.style.setProperty(`--${key}`, `hsl(${value})`)
  }
  root.style.setProperty("--radius", "0.25rem")
}

type FluxThemePresetContextValue = {
  preset: ThemeName
  setPreset: (name: ThemeName) => void
  presets: typeof themePresets
}

const FluxThemePresetContext =
  React.createContext<FluxThemePresetContextValue | null>(null)

export function FluxThemePresetProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()
  const [preset, setPresetState] = React.useState<ThemeName>("zinc")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const s = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    if (s && THEME_NAMES.includes(s)) {
      setPresetState(s)
    }
  }, [])

  const setPreset = React.useCallback((name: ThemeName) => {
    setPresetState(name)
    localStorage.setItem(STORAGE_KEY, name)
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    const p = getThemePreset(preset)
    if (!p) return
    const isDark = resolvedTheme === "dark"
    const tokens = isDark ? p.dark : p.light
    applyThemeTokens(tokens, root)
  }, [preset, resolvedTheme])

  const value = React.useMemo(
    () => ({
      preset,
      setPreset,
      presets: themePresets,
    }),
    [preset, setPreset]
  )

  return (
    <FluxThemePresetContext.Provider value={value}>
      {children}
    </FluxThemePresetContext.Provider>
  )
}

export function useFluxThemePreset() {
  const ctx = React.useContext(FluxThemePresetContext)
  if (!ctx) {
    throw new Error(
      "useFluxThemePreset must be used within FluxThemePresetProvider"
    )
  }
  return ctx
}
