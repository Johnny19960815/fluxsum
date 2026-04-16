export {
  ALL_LOCALES,
  ENTRY_LOCALE,
  LOCALE_LABELS,
  LOCALE_LANGUAGE_NAMES,
  LOCALE_OPTIONS,
  OUTPUT_LOCALES,
  RTL_LOCALES,
  isLocaleSupported,
  isRtlLocale,
  normalizeLocale,
} from './config';

export type { Locale, LocaleOption } from './config';

export {
  createLoadPath,
  createResourceLoader,
  getLocaleUrl,
} from './loader';

export type { CdnConfig, DeployRegion, LoaderOptions } from './loader';
