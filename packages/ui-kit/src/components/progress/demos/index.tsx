import { Progress } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <Progress value={30} />
      <Progress value={60} variant="default" showLabel />
      <Progress value={80} variant="success" showLabel />
      <Progress value={45} variant="warning" showLabel />
      <Progress value={20} variant="destructive" showLabel />
      <Progress value={60} animated showLabel />
      <Progress indeterminate />
    </div>
  );
};
