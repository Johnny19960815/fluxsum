/**
 * Next.js middleware 用于自动检测和设置用户语言
 *
 * 使用方式（在项目的 middleware.ts 中）：
 *
 *   import { createNextI18nMiddleware } from '@fluxsum/i18n/next';
 *   export default createNextI18nMiddleware({ defaultLocale: 'zh-CN' });
 *   export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
 */

import { type NextRequest, NextResponse } from 'next/server';

import { ALL_LOCALES, ENTRY_LOCALE, normalizeLocale, type Locale } from '../config';

export interface NextI18nMiddlewareOptions {
  defaultLocale?: Locale;
  cookieName?: string;
  /** 是否使用 URL 路径前缀做语言路由（如 /en-US/about） */
  urlPrefix?: boolean;
}

const COOKIE_NAME = 'FLUXSUM_LOCALE';

export function createNextI18nMiddleware(options: NextI18nMiddlewareOptions = {}) {
  const {
    defaultLocale = ENTRY_LOCALE,
    cookieName = COOKIE_NAME,
    urlPrefix = false,
  } = options;

  return function middleware(request: NextRequest) {
    let locale = defaultLocale;

    const cookieLocale = request.cookies.get(cookieName)?.value;
    if (cookieLocale) {
      const normalized = normalizeLocale(cookieLocale);
      if (ALL_LOCALES.includes(normalized as Locale)) {
        locale = normalized;
      }
    } else {
      const acceptLanguage = request.headers.get('accept-language');
      if (acceptLanguage) {
        const primary = acceptLanguage.split(',')[0]?.split(';')[0]?.trim();
        if (primary) {
          const normalized = normalizeLocale(primary);
          if (ALL_LOCALES.includes(normalized as Locale)) {
            locale = normalized;
          }
        }
      }
    }

    if (urlPrefix) {
      const { pathname } = request.nextUrl;
      const pathLocale = pathname.split('/')[1];
      if (pathLocale && ALL_LOCALES.includes(normalizeLocale(pathLocale) as Locale)) {
        locale = normalizeLocale(pathLocale);
      } else {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(url);
      }
    }

    const response = NextResponse.next();
    response.headers.set('x-fluxsum-locale', locale);

    if (!cookieLocale) {
      response.cookies.set(cookieName, locale, {
        path: '/',
        maxAge: 365 * 24 * 60 * 60,
        sameSite: 'lax',
      });
    }

    return response;
  };
}
