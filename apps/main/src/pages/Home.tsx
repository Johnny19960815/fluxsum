import { Button } from "@fluxsum/ui";

export function Home() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">欢迎使用 Fluxsum</h2>
      <p className="text-muted-foreground">一站式服务全球</p>
      <div className="flex gap-4">
        <Button>开始使用</Button>
        <Button variant="outline">了解更多</Button>
      </div>
    </div>
  );
}
