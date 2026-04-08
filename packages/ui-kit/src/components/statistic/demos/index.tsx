import { Statistic } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <Statistic title="Total Users" value={128503} />
      <Statistic title="Revenue" value={9280.5} prefix="$" precision={2} />
      <Statistic title="Growth" value={12.5} suffix="%" trend="up" />
      <Statistic title="Refund" value={3.2} suffix="%" trend="down" />
      <Statistic title="Loading" value={9999} loading />
    </div>
  );
};
