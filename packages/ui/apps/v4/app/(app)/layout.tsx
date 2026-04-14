import { SiteHeader } from "@/components/site-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  )
}
