import { CheckboxGroup, type CheckboxGroupProps } from '@fluxsum/ui';
import { StoryBook, useControls, useCreateStore } from '@fluxsum/ui/storybook';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string[]>(['option1']);
  const store = useCreateStore();
  const control = useControls(
    {
      disabled: false,
      gap: {
        max: 24,
        min: 4,
        step: 4,
        value: 8,
      },
      horizontal: true,
    },
    { store },
  ) as Omit<CheckboxGroupProps, 'onChange' | 'options' | 'value'>;

  return (
    <StoryBook levaStore={store}>
      <CheckboxGroup
        {...control}
        options={['option1', 'option2', 'option3']}
        value={value}
        onChange={(values) => {
          setValue(values);
          console.log('Selected values:', values);
        }}
      />
    </StoryBook>
  );
};
