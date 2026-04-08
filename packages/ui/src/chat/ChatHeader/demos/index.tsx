import { ChatHeader, type ChatHeaderProps } from '@fluxsum/ui/chat';
import { StoryBook, useControls, useCreateStore } from '@fluxsum/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      showBackButton: false,
    },
    { store },
  ) as ChatHeaderProps;

  return (
    <StoryBook noPadding levaStore={store}>
      <ChatHeader {...control} left={<div>Left</div>} right={<div>Right</div>} />
    </StoryBook>
  );
};
