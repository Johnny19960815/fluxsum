'use client';

import type { FC } from 'react';

import LobeVideo, { type VideoProps as LobeVideoProps } from '@/Video';

export type VideoProps = LobeVideoProps;

const Video: FC<VideoProps> = ({ style, ...rest }) => {
  return (
    <LobeVideo
      preview={false}
      style={{
        borderRadius: 'calc(var(--flxsum-markdown-border-radius) * 1px)',
        marginBlock: 'calc(var(--flxsum-markdown-margin-multiple) * 1em)',
        ...style,
      }}
      {...rest}
    />
  );
};

Video.displayName = 'MdxVdieo';

export default Video;
