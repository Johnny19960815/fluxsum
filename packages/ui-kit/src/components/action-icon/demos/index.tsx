import { ActionIcon } from '@fluxsum/ui-kit';
import { Settings } from 'lucide-react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <ActionIcon tooltip="Settings">
        <Settings size={16} />
      </ActionIcon>
      <ActionIcon variant="filled" tooltip="Settings (filled)">
        <Settings size={16} />
      </ActionIcon>
      <ActionIcon variant="outline" tooltip="Settings (outlined)">
        <Settings size={16} />
      </ActionIcon>
    </div>
  );
};
