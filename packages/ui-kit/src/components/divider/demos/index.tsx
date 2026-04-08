import { Divider } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14 }}>Solid (default)</p>
      <Divider />
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14 }}>Dashed</p>
      <Divider variant="dashed" />
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14 }}>Dotted</p>
      <Divider variant="dotted" />
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: 14 }}>Thick</p>
      <Divider size="thick" />
    </div>
  );
};
