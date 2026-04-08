import { Avatar } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar src="https://github.com/shadcn.png" alt="shadcn" />
      <Avatar fallback="JD" />
      <Avatar fallback="AB" />
      <Avatar src="/broken-url.jpg" fallback="UI" />
    </div>
  );
};
