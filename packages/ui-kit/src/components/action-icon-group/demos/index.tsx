import { ActionIconGroup, ActionIcon, Tooltip } from '@fluxsum/ui-kit';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ActionIconGroup>
        <Tooltip title="Bold">
          <ActionIcon><Bold size={14} /></ActionIcon>
        </Tooltip>
        <Tooltip title="Italic">
          <ActionIcon><Italic size={14} /></ActionIcon>
        </Tooltip>
        <Tooltip title="Underline">
          <ActionIcon><Underline size={14} /></ActionIcon>
        </Tooltip>
      </ActionIconGroup>
      <ActionIconGroup variant="outlined">
        <Tooltip title="Align Left">
          <ActionIcon variant="outlined"><AlignLeft size={14} /></ActionIcon>
        </Tooltip>
        <Tooltip title="Align Center">
          <ActionIcon variant="outlined"><AlignCenter size={14} /></ActionIcon>
        </Tooltip>
        <Tooltip title="Align Right">
          <ActionIcon variant="outlined"><AlignRight size={14} /></ActionIcon>
        </Tooltip>
      </ActionIconGroup>
    </div>
  );
};
