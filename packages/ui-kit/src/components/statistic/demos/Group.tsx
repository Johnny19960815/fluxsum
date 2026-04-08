import { StatisticGroup } from '@fluxsum/ui-kit';

export default () => {
  return (
    <StatisticGroup
      columns={3}
      divided
      items={[
        { title: 'Active Users', value: 4328 },
        { title: 'Monthly Revenue', value: 28500, prefix: '$' },
        { title: 'Conversion Rate', value: 3.6, suffix: '%', trend: 'up' },
      ]}
    />
  );
};
