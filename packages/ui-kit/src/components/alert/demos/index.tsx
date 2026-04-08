import { Alert } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
      <Alert title="Default Alert" description="This is a default alert message." />
      <Alert type="info" title="Info Alert" description="This is an informational message." />
      <Alert type="success" title="Success Alert" description="Operation completed successfully." />
      <Alert type="warning" title="Warning Alert" description="Please review before proceeding." />
      <Alert type="error" title="Error Alert" description="Something went wrong. Please try again." />
    </div>
  );
};
