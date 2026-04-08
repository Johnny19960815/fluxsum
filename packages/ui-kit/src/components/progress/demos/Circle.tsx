import { ProgressCircle } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <ProgressCircle value={25} />
      <ProgressCircle value={50} />
      <ProgressCircle value={75} />
      <ProgressCircle value={100} />
      <ProgressCircle value={60} size={96} strokeWidth={8} />
    </div>
  );
};
