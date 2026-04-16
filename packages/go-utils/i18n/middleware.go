package i18n

import (
	"github.com/gin-gonic/gin"
)

// Middleware 返回一个 Gin 中间件，自动检测并设置请求语言。
//
// 检测优先级：
//  1. URL 查询参数 lang=
//  2. Cookie FLUXSUM_LOCALE
//  3. Accept-Language 请求头
//  4. 默认语言 (zh-CN)
func Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		lang := detectLanguage(c)
		c.Set(ContextKeyLanguage, lang)
		c.Next()
	}
}

func detectLanguage(c *gin.Context) string {
	if lang := c.Query("lang"); lang != "" {
		normalized := NormalizeLang(lang)
		if IsSupported(normalized) {
			return normalized
		}
	}

	if lang, err := c.Cookie("FLUXSUM_LOCALE"); err == nil && lang != "" {
		normalized := NormalizeLang(lang)
		if IsSupported(normalized) {
			return normalized
		}
	}

	if acceptLang := c.GetHeader("Accept-Language"); acceptLang != "" {
		lang := ParseAcceptLanguage(acceptLang)
		if IsSupported(lang) {
			return lang
		}
	}

	return DefaultLang
}
