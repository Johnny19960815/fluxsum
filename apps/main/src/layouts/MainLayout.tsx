import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Home, LayoutDashboard, Zap } from 'lucide-react'
import { cn } from '@fluxsum/ui'

const navItems = [
  { to: '/', icon: Home, label: '首页', end: true },
  { to: '/assets', icon: LayoutDashboard, label: '资产管理' },
  { to: '/aifoot', icon: Zap, label: 'AI 足球分析' },
]

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-52 border-r bg-card">
        <div className="flex h-16 items-center border-b px-4">
          <span className="text-lg font-bold tracking-tight">FluxSum</span>
        </div>
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b bg-card px-6">
          <h2 className="text-lg font-semibold">AI 聚合平台</h2>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
