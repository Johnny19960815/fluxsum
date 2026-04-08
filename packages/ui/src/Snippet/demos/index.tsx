import { Snippet, type SnippetProps } from '@fluxsum/ui';
import { StoryBook, useControls, useCreateStore } from '@fluxsum/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      children: 'pnpm install @fluxsum/ui',
      copyable: true,
      language: 'sh',
      prefix: '$',
      shadow: false,
      spotlight: false,
      variant: {
        options: ['filled', 'outlined', 'borderless'],
        value: 'filled',
      },
    },
    { store },
  ) as SnippetProps;

  return (
    <StoryBook levaStore={store}>
      <Snippet {...control} />
    </StoryBook>
  );
};
