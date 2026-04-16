/**
 * Next.js 专用 i18n 集成
 *
 * 提供 SSR/SSG 兼容的翻译加载、middleware 路由、
 * 以及服务端翻译函数。
 */

export { createNextI18nMiddleware, type NextI18nMiddlewareOptions } from './middleware';
export { getServerTranslation, type ServerTranslationOptions } from './server';
