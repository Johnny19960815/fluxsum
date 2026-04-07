import type { LocaleConfig, SupportedLocale, I18nConfig } from "./types";

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", region: "global" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", dir: "ltr", region: "china" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", dir: "ltr", region: "global" },
  { code: "ja", name: "Japanese", nativeName: "日本語", dir: "ltr", region: "global" },
  { code: "ko", name: "Korean", nativeName: "한국어", dir: "ltr", region: "global" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", region: "global" },
  { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr", region: "global" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr", region: "global" },
  { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr", region: "global" },
  { code: "it", name: "Italian", nativeName: "Italiano", dir: "ltr", region: "global" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", region: "global" },
  { code: "ru", name: "Russian", nativeName: "Русский", dir: "ltr", region: "global" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", dir: "ltr", region: "global" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", dir: "ltr", region: "global" },
  { code: "th", name: "Thai", nativeName: "ไทย", dir: "ltr", region: "global" },
];

export const DEFAULT_I18N_CONFIG: I18nConfig = {
  defaultLocale: "en",
  fallbackLocale: "en",
  cdnBaseUrl: {
    china: "https://i18n.fluxsum.cn",
    global: "https://i18n.fluxsum.com",
  },
  namespaces: ["common", "auth", "errors", "validation"],
  defaultNamespace: "common",
};

export function getLocaleConfig(locale: SupportedLocale): LocaleConfig | undefined {
  return SUPPORTED_LOCALES.find((l) => l.code === locale);
}

export function isRTL(locale: SupportedLocale): boolean {
  return getLocaleConfig(locale)?.dir === "rtl";
}

export function getCdnUrl(locale: SupportedLocale, config: I18nConfig = DEFAULT_I18N_CONFIG): string {
  const localeConfig = getLocaleConfig(locale);
  if (localeConfig?.region === "china") {
    return config.cdnBaseUrl.china;
  }
  return config.cdnBaseUrl.global;
}
