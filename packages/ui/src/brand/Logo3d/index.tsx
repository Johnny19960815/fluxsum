'use client';

import type { ImageProps } from 'antd';
import { type FC } from 'react';

import { useCdnFn } from '@/ConfigProvider';
import Img from '@/Img';
import type { ImgProps } from '@/types';

const LOGO_3D = {
  path: 'assets/logo-3d.webp',
  pkg: '@flxsum/assets-logo',
  version: '1.2.0',
};

type Logo3dProps = Omit<ImgProps & ImageProps, 'width' | 'height' | 'src'> & {
  size?: number | string;
};

const Logo3d: FC<Logo3dProps> = ({ size = '1em', style, alt = 'LobeHub', ...rest }) => {
  const genCdnUrl = useCdnFn();
  return (
    <Img alt={alt} height={size} src={genCdnUrl(LOGO_3D)} style={style} width={size} {...rest} />
  );
};

Logo3d.displayName = 'LobeHubLogo3d';

export default Logo3d;
