import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import type { SupportedLocale, I18nConfig } from "./types";
import { DEFAULT_I18N_CONFIG, getCdnUrl } from "./config";

let isInitialized = false;

export interface InitOptions {
  locale?: SupportedLocale;
  config?: Partial<I18nConfig>;
  debug?: boolean;
}

export async function initI18n(options: InitOptions = {}): Promise<typeof i18next> {
  if (isInitialized) {
    return i18next;
  }

  const config: I18nConfig = {
    ...DEFAULT_I18N_CONFIG,
    ...options.config,
  };

  const locale = options.locale || config.defaultLocale;
  const cdnUrl = getCdnUrl(locale, config);

  await i18next.use(HttpBackend).init({
    lng: locale,
    fallbackLng: config.fallbackLocale,
    ns: config.namespaces,
    defaultNS: config.defaultNamespace,
    debug: options.debug ?? false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${cdnUrl}/{{lng}}/{{ns}}.json`,
      crossDomain: true,
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["localStorage", "cookie"],
    },
  });

  isInitialized = true;
  return i18next;
}

export async function changeLanguage(locale: SupportedLocale): Promise<void> {
  await i18next.changeLanguage(locale);
}

export function getCurrentLocale(): SupportedLocale {
  return i18next.language as SupportedLocale;
}

export function t(key: string, options?: Record<string, unknown>): string {
  return i18next.t(key, options);
}

export { i18next };
