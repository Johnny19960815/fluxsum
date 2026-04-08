import { Badge, BadgeWrapper, Avatar } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <BadgeWrapper count={5}>
        <div style={{ width: 40, height: 40, background: 'var(--color-muted)', borderRadius: 8 }} />
      </BadgeWrapper>
      <BadgeWrapper count={99}>
        <div style={{ width: 40, height: 40, background: 'var(--color-muted)', borderRadius: 8 }} />
      </BadgeWrapper>
      <BadgeWrapper count={200} overflowCount={99}>
        <div style={{ width: 40, height: 40, background: 'var(--color-muted)', borderRadius: 8 }} />
      </BadgeWrapper>
      <BadgeWrapper dot variant="destructive">
        <div style={{ width: 40, height: 40, background: 'var(--color-muted)', borderRadius: 8 }} />
      </BadgeWrapper>
    </div>
  );
};
