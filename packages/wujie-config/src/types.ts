export interface SubAppConfig {
  name: string;
  url: string;
  alive?: boolean;
  sync?: boolean;
  degrade?: boolean;
  props?: Record<string, unknown>;
  attrs?: Record<string, string>;
  fiber?: boolean;
  prefix?: Record<string, string>;
}

export interface WujieRouteConfig {
  path: string;
  subApp: SubAppConfig;
  exact?: boolean;
}

export interface PreloadConfig {
  name: string;
  url: string;
  alive?: boolean;
  exec?: boolean;
}
