import { Divider } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <Divider align="center">OR</Divider>
      <Divider align="left">Continue with</Divider>
      <Divider align="right" variant="dashed">Section Title</Divider>
    </div>
  );
};
