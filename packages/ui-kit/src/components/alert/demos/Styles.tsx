import { Alert } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
      <Alert type="info" filled title="Filled Info" description="Filled style alert." />
      <Alert type="success" filled title="Filled Success" description="Filled style alert." />
      <Alert type="warning" glass title="Glass Warning" description="Glass morphism style alert." />
      <Alert type="error" glass title="Glass Error" description="Glass morphism style alert." />
    </div>
  );
};
