import { Snippet } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
      <Snippet prefix="$">bun add @fluxsum/ui-kit</Snippet>
      <Snippet prefix="$" variant="filled">npm install @fluxsum/ui-kit</Snippet>
      <Snippet>{"import { Button } from '@fluxsum/ui-kit'"}</Snippet>
      <Snippet copyable={false} variant="outlined">const greeting = "Hello, World!"</Snippet>
    </div>
  );
};
