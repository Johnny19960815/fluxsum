/**
 * AI 自动翻译脚本
 *
 * 以 zh-CN 为源语言，自动翻译为其他所有目标语言。
 * 使用 OpenAI 兼容 API（可配置为任意 LLM 提供商）。
 *
 * 用法：
 *   OPENAI_API_KEY=xxx tsx scripts/translate.ts [--project ai-platform] [--ns common,auth]
 *   环境变量：
 *     OPENAI_API_KEY      - API 密钥
 *     OPENAI_BASE_URL     - 自定义 API 地址（可选）
 *     TRANSLATE_MODEL     - 模型名称（默认 gpt-4o）
 *     TRANSLATE_LOCALES   - 逗号分隔的目标语言（可选，默认全部）
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { parseArgs } from 'node:util';

import { consola } from 'consola';
import OpenAI from 'openai';

import { ENTRY_LOCALE, OUTPUT_LOCALES, LOCALE_LANGUAGE_NAMES, type Locale } from '../src/config';

interface TranslateOptions {
  projectDir: string;
  namespaces?: string[];
  targetLocales?: Locale[];
}

const { values: args } = parseArgs({
  options: {
    project: { type: 'string', short: 'p' },
    ns: { type: 'string' },
    dir: { type: 'string', short: 'd' },
  },
  strict: false,
});

const MODEL = process.env['TRANSLATE_MODEL'] || 'gpt-4o';
const BATCH_SIZE = 80;

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
  baseURL: process.env['OPENAI_BASE_URL'],
});

async function translateBatch(
  entries: [string, string][],
  targetLang: string,
  targetLocale: string,
): Promise<Record<string, string>> {
  const sourceObj = Object.fromEntries(entries);

  const systemPrompt = `You are a professional translator. Translate the following JSON values from Chinese (zh-CN) to ${targetLang} (locale code: ${targetLocale}).

Rules:
- Only translate the VALUES, keep the keys unchanged
- Preserve all interpolation variables like {{name}}, {count}, etc.
- Preserve HTML tags if present
- Keep the translation natural and idiomatic for native speakers
- For technical terms, use the standard translation in the target language
- Return ONLY valid JSON, no markdown code blocks, no explanations`;

  const response = await client.chat.completions.create({
    model: MODEL,
    temperature: 0,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: JSON.stringify(sourceObj, null, 2) },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('Empty response from API');

  return JSON.parse(content);
}

function readJSON(filepath: string): Record<string, string> {
  return JSON.parse(readFileSync(filepath, 'utf-8'));
}

function writeJSON(filepath: string, data: Record<string, string>) {
  const sorted = Object.fromEntries(
    Object.entries(data).sort(([a], [b]) => a.localeCompare(b)),
  );
  writeFileSync(filepath, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
}

function diffKeys(
  source: Record<string, string>,
  existing: Record<string, string>,
): [string, string][] {
  const needTranslation: [string, string][] = [];
  for (const [key, value] of Object.entries(source)) {
    if (!(key in existing) || existing[key] === '' || existing[key] === value) {
      needTranslation.push([key, value]);
    }
  }
  return needTranslation;
}

async function translateNamespace(
  localesDir: string,
  ns: string,
  targetLocale: Locale,
) {
  const sourceFile = resolve(localesDir, ENTRY_LOCALE, `${ns}.json`);
  if (!existsSync(sourceFile)) {
    consola.warn(`Source file not found: ${sourceFile}`);
    return;
  }

  const source = readJSON(sourceFile);
  const targetDir = resolve(localesDir, targetLocale);
  mkdirSync(targetDir, { recursive: true });

  const targetFile = resolve(targetDir, `${ns}.json`);
  const existing = existsSync(targetFile) ? readJSON(targetFile) : {};

  // Remove keys not in source
  const cleaned: Record<string, string> = {};
  for (const key of Object.keys(source)) {
    if (key in existing) cleaned[key] = existing[key];
  }

  const needTranslation = diffKeys(source, cleaned);
  if (needTranslation.length === 0) {
    consola.success(`[${targetLocale}/${ns}] Already up to date (${Object.keys(source).length} keys)`);
    return;
  }

  consola.start(
    `[${targetLocale}/${ns}] Translating ${needTranslation.length}/${Object.keys(source).length} keys...`,
  );

  const langName = LOCALE_LANGUAGE_NAMES[targetLocale];
  const result = { ...cleaned };

  for (let i = 0; i < needTranslation.length; i += BATCH_SIZE) {
    const batch = needTranslation.slice(i, i + BATCH_SIZE);
    const translated = await translateBatch(batch, langName, targetLocale);
    Object.assign(result, translated);
    consola.info(
      `  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(needTranslation.length / BATCH_SIZE)} done`,
    );
  }

  writeJSON(targetFile, result);
  consola.success(`[${targetLocale}/${ns}] Done, wrote ${Object.keys(result).length} keys`);
}

async function main() {
  const projectDir = args['dir'] || process.cwd();
  const localesDir = resolve(projectDir, 'locales');

  if (!existsSync(resolve(localesDir, ENTRY_LOCALE))) {
    consola.error(`Source locale directory not found: ${resolve(localesDir, ENTRY_LOCALE)}`);
    process.exit(1);
  }

  const allNs = readdirSync(resolve(localesDir, ENTRY_LOCALE))
    .filter((f) => f.endsWith('.json'))
    .map((f) => basename(f, '.json'));

  const namespaces = args['ns'] ? (args['ns'] as string).split(',') : allNs;
  const envLocales = process.env['TRANSLATE_LOCALES'];
  const targetLocales = envLocales
    ? (envLocales.split(',') as Locale[])
    : [...OUTPUT_LOCALES];

  consola.info(`Source: ${ENTRY_LOCALE}`);
  consola.info(`Targets: ${targetLocales.join(', ')}`);
  consola.info(`Namespaces: ${namespaces.join(', ')}`);
  consola.info(`Model: ${MODEL}`);
  consola.log('');

  for (const locale of targetLocales) {
    for (const ns of namespaces) {
      await translateNamespace(localesDir, ns, locale);
    }
  }

  consola.success('All translations complete!');
}

main().catch((err) => {
  consola.error(err);
  process.exit(1);
});
