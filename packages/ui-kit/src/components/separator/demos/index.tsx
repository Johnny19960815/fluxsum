import { Separator } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ fontWeight: 500, fontSize: 14 }}>Radix UI</p>
        <p style={{ fontSize: 13, color: 'var(--color-muted-foreground)' }}>An open-source UI component library.</p>
      </div>
      <Separator />
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', height: 20 }}>
        <span style={{ fontSize: 13 }}>Blog</span>
        <Separator orientation="vertical" />
        <span style={{ fontSize: 13 }}>Docs</span>
        <Separator orientation="vertical" />
        <span style={{ fontSize: 13 }}>Source</span>
      </div>
    </div>
  );
};
