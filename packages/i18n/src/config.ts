/**
 * FluxSum 统一多语言配置
 *
 * 所有项目（前端 Next.js、后端 Go/Python、子项目）共享同一份语言定义。
 * 源语言为 zh-CN（中文），其他语言基于中文进行 AI 翻译。
 */

export const ENTRY_LOCALE = 'zh-CN' as const;

export const ALL_LOCALES = [
  'zh-CN',
  'en-US',
  'zh-TW',
  'ja-JP',
  'ko-KR',
  'hi-IN',
  'id-ID',
  'vi-VN',
  'th-TH',
  'fr-FR',
  'de-DE',
  'es-ES',
  'pt-BR',
  'it-IT',
  'ru-RU',
  'nl-NL',
  'pl-PL',
  'bg-BG',
  'tr-TR',
  'ar',
  'fa-IR',
  'he-IL',
] as const;

export type Locale = (typeof ALL_LOCALES)[number];

export const OUTPUT_LOCALES = ALL_LOCALES.filter(
  (l): l is Exclude<Locale, typeof ENTRY_LOCALE> => l !== ENTRY_LOCALE,
);

export const RTL_LOCALES: readonly Locale[] = ['ar', 'fa-IR', 'he-IL'] as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English',
  'zh-TW': '繁體中文',
  'ja-JP': '日本語',
  'ko-KR': '한국어',
  'hi-IN': 'हिन्दी',
  'id-ID': 'Bahasa Indonesia',
  'vi-VN': 'Tiếng Việt',
  'th-TH': 'ไทย',
  'fr-FR': 'Français',
  'de-DE': 'Deutsch',
  'es-ES': 'Español',
  'pt-BR': 'Português',
  'it-IT': 'Italiano',
  'ru-RU': 'Русский',
  'nl-NL': 'Nederlands',
  'pl-PL': 'Polski',
  'bg-BG': 'Български',
  'tr-TR': 'Türkçe',
  ar: 'العربية',
  'fa-IR': 'فارسی',
  'he-IL': 'עברית',
};

export const LOCALE_LANGUAGE_NAMES: Record<Locale, string> = {
  'zh-CN': 'Simplified Chinese',
  'en-US': 'English',
  'zh-TW': 'Traditional Chinese',
  'ja-JP': 'Japanese',
  'ko-KR': 'Korean',
  'hi-IN': 'Hindi',
  'id-ID': 'Indonesian',
  'vi-VN': 'Vietnamese',
  'th-TH': 'Thai',
  'fr-FR': 'French',
  'de-DE': 'German',
  'es-ES': 'Spanish',
  'pt-BR': 'Brazilian Portuguese',
  'it-IT': 'Italian',
  'ru-RU': 'Russian',
  'nl-NL': 'Dutch',
  'pl-PL': 'Polish',
  'bg-BG': 'Bulgarian',
  'tr-TR': 'Turkish',
  ar: 'Arabic',
  'fa-IR': 'Persian',
  'he-IL': 'Hebrew',
};

export interface LocaleOption {
  label: string;
  value: Locale;
}

export const LOCALE_OPTIONS: LocaleOption[] = ALL_LOCALES.map((locale) => ({
  label: LOCALE_LABELS[locale],
  value: locale,
}));

/**
 * 将任意 locale 字符串规范化为支持的 Locale 枚举值
 */
export function normalizeLocale(locale?: string): Locale {
  if (!locale) return ENTRY_LOCALE;

  const lower = locale.toLowerCase().replace('_', '-');

  if (lower.startsWith('ar')) return 'ar';
  if (lower.startsWith('fa')) return 'fa-IR';
  if (lower.startsWith('he') || lower.startsWith('iw')) return 'he-IL';

  for (const l of ALL_LOCALES) {
    if (l.toLowerCase() === lower) return l;
  }

  const prefix = lower.split('-')[0];
  for (const l of ALL_LOCALES) {
    if (l.toLowerCase().startsWith(prefix)) return l;
  }

  return ENTRY_LOCALE;
}

export function isRtlLocale(locale: string): boolean {
  return RTL_LOCALES.includes(normalizeLocale(locale));
}

export function isLocaleSupported(locale: string): boolean {
  return ALL_LOCALES.includes(locale as Locale);
}
