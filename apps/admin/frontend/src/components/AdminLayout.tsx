import { Outlet, Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "仪表盘" },
  { path: "/users", label: "用户管理" },
  { path: "/settings", label: "系统设置" },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="text-xl font-bold">
            Fluxsum Admin
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">后台管理系统</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">管理员</span>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
