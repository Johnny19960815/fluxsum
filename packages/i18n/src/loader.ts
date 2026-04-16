/**
 * FluxSum i18n 资源加载器
 *
 * 根据运行环境自动选择加载策略：
 * - 本地开发：直接读取本地 locales/ 文件
 * - 线上中国区：从阿里云 OSS 加载
 * - 线上海外：从 Cloudflare CDN (R2/Pages) 加载
 */

import type { Locale } from './config';
import { ENTRY_LOCALE, normalizeLocale } from './config';

export type DeployRegion = 'local' | 'cn' | 'global';

export interface CdnConfig {
  /** 阿里云 OSS 地址（中国区线上） */
  ossBaseUrl: string;
  /** Cloudflare CDN 地址（海外线上） */
  cfBaseUrl: string;
  /** 版本号，用于缓存失效 */
  version?: string;
}

export interface LoaderOptions {
  /** 部署区域 */
  region: DeployRegion;
  /** 项目标识（如 'ai-platform', 'hub-central'），用于 CDN 路径隔离 */
  project: string;
  /** CDN 配置（region 不为 'local' 时必填） */
  cdn?: CdnConfig;
  /** 本地 locales 基础路径（默认 '/locales'） */
  localBasePath?: string;
}

function buildCdnUrl(
  options: LoaderOptions,
  locale: string,
  namespace: string,
): string {
  const { region, project, cdn } = options;
  if (!cdn) throw new Error('CDN config is required for non-local regions');

  const base = region === 'cn' ? cdn.ossBaseUrl : cdn.cfBaseUrl;
  const version = cdn.version ? `?v=${cdn.version}` : '';
  return `${base.replace(/\/$/, '')}/${project}/locales/${locale}/${namespace}.json${version}`;
}

function buildLocalUrl(
  options: LoaderOptions,
  locale: string,
  namespace: string,
): string {
  const base = options.localBasePath ?? '/locales';
  return `${base}/${locale}/${namespace}.json`;
}

/**
 * 获取指定 locale + namespace 的翻译资源 URL
 */
export function getLocaleUrl(
  options: LoaderOptions,
  locale: string,
  namespace: string,
): string {
  if (options.region === 'local') {
    return buildLocalUrl(options, locale, namespace);
  }
  return buildCdnUrl(options, locale, namespace);
}

/**
 * 创建 i18next-http-backend 兼容的 loadPath 函数
 */
export function createLoadPath(options: LoaderOptions) {
  return (lngs: readonly string[], namespaces: readonly string[]): string => {
    const locale = normalizeLocale(lngs[0]);
    const ns = namespaces[0] || 'common';
    return getLocaleUrl(options, locale, ns);
  };
}

/**
 * 创建 i18next-resources-to-backend 兼容的加载函数
 *
 * 本地开发时使用动态 import，线上使用 fetch 从 CDN 拉取
 */
export function createResourceLoader(options: LoaderOptions) {
  return async (lng: string, ns: string): Promise<Record<string, string>> => {
    const locale = normalizeLocale(lng) as Locale;

    if (options.region === 'local') {
      // 本地开发走动态 import（需要打包器支持）
      try {
        const mod = await import(
          /* webpackChunkName: "locale-[request]" */
          `@fluxsum/i18n/../locales/${locale}/${ns}.json`
        );
        return mod.default || mod;
      } catch {
        if (locale !== ENTRY_LOCALE) {
          const fallback = await import(
            `@fluxsum/i18n/../locales/${ENTRY_LOCALE}/${ns}.json`
          );
          return fallback.default || fallback;
        }
        return {};
      }
    }

    // 线上走 CDN fetch
    const url = getLocaleUrl(options, locale, ns);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
      return await res.json();
    } catch {
      if (locale !== ENTRY_LOCALE) {
        const fallbackUrl = getLocaleUrl(options, ENTRY_LOCALE, ns);
        const fallbackRes = await fetch(fallbackUrl);
        if (fallbackRes.ok) return fallbackRes.json();
      }
      return {};
    }
  };
}
