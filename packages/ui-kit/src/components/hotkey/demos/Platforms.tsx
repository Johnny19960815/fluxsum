import { Hotkey } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>Apple style</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Hotkey keys={['⌘', 'K']} isApple />
          <Hotkey keys={['⌥', 'Tab']} isApple />
          <Hotkey keys={['⇧', '⌘', 'P']} isApple />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>Windows style</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Hotkey keys={['Ctrl', 'K']} isApple={false} />
          <Hotkey keys={['Alt', 'Tab']} isApple={false} />
          <Hotkey keys={['Ctrl', 'Shift', 'P']} isApple={false} />
        </div>
      </div>
    </div>
  );
};
