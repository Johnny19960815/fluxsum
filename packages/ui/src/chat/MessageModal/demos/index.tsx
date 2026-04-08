import { Button } from '@fluxsum/ui';
import { MessageModal } from '@fluxsum/ui/chat';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        open
      </Button>
      <MessageModal open={open} value={'editable text'} onOpenChange={setOpen} />
    </>
  );
};
