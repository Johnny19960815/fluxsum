"""
FluxSum 统一多语言支持 - Python 版

使用方式：
    from fluxsum_utils.i18n import I18n

    i18n = I18n(locales_dir="./i18n/locales")
    text = i18n.t("zh-CN", "common.hello")  # 按 key 获取翻译
    text = i18n.t("zh-CN", "common.welcome", name="世界")  # 带插值

翻译 JSON 文件由 @fluxsum/i18n 的 gen-python 脚本从统一源生成。
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

ALL_LOCALES = [
    "zh-CN", "en-US", "zh-TW", "ja-JP", "ko-KR",
    "hi-IN", "id-ID", "vi-VN", "th-TH",
    "fr-FR", "de-DE", "es-ES", "pt-BR", "it-IT", "ru-RU", "nl-NL", "pl-PL", "bg-BG",
    "tr-TR", "ar", "fa-IR", "he-IL",
]

DEFAULT_LANG = "zh-CN"

RTL_LOCALES = {"ar", "fa-IR", "he-IL"}

_INTERPOLATION_RE = re.compile(r"\{\{(\w+)\}\}")


def normalize_locale(locale: str | None) -> str:
    if not locale:
        return DEFAULT_LANG

    lower = locale.lower().replace("_", "-")

    if lower.startswith("ar"):
        return "ar"
    if lower.startswith("fa"):
        return "fa-IR"
    if lower.startswith("he") or lower.startswith("iw"):
        return "he-IL"

    for loc in ALL_LOCALES:
        if loc.lower() == lower:
            return loc

    prefix = lower.split("-")[0]
    for loc in ALL_LOCALES:
        if loc.lower().startswith(prefix):
            return loc

    return DEFAULT_LANG


def is_rtl(locale: str) -> bool:
    return normalize_locale(locale) in RTL_LOCALES


class I18n:
    """多语言翻译管理器"""

    def __init__(self, locales_dir: str | Path, default_lang: str = DEFAULT_LANG):
        self._locales_dir = Path(locales_dir)
        self._default_lang = default_lang
        self._cache: dict[str, dict[str, str]] = {}
        self._load_all()

    def _load_all(self) -> None:
        for locale in ALL_LOCALES:
            filepath = self._locales_dir / f"{locale}.json"
            if filepath.exists():
                with open(filepath, encoding="utf-8") as f:
                    self._cache[locale] = json.load(f)

    def t(self, locale: str, key: str, **kwargs: Any) -> str:
        """获取翻译文本，支持 {{var}} 插值"""
        normalized = normalize_locale(locale)
        messages = self._cache.get(normalized, {})

        text = messages.get(key)
        if text is None:
            fallback = self._cache.get(self._default_lang, {})
            text = fallback.get(key, key)

        if kwargs:
            text = _INTERPOLATION_RE.sub(
                lambda m: str(kwargs.get(m.group(1), m.group(0))),
                text,
            )

        return text

    def has_key(self, locale: str, key: str) -> bool:
        normalized = normalize_locale(locale)
        return key in self._cache.get(normalized, {})

    def get_all_keys(self, locale: str | None = None) -> list[str]:
        lang = normalize_locale(locale) if locale else self._default_lang
        return list(self._cache.get(lang, {}).keys())

    @property
    def supported_locales(self) -> list[str]:
        return list(self._cache.keys())

    def reload(self) -> None:
        self._cache.clear()
        self._load_all()
