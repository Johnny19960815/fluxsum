export type SupportedLocale =
  | "en"      // 英语
  | "zh-CN"   // 简体中文
  | "zh-TW"   // 繁体中文
  | "ja"      // 日语
  | "ko"      // 韩语
  | "es"      // 西班牙语
  | "de"      // 德语
  | "fr"      // 法语
  | "pt"      // 葡萄牙语
  | "it"      // 意大利语
  | "ar"      // 阿拉伯语
  | "ru"      // 俄语
  | "id"      // 印尼语
  | "vi"      // 越南语
  | "th";     // 泰语

export interface LocaleConfig {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  region: "china" | "global";
}

export interface I18nConfig {
  defaultLocale: SupportedLocale;
  fallbackLocale: SupportedLocale;
  cdnBaseUrl: {
    china: string;
    global: string;
  };
  namespaces: string[];
  defaultNamespace: string;
}

export interface TranslationResource {
  [key: string]: string | TranslationResource;
}

export type Namespace = "common" | "auth" | "errors" | "validation" | string;
