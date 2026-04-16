// Package i18n 提供 FluxSum Go 服务的统一多语言支持。
//
// 使用方式：
//  1. 在项目中嵌入 locales/*.yaml 文件
//  2. 调用 Init() 初始化
//  3. 使用 T(ctx, key) 或 Translate(lang, key) 获取翻译
//
// YAML 文件由 @fluxsum/i18n 的 gen-go 脚本从统一 JSON 源生成。
package i18n

import (
	"embed"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"golang.org/x/text/language"
	"gopkg.in/yaml.v3"

	goi18n "github.com/nicksnyder/go-i18n/v2/i18n"
)

const (
	LangZhCN = "zh-CN"
	LangZhTW = "zh-TW"
	LangEnUS = "en-US"
	LangJaJP = "ja-JP"
	LangKoKR = "ko-KR"
	LangHiIN = "hi-IN"
	LangIdID = "id-ID"
	LangViVN = "vi-VN"
	LangThTH = "th-TH"
	LangFrFR = "fr-FR"
	LangDeDE = "de-DE"
	LangEsES = "es-ES"
	LangPtBR = "pt-BR"
	LangItIT = "it-IT"
	LangRuRU = "ru-RU"
	LangNlNL = "nl-NL"
	LangPlPL = "pl-PL"
	LangBgBG = "bg-BG"
	LangTrTR = "tr-TR"
	LangAr   = "ar"
	LangFaIR = "fa-IR"
	LangHeIL = "he-IL"

	DefaultLang = LangZhCN

	ContextKeyLanguage = "fluxsum_lang"
)

var AllLocales = []string{
	LangZhCN, LangEnUS, LangZhTW, LangJaJP, LangKoKR,
	LangHiIN, LangIdID, LangViVN, LangThTH,
	LangFrFR, LangDeDE, LangEsES, LangPtBR, LangItIT, LangRuRU, LangNlNL, LangPlPL, LangBgBG,
	LangTrTR, LangAr, LangFaIR, LangHeIL,
}

var (
	bundle     *goi18n.Bundle
	localizers = make(map[string]*goi18n.Localizer)
	mu         sync.RWMutex
	initOnce   sync.Once
)

// InitConfig 初始化配置
type InitConfig struct {
	// LocaleFS 嵌入的翻译文件目录（//go:embed locales/*.yaml）
	LocaleFS embed.FS
	// Files YAML 文件列表，如 ["locales/zh-CN.yaml", "locales/en-US.yaml"]
	Files []string
	// DefaultLang 默认语言（不传则使用 zh-CN）
	DefaultLang string
}

// Init 初始化 i18n bundle 并加载所有翻译文件
func Init(cfg InitConfig) error {
	var initErr error
	initOnce.Do(func() {
		defaultTag := language.Chinese
		if cfg.DefaultLang != "" {
			tag, err := language.Parse(cfg.DefaultLang)
			if err == nil {
				defaultTag = tag
			}
		}

		bundle = goi18n.NewBundle(defaultTag)
		bundle.RegisterUnmarshalFunc("yaml", yaml.Unmarshal)

		for _, file := range cfg.Files {
			_, err := bundle.LoadMessageFileFS(cfg.LocaleFS, file)
			if err != nil {
				initErr = err
				return
			}
		}

		for _, loc := range AllLocales {
			localizers[loc] = goi18n.NewLocalizer(bundle, loc)
		}
	})
	return initErr
}

// GetLocalizer 获取指定语言的 Localizer
func GetLocalizer(lang string) *goi18n.Localizer {
	lang = NormalizeLang(lang)

	mu.RLock()
	loc, ok := localizers[lang]
	mu.RUnlock()

	if ok {
		return loc
	}

	mu.Lock()
	defer mu.Unlock()

	if loc, ok = localizers[lang]; ok {
		return loc
	}

	loc = goi18n.NewLocalizer(bundle, lang, DefaultLang)
	localizers[lang] = loc
	return loc
}

// T 从 gin.Context 获取当前语言并翻译
func T(c *gin.Context, key string, args ...map[string]any) string {
	lang := GetLangFromContext(c)
	return Translate(lang, key, args...)
}

// Translate 翻译指定语言的 key
func Translate(lang, key string, args ...map[string]any) string {
	loc := GetLocalizer(lang)

	config := &goi18n.LocalizeConfig{
		MessageID: key,
	}

	if len(args) > 0 && args[0] != nil {
		config.TemplateData = args[0]
	}

	msg, err := loc.Localize(config)
	if err != nil {
		return key
	}
	return msg
}

// GetLangFromContext 从 gin.Context 提取语言设置
func GetLangFromContext(c *gin.Context) string {
	if c == nil {
		return DefaultLang
	}

	if lang := c.GetString(ContextKeyLanguage); lang != "" {
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

// ParseAcceptLanguage 解析 Accept-Language 请求头
func ParseAcceptLanguage(header string) string {
	if header == "" {
		return DefaultLang
	}

	parts := strings.Split(header, ",")
	if len(parts) == 0 {
		return DefaultLang
	}

	firstLang := strings.TrimSpace(parts[0])
	if idx := strings.Index(firstLang, ";"); idx > 0 {
		firstLang = firstLang[:idx]
	}

	return NormalizeLang(firstLang)
}

// NormalizeLang 规范化语言代码
func NormalizeLang(lang string) string {
	lang = strings.TrimSpace(lang)
	lower := strings.ToLower(lang)

	switch {
	case strings.HasPrefix(lower, "zh-tw") || strings.HasPrefix(lower, "zh-hant"):
		return LangZhTW
	case strings.HasPrefix(lower, "zh"):
		return LangZhCN
	case strings.HasPrefix(lower, "en"):
		return LangEnUS
	case strings.HasPrefix(lower, "ja"):
		return LangJaJP
	case strings.HasPrefix(lower, "ko"):
		return LangKoKR
	case strings.HasPrefix(lower, "hi"):
		return LangHiIN
	case strings.HasPrefix(lower, "id"):
		return LangIdID
	case strings.HasPrefix(lower, "vi"):
		return LangViVN
	case strings.HasPrefix(lower, "th"):
		return LangThTH
	case strings.HasPrefix(lower, "fr"):
		return LangFrFR
	case strings.HasPrefix(lower, "de"):
		return LangDeDE
	case strings.HasPrefix(lower, "es"):
		return LangEsES
	case strings.HasPrefix(lower, "pt"):
		return LangPtBR
	case strings.HasPrefix(lower, "it"):
		return LangItIT
	case strings.HasPrefix(lower, "ru"):
		return LangRuRU
	case strings.HasPrefix(lower, "nl"):
		return LangNlNL
	case strings.HasPrefix(lower, "pl"):
		return LangPlPL
	case strings.HasPrefix(lower, "bg"):
		return LangBgBG
	case strings.HasPrefix(lower, "tr"):
		return LangTrTR
	case strings.HasPrefix(lower, "ar"):
		return LangAr
	case strings.HasPrefix(lower, "fa"):
		return LangFaIR
	case strings.HasPrefix(lower, "he") || strings.HasPrefix(lower, "iw"):
		return LangHeIL
	default:
		return DefaultLang
	}
}

// IsSupported 检查语言是否被支持
func IsSupported(lang string) bool {
	normalized := NormalizeLang(lang)
	for _, l := range AllLocales {
		if l == normalized {
			return true
		}
	}
	return false
}

// SupportedLanguages 返回所有支持的语言列表
func SupportedLanguages() []string {
	return AllLocales
}
