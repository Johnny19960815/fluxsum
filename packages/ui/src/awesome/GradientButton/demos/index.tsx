import { GradientButton, type GradientButtonProps } from '@fluxsum/ui/awesome';
import { StoryBook, useControls, useCreateStore } from '@fluxsum/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      children: 'Get a Demo',
      glow: true,
      size: {
        options: ['large', 'normal', 'small'],
        value: 'large',
      },
    },
    { store },
  ) as GradientButtonProps;

  return (
    <StoryBook levaStore={store}>
      <GradientButton {...control} />
    </StoryBook>
  );
};
