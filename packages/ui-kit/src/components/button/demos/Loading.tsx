import { Button } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button loading>Loading</Button>
      <Button loading variant="secondary">Processing</Button>
      <Button loading variant="outline">Saving</Button>
    </div>
  );
};
