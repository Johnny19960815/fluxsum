/**
 * Next.js 服务端翻译工具
 *
 * 在 Server Components 和 Route Handlers 中使用：
 *
 *   import { getServerTranslation } from '@fluxsum/i18n/next';
 *
 *   export default async function Page() {
 *     const { t } = await getServerTranslation('zh-CN', 'common');
 *     return <h1>{t('action.save')}</h1>;
 *   }
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { ENTRY_LOCALE, normalizeLocale, type Locale } from '../config';

export interface ServerTranslationOptions {
  /** 本地 locales 目录的绝对路径 */
  localesDir?: string;
}

const cache = new Map<string, Record<string, string>>();

function loadNamespace(
  localesDir: string,
  locale: string,
  ns: string,
): Record<string, string> {
  const key = `${locale}:${ns}`;
  if (cache.has(key)) return cache.get(key)!;

  const filepath = resolve(localesDir, locale, `${ns}.json`);
  if (!existsSync(filepath)) {
    if (locale !== ENTRY_LOCALE) {
      return loadNamespace(localesDir, ENTRY_LOCALE, ns);
    }
    return {};
  }

  const data = JSON.parse(readFileSync(filepath, 'utf-8'));
  cache.set(key, data);
  return data;
}

export async function getServerTranslation(
  locale: string,
  namespace: string | string[] = 'common',
  options: ServerTranslationOptions = {},
) {
  const localesDir = options.localesDir || resolve(process.cwd(), 'locales');
  const normalizedLocale = normalizeLocale(locale) as Locale;

  const namespaces = Array.isArray(namespace) ? namespace : [namespace];
  const merged: Record<string, string> = {};

  for (const ns of namespaces) {
    const data = loadNamespace(localesDir, normalizedLocale, ns);
    Object.assign(merged, data);
  }

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let text = merged[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
      }
    }
    return text;
  };

  return { t, locale: normalizedLocale };
}
