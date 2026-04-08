import { Hotkey } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Hotkey keys={['⌘', 'K']} />
        <Hotkey keys={['⌘', 'Shift', 'P']} />
        <Hotkey keys={['Ctrl', 'Z']} />
        <Hotkey keys={['Alt', 'F4']} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Hotkey keys={['⌘', 'C']} variant="outlined" />
        <Hotkey keys={['⌘', 'V']} variant="filled" />
        <Hotkey keys={['Escape']} size="sm" />
        <Hotkey keys={['Enter']} size="lg" />
      </div>
    </div>
  );
};
