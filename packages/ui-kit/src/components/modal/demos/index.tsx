import { useState } from 'react';
import { Modal, Button } from '@fluxsum/ui-kit';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Confirm Action"
        description="Are you sure you want to perform this action?"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
