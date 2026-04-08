import { Typography } from '@fluxsum/ui';
import { Callout, type CalloutProps } from '@fluxsum/ui/mdx';
import { StoryBook, useControls, useCreateStore } from '@fluxsum/ui/storybook';

export default () => {
  const store = useCreateStore();
  const { content, type } = useControls(
    {
      content: 'A callout is a short piece of text intended to attract attention.',
      type: {
        options: ['tip', 'error', 'important', 'info', 'warning'],
        value: 'info',
      },
    },
    { store },
  ) as CalloutProps;

  return (
    <StoryBook levaStore={store}>
      <Typography>
        <Callout type={type}>{content}</Callout>
      </Typography>
    </StoryBook>
  );
};
