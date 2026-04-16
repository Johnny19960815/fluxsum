/**
 * 创建 FluxSum 统一 i18next 实例
 *
 * 封装了 i18next 初始化逻辑，自动根据部署环境（本地/中国区/海外）
 * 选择资源加载策略，并内置 RTL 支持。
 */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { isRtlLang } from 'rtl-detect';

import {
  ALL_LOCALES,
  ENTRY_LOCALE,
  normalizeLocale,
  type Locale,
} from '../config';
import {
  createLoadPath,
  createResourceLoader,
  type DeployRegion,
  type CdnConfig,
} from '../loader';

export interface FluxsumI18nOptions {
  /** 初始语言（不传则自动检测） */
  lng?: string;
  /** 部署区域 */
  region?: DeployRegion;
  /** 项目标识 */
  project: string;
  /** CDN 配置 */
  cdn?: CdnConfig;
  /** 本地 locales 基础路径 */
  localBasePath?: string;
  /** 默认加载的命名空间 */
  defaultNS?: string[];
  /** 预打包的资源（首屏关键翻译，避免 loading 闪烁） */
  bundledResources?: Record<string, Record<string, Record<string, string>>>;
  /** 使用 http-backend 还是 resources-to-backend（默认 'http'） */
  backendType?: 'http' | 'resource';
  /** 是否开启 debug */
  debug?: boolean;
}

export function createFluxsumI18n(options: FluxsumI18nOptions) {
  const {
    lng,
    region = 'local',
    project,
    cdn,
    localBasePath,
    defaultNS = ['common'],
    bundledResources,
    backendType = 'http',
    debug = false,
  } = options;

  const loaderOptions = { region, project, cdn, localBasePath };
  const instance = i18n.createInstance();

  instance.use(initReactI18next).use(LanguageDetector);

  if (backendType === 'http') {
    instance.use(HttpBackend);
  } else {
    instance.use(
      resourcesToBackend(createResourceLoader(loaderOptions)),
    );
  }

  instance.on('languageChanged', (newLng) => {
    if (typeof document !== 'undefined') {
      const dir = isRtlLang(newLng) ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = newLng;
    }
  });

  const initialLang = normalizeLocale(lng);

  const initPromise = instance.init({
    debug,
    lng: initialLang,
    fallbackLng: ENTRY_LOCALE,
    supportedLngs: [...ALL_LOCALES],
    defaultNS,
    ns: defaultNS,
    keySeparator: false,

    ...(bundledResources
      ? {
          resources: bundledResources,
          partialBundledLanguages: true,
        }
      : {}),

    ...(backendType === 'http'
      ? {
          backend: {
            loadPath: createLoadPath(loaderOptions),
          },
        }
      : {}),

    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'fluxsum-lng',
      lookupCookie: 'FLUXSUM_LOCALE',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
      bindI18nStore: 'added',
    },

    load: 'currentOnly',
  });

  return { instance, initPromise };
}
