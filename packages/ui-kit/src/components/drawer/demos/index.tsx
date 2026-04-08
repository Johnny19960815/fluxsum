import { useState } from 'react';
import { Drawer, Button } from '@fluxsum/ui-kit';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} title="Drawer Title">
        <div style={{ padding: '16px 0', color: 'var(--color-muted-foreground)' }}>
          Drawer body content goes here. You can place any React elements inside.
        </div>
      </Drawer>
    </>
  );
};
