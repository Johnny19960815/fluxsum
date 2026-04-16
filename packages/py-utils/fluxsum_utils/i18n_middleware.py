"""
FastAPI 多语言中间件

使用方式：
    from fluxsum_utils.i18n import I18n
    from fluxsum_utils.i18n_middleware import I18nMiddleware, get_locale

    i18n = I18n(locales_dir="./i18n/locales")
    app.add_middleware(I18nMiddleware)

    @app.get("/hello")
    async def hello(request: Request):
        locale = get_locale(request)
        return {"message": i18n.t(locale, "common.hello")}
"""

from __future__ import annotations

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from .i18n import DEFAULT_LANG, normalize_locale, ALL_LOCALES

LOCALE_CONTEXT_KEY = "fluxsum_locale"
LOCALE_COOKIE_NAME = "FLUXSUM_LOCALE"


def _parse_accept_language(header: str) -> str | None:
    if not header:
        return None
    parts = header.split(",")
    if not parts:
        return None
    first = parts[0].strip()
    if ";" in first:
        first = first[: first.index(";")]
    return first.strip() or None


class I18nMiddleware(BaseHTTPMiddleware):
    """检测请求语言并注入 request.state"""

    async def dispatch(self, request: Request, call_next) -> Response:
        locale = self._detect_locale(request)
        request.state.locale = locale
        response = await call_next(request)
        return response

    def _detect_locale(self, request: Request) -> str:
        lang = request.query_params.get("lang")
        if lang:
            normalized = normalize_locale(lang)
            if normalized in ALL_LOCALES:
                return normalized

        cookie_lang = request.cookies.get(LOCALE_COOKIE_NAME)
        if cookie_lang:
            normalized = normalize_locale(cookie_lang)
            if normalized in ALL_LOCALES:
                return normalized

        accept = request.headers.get("accept-language", "")
        parsed = _parse_accept_language(accept)
        if parsed:
            normalized = normalize_locale(parsed)
            if normalized in ALL_LOCALES:
                return normalized

        return DEFAULT_LANG


def get_locale(request: Request) -> str:
    return getattr(request.state, "locale", DEFAULT_LANG)
