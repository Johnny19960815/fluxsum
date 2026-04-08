import { Input } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Input placeholder="Default input" />
      <Input placeholder="Filled variant" variant="filled" />
      <Input placeholder="Underline variant" variant="underline" />
      <Input placeholder="Ghost variant" variant="ghost" />
    </div>
  );
};
