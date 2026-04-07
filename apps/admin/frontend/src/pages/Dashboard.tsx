export function Dashboard() {
  const stats = [
    { label: "总用户数", value: "12,345" },
    { label: "今日活跃", value: "1,234" },
    { label: "本月收入", value: "¥123,456" },
    { label: "订单数量", value: "5,678" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">仪表盘</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">最近活动</h3>
          <p className="mt-2 text-muted-foreground">暂无数据</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">系统状态</h3>
          <p className="mt-2 text-green-600">运行正常</p>
        </div>
      </div>
    </div>
  );
}
