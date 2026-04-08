import { Toc, type TocProps } from '@fluxsum/ui';
import { StoryBook, useControls, useCreateStore } from '@fluxsum/ui/storybook';

const items: TocProps['items'] = [
  {
    id: 'Default',
    title: 'Default',
  },
  {
    id: 'APIs',
    title: 'APIs',
  },
];
export default () => {
  const store = useCreateStore();
  const controls = useControls(
    {
      isMobile: false,
    },
    { store },
  ) as TocProps;

  return (
    <StoryBook levaStore={store}>
      <Toc {...controls} items={items} />
    </StoryBook>
  );
};
