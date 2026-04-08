import { ActionIcon } from '@fluxsum/ui';
import { ChatInputActionBar, TokenTag } from '@fluxsum/ui/chat';
import { ChatInputArea } from '@fluxsum/ui/mobile';
import { Eraser, Languages } from 'lucide-react';
import { useState } from 'react';

import { Flexbox } from '@/Flex';

export default () => {
  const [expand, setExpand] = useState(false);
  return (
    <Flexbox style={{ height: 400, position: 'relative' }}>
      <div style={{ flex: 1 }} />
      <ChatInputArea
        expand={expand}
        setExpand={setExpand}
        textAreaRightAddons={<ChatInputArea.SendButton />}
        topAddons={
          <ChatInputActionBar
            leftAddons={
              <>
                <ActionIcon icon={Languages} />
                <ActionIcon icon={Eraser} />
                <TokenTag maxValue={5000} value={1000} />
              </>
            }
          />
        }
      />
    </Flexbox>
  );
};
