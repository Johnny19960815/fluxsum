import { Tag } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag>Default</Tag>
      <Tag color="blue">Blue</Tag>
      <Tag color="green">Green</Tag>
      <Tag color="red">Red</Tag>
      <Tag color="orange">Orange</Tag>
      <Tag color="purple">Purple</Tag>
      <Tag color="cyan">Cyan</Tag>
      <Tag variant="outlined">Outline</Tag>
      <Tag variant="borderless">Borderless</Tag>
    </div>
  );
};
