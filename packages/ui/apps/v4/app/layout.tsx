import type { Metadata, Viewport } from "next"

import { siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { FluxThemePresetProvider } from "@/components/flux-theme-preset-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/registry/new-york-v4/ui/tooltip"
import { Toaster } from "@/registry/new-york-v4/ui/sonner"

import "@/app/globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(222.2 84% 4.9%)" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={fontVariables}>
      <body
        className={cn(
          "min-h-svh overscroll-none bg-background antialiased",
          "supports-[padding:env(safe-area-inset-bottom)]:pb-[env(safe-area-inset-bottom)]"
        )}
      >
        <ThemeProvider>
          <FluxThemePresetProvider>
            <TooltipProvider delayDuration={0}>
              {children}
              <Toaster position="top-center" />
            </TooltipProvider>
          </FluxThemePresetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
