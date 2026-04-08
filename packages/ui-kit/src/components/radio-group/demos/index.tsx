import { RadioGroup, RadioGroupItem } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 48 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 12 }}>Vertical (default)</p>
        <RadioGroup defaultValue="option1">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RadioGroupItem value="option1" id="r1" />
            <label htmlFor="r1" style={{ fontSize: 14, cursor: 'pointer' }}>Option One</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RadioGroupItem value="option2" id="r2" />
            <label htmlFor="r2" style={{ fontSize: 14, cursor: 'pointer' }}>Option Two</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RadioGroupItem value="option3" id="r3" disabled />
            <label htmlFor="r3" style={{ fontSize: 14, color: 'var(--color-muted-foreground)', cursor: 'not-allowed' }}>
              Disabled
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
