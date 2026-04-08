import { Text } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text size="xs">Extra small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="default">Default size</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra large (xl)</Text>
      <Text size="2xl">2XL</Text>
      <Text size="3xl">3XL</Text>
      <div style={{ marginTop: 8, display: 'flex', gap: 16 }}>
        <Text weight="thin">Thin</Text>
        <Text weight="light">Light</Text>
        <Text weight="normal">Normal</Text>
        <Text weight="medium">Medium</Text>
        <Text weight="semibold">Semibold</Text>
        <Text weight="bold">Bold</Text>
      </div>
    </div>
  );
};
