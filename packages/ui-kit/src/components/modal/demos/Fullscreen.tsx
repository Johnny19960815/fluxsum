import { useState } from 'react';
import { Modal, Button } from '@fluxsum/ui-kit';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Fullscreen Modal
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Fullscreen Modal"
        description="This modal covers the entire screen."
        fullscreen
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
