import { useState } from 'react';
import { Slider } from '@fluxsum/ui-kit';

export default () => {
  const [value, setValue] = useState([40]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>
          Value: {value[0]}
        </p>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
      <Slider defaultValue={[25]} max={100} step={5} />
      <Slider defaultValue={[20, 80]} max={100} />
      <Slider defaultValue={[50]} disabled />
    </div>
  );
};
