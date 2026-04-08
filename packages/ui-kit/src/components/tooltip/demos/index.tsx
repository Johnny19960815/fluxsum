import { Tooltip, Button } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tooltip title="This is a tooltip">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
      <Tooltip title="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip title="Right tooltip" side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip title="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
    </div>
  );
};
