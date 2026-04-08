import { Popover, PopoverContent, PopoverTrigger, Button } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: 280 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontWeight: 600, fontSize: 14 }}>Popover Title</p>
            <p style={{ fontSize: 13, color: 'var(--color-muted-foreground)' }}>
              This is the popover content. You can place any content here.
            </p>
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top placement</Button>
        </PopoverTrigger>
        <PopoverContent side="top" style={{ width: 220 }}>
          <p style={{ fontSize: 13 }}>Appears above the trigger.</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};
