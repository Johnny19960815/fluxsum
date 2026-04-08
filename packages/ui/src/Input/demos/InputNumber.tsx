import { InputNumber, type InputNumberProps } from '@fluxsum/ui';
import { StoryBook, useControls, useCreateStore } from '@fluxsum/ui/storybook';

export default () => {
  const store = useCreateStore();
  const controls = useControls(
    {
      placeholder: 'Type keywords...',
      shadow: false,
      variant: {
        options: ['outlined', 'borderless', 'filled'],
        value: 'filled',
      },
    },
    { store },
  ) as InputNumberProps;

  return (
    <StoryBook levaStore={store}>
      <InputNumber {...controls} />
    </StoryBook>
  );
};
