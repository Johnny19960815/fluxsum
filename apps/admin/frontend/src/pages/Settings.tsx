import { Button } from "@fluxsum/ui-kit";

export function Settings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">系统设置</h2>
      <div className="max-w-2xl space-y-6">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">基本设置</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">站点名称</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border px-3 py-2"
                defaultValue="Fluxsum"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">站点描述</label>
              <textarea
                className="mt-1 w-full rounded-md border px-3 py-2"
                rows={3}
                defaultValue="一站式服务全球"
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">安全设置</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">双因素认证</p>
                <p className="text-sm text-muted-foreground">
                  启用后需要额外验证
                </p>
              </div>
              <Button variant="outline">启用</Button>
            </div>
          </div>
        </div>
        <Button>保存设置</Button>
      </div>
    </div>
  );
}
