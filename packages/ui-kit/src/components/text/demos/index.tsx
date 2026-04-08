import { Text } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text>Default text</Text>
      <Text type="secondary">Secondary text</Text>
      <Text type="success">Success text</Text>
      <Text type="warning">Warning text</Text>
      <Text type="danger">Danger text</Text>
      <Text disabled>Disabled text</Text>
      <Text mark>Highlighted text</Text>
      <Text code>Inline code</Text>
      <Text underline>Underlined text</Text>
      <Text delete>Strikethrough text</Text>
    </div>
  );
};
