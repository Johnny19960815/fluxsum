import { CopyButton } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <CopyButton content="Hello, World!" />
      <CopyButton content="npm install @fluxsum/ui-kit" variant="outline" />
      <CopyButton content="bun add @fluxsum/ui-kit" variant="filled" size="sm" />
    </div>
  );
};
