import { Button, toast, Toaster } from '@fluxsum/ui-kit';

export default () => {
  return (
    <>
      <Toaster />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button
          variant="outline"
          onClick={() => toast({ title: '事件已创建', description: '周一 18:00' })}
        >
          默认提示
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast({ title: '操作失败', description: '请稍后重试。', variant: 'destructive' })}
        >
          错误提示
        </Button>
      </div>
    </>
  );
};
