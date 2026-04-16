/**
 * 为 Go 后端生成多语言 YAML 文件
 *
 * 读取 locales/{locale}/backend.json（或自定义 namespace），
 * 转换为 go-i18n v2 格式的 YAML 文件。
 *
 * 用法：tsx scripts/gen-go.ts --dir ./path/to/project [--ns backend]
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { parseArgs } from 'node:util';

import { consola } from 'consola';

import { ALL_LOCALES, ENTRY_LOCALE, type Locale } from '../src/config';

const { values: args } = parseArgs({
  options: {
    dir: { type: 'string', short: 'd' },
    ns: { type: 'string', default: 'backend' },
    output: { type: 'string', short: 'o' },
  },
  strict: false,
});

function readJSON(filepath: string): Record<string, string> {
  return JSON.parse(readFileSync(filepath, 'utf-8'));
}

/**
 * 将 flat JSON 转换为 go-i18n v2 YAML 格式
 * go-i18n 的 YAML 格式是 flat key-value:
 *   key.subkey:
 *     other: "translation text"
 */
function jsonToGoI18nYaml(data: Record<string, string>): string {
  const lines: string[] = [];
  const sorted = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));

  for (const [key, value] of sorted) {
    const escapedValue = value
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');
    lines.push(`${key}:`);
    lines.push(`  other: "${escapedValue}"`);
  }

  return lines.join('\n') + '\n';
}

function goLocaleCode(locale: Locale): string {
  const map: Partial<Record<Locale, string>> = {
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'en-US': 'en',
  };
  return map[locale] || locale;
}

function main() {
  const projectDir = args['dir'] || process.cwd();
  const localesDir = resolve(projectDir, 'locales');
  const ns = args['ns'] as string || 'backend';
  const outputDir = args['output'] ? resolve(args['output'] as string) : resolve(projectDir, 'i18n', 'locales');

  mkdirSync(outputDir, { recursive: true });

  let generated = 0;

  for (const locale of ALL_LOCALES) {
    const sourceFile = resolve(localesDir, locale, `${ns}.json`);
    if (!existsSync(sourceFile)) continue;

    const data = readJSON(sourceFile);
    const goLocale = goLocaleCode(locale);
    const yamlContent = jsonToGoI18nYaml(data);
    const outputFile = resolve(outputDir, `${goLocale}.yaml`);

    writeFileSync(outputFile, yamlContent, 'utf-8');
    generated++;
    consola.success(`[${goLocale}] Generated ${Object.keys(data).length} keys → ${outputFile}`);
  }

  consola.success(`Generated ${generated} Go i18n YAML files`);
}

main();
