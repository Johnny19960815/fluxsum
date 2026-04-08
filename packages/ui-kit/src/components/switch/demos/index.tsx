import { Switch } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch id="s1" />
        <label htmlFor="s1" style={{ fontSize: 14, cursor: 'pointer' }}>Default switch</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch id="s2" defaultChecked />
        <label htmlFor="s2" style={{ fontSize: 14, cursor: 'pointer' }}>Checked by default</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch id="s3" disabled />
        <label htmlFor="s3" style={{ fontSize: 14, color: 'var(--color-muted-foreground)', cursor: 'not-allowed' }}>Disabled</label>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Switch size="sm" />
        <Switch size="default" />
        <Switch size="lg" />
      </div>
    </div>
  );
};
