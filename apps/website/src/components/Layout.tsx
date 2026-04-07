import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold">
            Fluxsum
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              首页
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              关于我们
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary">
              联系我们
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 Fluxsum. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
