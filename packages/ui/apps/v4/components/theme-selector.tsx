"use client"

import { THEMES } from "@/lib/themes"
import { cn } from "@/lib/utils"
import { useThemeConfig } from "@/components/active-theme"
import { type BaseColor } from "@/registry/_legacy-base-colors"
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"

import { CopyCodeButton } from "./theme-customizer"

export function ThemeSelector({ className }: React.ComponentProps<"div">) {
  const { activeTheme, setActiveTheme } = useThemeConfig()

  const value = activeTheme === "default" ? "neutral" : activeTheme

  const items = THEMES.map((theme: BaseColor) => ({
    label: theme.label,
    value: theme.name,
  }))

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>
      <Select
        value={value}
        onValueChange={(value: string) => value && setActiveTheme(value)}
      >
        <SelectTrigger id="theme-selector" className="w-36">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Theme</SelectLabel>
            {items.map((item: { label: string; value: string }) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="data-[state=checked]:opacity-50"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <CopyCodeButton
        variant="secondary"
        size="icon-sm"
        className="rounded-lg border bg-transparent"
      />
    </div>
  )
}
