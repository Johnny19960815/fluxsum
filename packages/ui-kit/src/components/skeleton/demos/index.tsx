import { Skeleton } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Skeleton width="100%" height={20} />
      <Skeleton width="80%" height={20} />
      <Skeleton width="60%" height={20} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton shape="circle" width={40} height={40} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={14} />
        </div>
      </div>
      <Skeleton shape="square" width="100%" height={120} />
    </div>
  );
};
