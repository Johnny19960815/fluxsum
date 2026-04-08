import { Input } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Input placeholder="default" variant="default" />
      <Input placeholder="filled" variant="filled" />
      <Input placeholder="outlined" variant="outlined" />
      <Input placeholder="ghost" variant="ghost" />
      <Input placeholder="underline" variant="underline" />
      <Input placeholder="error state" error />
      <Input placeholder="success state" success />
    </div>
  );
};
