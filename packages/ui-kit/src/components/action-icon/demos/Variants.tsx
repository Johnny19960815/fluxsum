import { ActionIcon } from '@fluxsum/ui-kit';
import { Settings } from 'lucide-react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <ActionIcon tooltip="ghost (default)">
        <Settings size={16} />
      </ActionIcon>
      <ActionIcon variant="filled" tooltip="filled">
        <Settings size={16} />
      </ActionIcon>
      <ActionIcon variant="outline" tooltip="outlined">
        <Settings size={16} />
      </ActionIcon>
      <ActionIcon danger tooltip="danger">
        <Settings size={16} />
      </ActionIcon>
      <ActionIcon shadow variant="outline" tooltip="with shadow">
        <Settings size={16} />
      </ActionIcon>
    </div>
  );
};
