"use client"

import * as React from "react"
import { CheckIcon, PaletteIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFluxThemePreset } from "@/components/flux-theme-preset-provider"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import type { ThemeName } from "../../../src/themes/presets"

export function ThemePresetSwitcher({
  className,
}: {
  className?: string
}) {
  const { preset, setPreset, presets } = useFluxThemePreset()
  const current = presets.find((p) => p.name === preset)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "extend-touch-target size-8 gap-1",
            className
          )}
          aria-label="切换配色主题"
          title={current?.label ?? "主题"}
        >
          <PaletteIcon className="size-4" />
          <span className="sr-only">切换配色主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[min(70vh,420px)] w-48 overflow-y-auto">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          配色主题
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {presets.map((p) => (
          <DropdownMenuItem
            key={p.name}
            onClick={() => setPreset(p.name as ThemeName)}
            className="gap-2"
          >
            <span className="flex-1">{p.label}</span>
            {preset === p.name ? (
              <CheckIcon className="size-4 shrink-0" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
