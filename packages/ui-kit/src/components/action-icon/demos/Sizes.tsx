import { ActionIcon } from '@fluxsum/ui-kit';
import { Settings } from 'lucide-react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <ActionIcon size="xs" variant="filled" tooltip="xs">
        <Settings size={12} />
      </ActionIcon>
      <ActionIcon size="small" variant="filled" tooltip="small">
        <Settings size={14} />
      </ActionIcon>
      <ActionIcon size="default" variant="filled" tooltip="default">
        <Settings size={16} />
      </ActionIcon>
      <ActionIcon size="large" variant="filled" tooltip="large">
        <Settings size={18} />
      </ActionIcon>
      <ActionIcon size="xl" variant="filled" tooltip="xl">
        <Settings size={20} />
      </ActionIcon>
    </div>
  );
};
