import logging
import sys
from typing import Optional

_loggers: dict[str, logging.Logger] = {}


def setup_logger(
    name: str = "fluxsum",
    level: int = logging.INFO,
    format_string: Optional[str] = None,
) -> logging.Logger:
    """设置并返回 logger"""
    if name in _loggers:
        return _loggers[name]

    logger = logging.getLogger(name)
    logger.setLevel(level)

    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)

        if format_string is None:
            format_string = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

        formatter = logging.Formatter(format_string)
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    _loggers[name] = logger
    return logger


def get_logger(name: str = "fluxsum") -> logging.Logger:
    """获取已配置的 logger"""
    if name not in _loggers:
        return setup_logger(name)
    return _loggers[name]
