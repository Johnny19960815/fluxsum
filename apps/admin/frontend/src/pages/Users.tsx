import { Button } from "@fluxsum/ui-kit";

export function Users() {
  const users = [
    { id: 1, name: "张三", email: "zhangsan@example.com", role: "管理员" },
    { id: 2, name: "李四", email: "lisi@example.com", role: "用户" },
    { id: 3, name: "王五", email: "wangwu@example.com", role: "用户" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">用户管理</h2>
        <Button>添加用户</Button>
      </div>
      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium">姓名</th>
              <th className="px-4 py-3 text-left text-sm font-medium">邮箱</th>
              <th className="px-4 py-3 text-left text-sm font-medium">角色</th>
              <th className="px-4 py-3 text-left text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-3 text-sm">{user.id}</td>
                <td className="px-4 py-3 text-sm">{user.name}</td>
                <td className="px-4 py-3 text-sm">{user.email}</td>
                <td className="px-4 py-3 text-sm">{user.role}</td>
                <td className="px-4 py-3 text-sm">
                  <Button variant="ghost" size="sm">
                    编辑
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
