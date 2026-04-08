import { Flexbox as Flexbox } from '@fluxsum/ui-kit';

const Box = ({ children }: { children: import('react').ReactNode }) => (
  <div style={{
    padding: '8px 16px',
    background: 'var(--color-primary)',
    color: 'var(--color-primary-foreground)',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
  }}>
    {children}
  </div>
);

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>Row (default)</p>
        <Flex gap={8}>
          <Box>One</Box>
          <Box>Two</Box>
          <Box>Three</Box>
        </Flex>
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>Row + justify between</p>
        <Flex justify="between" style={{ border: '1px dashed var(--color-border)', padding: 8, borderRadius: 6 }}>
          <Box>Left</Box>
          <Box>Center</Box>
          <Box>Right</Box>
        </Flex>
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>Column</p>
        <Flex direction="column" gap={8} style={{ maxWidth: 200 }}>
          <Box>First</Box>
          <Box>Second</Box>
          <Box>Third</Box>
        </Flex>
      </div>
    </div>
  );
};
