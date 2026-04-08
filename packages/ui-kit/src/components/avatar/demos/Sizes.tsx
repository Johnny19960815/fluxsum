import { Avatar } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar size="sm" fallback="S" />
      <Avatar size="default" fallback="M" />
      <Avatar size="lg" fallback="L" />
      <Avatar size="xl" fallback="XL" />
      <Avatar shape="square" size="default" fallback="SQ" />
    </div>
  );
};
