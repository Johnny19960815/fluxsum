import { Label, Input, Checkbox, Switch } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" placeholder="John Doe" style={{ maxWidth: 300 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
    </div>
  );
};
