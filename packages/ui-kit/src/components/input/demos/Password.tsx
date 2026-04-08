import { InputPassword } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <InputPassword placeholder="Enter password" />
      <InputPassword placeholder="Filled password" variant="filled" />
    </div>
  );
};
