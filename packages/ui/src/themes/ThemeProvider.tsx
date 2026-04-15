'use client'

import * as React from 'react'
import type { ThemeName, ThemeTokens } from './presets'
import { getThemePreset, themePresets, THEME_NAMES } from './presets'

type ColorMode = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  resolvedColorMode: 'light' | 'dark'
  themes: typeof themePresets
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

function applyThemeTokens(tokens: ThemeTokens, element: HTMLElement) {
  const entries = Object.entries(tokens) as [keyof ThemeTokens, string][]
  for (const [key, value] of entries) {
    element.style.setProperty(`--${key}`, value)
  }
  element.style.setProperty('--radius', '0.25rem')
}

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeName
  defaultColorMode?: ColorMode
  storageKeyTheme?: string
  storageKeyColorMode?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'zinc',
  defaultColorMode = 'system',
  storageKeyTheme = 'fluxsum-theme',
  storageKeyColorMode = 'fluxsum-color-mode',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeName>(() => {
    if (typeof window === 'undefined') return defaultTheme
    const stored = localStorage.getItem(storageKeyTheme) as ThemeName | null
    return stored && THEME_NAMES.includes(stored) ? stored : defaultTheme
  })

  const [colorMode, setColorModeState] = React.useState<ColorMode>(() => {
    if (typeof window === 'undefined') return defaultColorMode
    return (localStorage.getItem(storageKeyColorMode) as ColorMode) || defaultColorMode
  })

  const [resolvedColorMode, setResolvedColorMode] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const resolve = () => {
      if (colorMode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return colorMode
    }
    setResolvedColorMode(resolve())

    if (colorMode === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => setResolvedColorMode(mql.matches ? 'dark' : 'light')
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
  }, [colorMode])

  React.useEffect(() => {
    const root = document.documentElement
    const preset = getThemePreset(theme)
    if (!preset) return

    const tokens = resolvedColorMode === 'dark' ? preset.dark : preset.light
    applyThemeTokens(tokens, root)

    root.classList.remove('light', 'dark')
    root.classList.add(resolvedColorMode)
    root.setAttribute('data-theme', theme)
  }, [theme, resolvedColorMode])

  const setTheme = React.useCallback(
    (t: ThemeName) => {
      setThemeState(t)
      localStorage.setItem(storageKeyTheme, t)
    },
    [storageKeyTheme],
  )

  const setColorMode = React.useCallback(
    (m: ColorMode) => {
      setColorModeState(m)
      localStorage.setItem(storageKeyColorMode, m)
    },
    [storageKeyColorMode],
  )

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      colorMode,
      setColorMode,
      resolvedColorMode,
      themes: themePresets,
    }),
    [theme, setTheme, colorMode, setColorMode, resolvedColorMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
