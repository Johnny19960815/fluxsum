import { Spinner } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="default" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
    </div>
  );
};
