import { Button } from "@fluxsum/ui-kit";

export function Contact() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold">联系我们</h1>
        <div className="mt-8 max-w-lg">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium">姓名</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="请输入您的姓名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">邮箱</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="请输入您的邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">留言</label>
              <textarea
                className="mt-1 w-full rounded-md border px-3 py-2"
                rows={4}
                placeholder="请输入您的留言"
              />
            </div>
            <Button type="submit">提交</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
