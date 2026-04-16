/**
 * 为 Python 后端生成多语言 JSON 文件
 *
 * 读取 locales/{locale}/backend.json，
 * 输出为 Python i18n 友好的 JSON 格式到指定目录。
 *
 * 用法：tsx scripts/gen-python.ts --dir ./path/to/project [--ns backend] [--output ./i18n/locales]
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';

import { consola } from 'consola';

import { ALL_LOCALES, type Locale } from '../src/config';

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
    const outputFile = resolve(outputDir, `${locale}.json`);

    const sorted = Object.fromEntries(
      Object.entries(data).sort(([a], [b]) => a.localeCompare(b)),
    );

    writeFileSync(outputFile, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
    generated++;
    consola.success(`[${locale}] Generated ${Object.keys(data).length} keys → ${outputFile}`);
  }

  consola.success(`Generated ${generated} Python i18n JSON files`);
}

main();
