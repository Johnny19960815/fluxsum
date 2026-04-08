import { Input } from '@fluxsum/ui-kit';
import { Search, Mail, DollarSign } from 'lucide-react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Input placeholder="Search..." prefix={<Search size={14} />} />
      <Input placeholder="Email address" prefix={<Mail size={14} />} />
      <Input placeholder="Amount" prefix={<DollarSign size={14} />} suffix="USD" />
      <Input placeholder="Username" leftAddon="@" />
      <Input placeholder="Website" leftAddon="https://" rightAddon=".com" />
    </div>
  );
};
