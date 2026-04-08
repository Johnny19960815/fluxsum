import { Tooltip, ActionIcon } from '@fluxsum/ui-kit';
import { Settings, Copy, Search } from 'lucide-react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip title="Settings" hotkey={['⌘', ',']}>
        <ActionIcon variant="filled">
          <Settings size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip title="Copy" hotkey={['⌘', 'C']}>
        <ActionIcon variant="filled">
          <Copy size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip title="Search" hotkey={['⌘', 'K']}>
        <ActionIcon variant="filled">
          <Search size={16} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};
