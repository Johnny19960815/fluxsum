import type { SupportedLocale } from "./types";
import { SUPPORTED_LOCALES } from "./config";

export function detectUserLocale(): SupportedLocale {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage;
  
  if (!browserLang) {
    return "en";
  }

  const exactMatch = SUPPORTED_LOCALES.find(
    (l) => l.code.toLowerCase() === browserLang.toLowerCase()
  );
  if (exactMatch) {
    return exactMatch.code;
  }

  const langPrefix = browserLang.split("-")[0].toLowerCase();
  const prefixMatch = SUPPORTED_LOCALES.find(
    (l) => l.code.toLowerCase().startsWith(langPrefix)
  );
  if (prefixMatch) {
    return prefixMatch.code;
  }

  return "en";
}

export function detectRegion(): "china" | "global" {
  if (typeof window === "undefined") {
    return "global";
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone.includes("Asia/Shanghai") || timezone.includes("Asia/Chongqing")) {
    return "china";
  }

  return "global";
}

export function formatNumber(value: number, locale: SupportedLocale): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatCurrency(
  value: number,
  locale: SupportedLocale,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(
  date: Date,
  locale: SupportedLocale,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatRelativeTime(
  date: Date,
  locale: SupportedLocale
): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, "second");
  }
  if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
  }
  if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
  }
  if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
  }
  if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), "month");
  }
  return rtf.format(-Math.floor(diffInSeconds / 31536000), "year");
}
