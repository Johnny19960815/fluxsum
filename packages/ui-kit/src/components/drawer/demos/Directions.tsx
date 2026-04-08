import { useState } from 'react';
import { Drawer, Button } from '@fluxsum/ui-kit';

export default () => {
  const [placement, setPlacement] = useState<'top' | 'right' | 'bottom' | 'left' | null>(null);

  return (
    <>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {(['top', 'right', 'bottom', 'left'] as const).map((s) => (
          <Button key={s} variant="outline" onClick={() => setPlacement(s)}>
            Open {s}
          </Button>
        ))}
      </div>
      {placement && (
        <Drawer open={!!placement} onOpenChange={(o) => !o && setPlacement(null)} placement={placement} title={`${placement} Drawer`}>
          <div style={{ padding: '16px 0', color: 'var(--color-muted-foreground)' }}>
            Content slides in from the {placement}.
          </div>
        </Drawer>
      )}
    </>
  );
};
