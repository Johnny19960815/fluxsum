import type {
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
  HTMLAttributes,
  NamedExoticComponent,
  RefAttributes,
  SVGProps,
} from 'react';

export type IconType = ForwardRefExoticComponent<
  SVGProps<SVGSVGElement> & {
    color?: string;
    size?: string | number;
    title?: string;
  } & RefAttributes<SVGSVGElement>
>;

export interface IconAvatarProps extends HTMLAttributes<HTMLDivElement> {
  Icon?: IconType;
  background?: string;
  color?: string;
  iconClassName?: string;
  iconMultiple?: number;
  iconStyle?: CSSProperties;
  shape?: 'circle' | 'square';
  size: number;
}

export interface CompoundedIcon extends NamedExoticComponent<SVGProps<SVGSVGElement> & { size?: string | number; color?: string; title?: string }> {
  Avatar?: FC<Omit<IconAvatarProps, 'Icon'>>;
  Color?: IconType;
  Mono?: IconType;
  Text?: FC<{ size?: number; type?: string }>;
  [key: string]: unknown;
}

export type CompoundedIconProps = SVGProps<SVGSVGElement> & {
  color?: string;
  size?: string | number;
  title?: string;
};

export interface FillId {
  id: string;
  fill: string;
}

declare module '@flxsum/icons' {
  export type { IconType, IconAvatarProps, CompoundedIcon, CompoundedIconProps, FillId };
  export const IconAvatar: FC<IconAvatarProps>;
  export function useFillId(prefix: string): FillId;
  export function useFillIds(prefix: string, count: number): FillId[];
  export const Cloudflare: CompoundedIcon & { Mono: IconType; Color: IconType };
  export type CloudflareProps = CompoundedIconProps;
  export const Github: CompoundedIcon & { Mono: IconType; Color: IconType };
  export type GithubProps = CompoundedIconProps;
  export const LobeHub: CompoundedIcon & { Mono: IconType; Color: IconType };
  export type LobeHubProps = CompoundedIconProps;
}
