import { useState } from 'react';
import { Checkbox } from '@fluxsum/ui-kit';

export default () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox id="default" checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
        <label htmlFor="default" style={{ fontSize: 14, cursor: 'pointer' }}>
          Default checkbox
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox id="checked" defaultChecked />
        <label htmlFor="checked" style={{ fontSize: 14, cursor: 'pointer' }}>
          Checked by default
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" style={{ fontSize: 14, color: 'var(--color-muted-foreground)', cursor: 'not-allowed' }}>
          Disabled
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox id="indeterminate" checked="indeterminate" />
        <label htmlFor="indeterminate" style={{ fontSize: 14, cursor: 'pointer' }}>
          Indeterminate
        </label>
      </div>
    </div>
  );
};
