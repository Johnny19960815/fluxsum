import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@fluxsum/ui";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md rounded-lg border bg-background p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Fluxsum Admin</h1>
          <p className="mt-2 text-muted-foreground">登录后台管理系统</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="请输入密码"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>
      </div>
    </div>
  );
}
