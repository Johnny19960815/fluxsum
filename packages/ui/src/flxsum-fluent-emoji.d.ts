import type { CSSProperties, FC } from 'react';

export interface FluentEmojiProps {
  emoji?: string;
  size?: number | string;
  style?: CSSProperties;
  type?: '3d' | 'flat' | 'modern' | 'mono' | 'anim';
  [key: string]: unknown;
}

export interface FluentEmojiCdnConfig {
  pkg?: string;
  version?: string;
}

export declare const FluentEmoji: FC<FluentEmojiProps>;
export declare function getEmoji(emoji: string): string | undefined;
export declare function getEmojiNameByCharacter(char: string): string | undefined;
export declare function getFluentEmojiCDN(config?: FluentEmojiCdnConfig): string;

declare module '@flxsum/fluent-emoji' {
  export { FluentEmoji, getEmoji, getEmojiNameByCharacter, getFluentEmojiCDN };
  export type { FluentEmojiProps, FluentEmojiCdnConfig };
}
