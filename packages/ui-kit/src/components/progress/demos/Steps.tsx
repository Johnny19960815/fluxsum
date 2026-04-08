import { ProgressSteps } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <ProgressSteps value={1} steps={5} />
      <ProgressSteps value={3} steps={5} />
      <ProgressSteps value={5} steps={5} />
      <ProgressSteps value={2} steps={4} size="lg" />
    </div>
  );
};
