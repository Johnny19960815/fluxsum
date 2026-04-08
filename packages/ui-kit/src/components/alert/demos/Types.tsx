import { Alert } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
      <Alert type="info" title="Info" description="Informational alert with colorful text." colorfulText />
      <Alert type="success" title="Success" description="Success alert with colorful text." colorfulText />
      <Alert type="warning" title="Warning" description="Warning alert with colorful text." colorfulText />
      <Alert type="error" title="Error" description="Error alert with colorful text." colorfulText />
    </div>
  );
};
