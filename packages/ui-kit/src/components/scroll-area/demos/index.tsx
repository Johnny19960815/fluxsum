import { ScrollArea } from '@fluxsum/ui-kit';

const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export default () => {
  return (
    <ScrollArea style={{ height: 240, width: 320, border: '1px solid var(--color-border)', borderRadius: 8 }}>
      <div style={{ padding: '8px 16px' }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: '8px 0',
              borderBottom: '1px solid var(--color-border)',
              fontSize: 14,
              color: 'var(--color-foreground)',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
