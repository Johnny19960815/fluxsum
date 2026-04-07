import { useCallback, useEffect, useState } from "react";
import { i18next, changeLanguage, getCurrentLocale, initI18n, type InitOptions } from "./i18n";
import type { SupportedLocale } from "./types";
import { SUPPORTED_LOCALES, isRTL } from "./config";

export function useI18n() {
  const [locale, setLocale] = useState<SupportedLocale>(getCurrentLocale());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setLocale(lng as SupportedLocale);
      document.documentElement.lang = lng;
      document.documentElement.dir = isRTL(lng as SupportedLocale) ? "rtl" : "ltr";
    };

    i18next.on("languageChanged", handleLanguageChanged);

    return () => {
      i18next.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const switchLanguage = useCallback(async (newLocale: SupportedLocale) => {
    await changeLanguage(newLocale);
  }, []);

  const t = useCallback((key: string, options?: Record<string, unknown>) => {
    return i18next.t(key, options);
  }, []);

  return {
    locale,
    isReady,
    setIsReady,
    t,
    switchLanguage,
    supportedLocales: SUPPORTED_LOCALES,
    isRTL: isRTL(locale),
  };
}

export function useInitI18n(options?: InitOptions) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initI18n(options)
      .then(() => setIsReady(true))
      .catch((err) => setError(err));
  }, []);

  return { isReady, error };
}

export { initI18n, changeLanguage, getCurrentLocale, t } from "./i18n";
export { SUPPORTED_LOCALES, isRTL, getLocaleConfig } from "./config";
export type { SupportedLocale, LocaleConfig, I18nConfig } from "./types";
