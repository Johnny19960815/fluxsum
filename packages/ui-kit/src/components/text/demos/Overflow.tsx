import { Text } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Text ellipsis>
        This is a very long text that will be truncated with an ellipsis when it overflows the container width.
      </Text>
      <Text lineClamp={2}>
        This text will be clamped to two lines maximum. Any content beyond the second line will be hidden and replaced
        with an ellipsis indicator showing that there is more content available.
      </Text>
      <Text lineClamp={3}>
        Three-line clamp example. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </Text>
    </div>
  );
};
