/**
 * 多语言文件校验脚本
 *
 * 检查所有目标语言文件：
 * 1. 是否有缺失的 key
 * 2. 是否有多余的 key
 * 3. 插值变量是否一致
 * 4. JSON 格式是否合法
 *
 * 用法：tsx scripts/validate.ts [--dir ./path/to/project]
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { parseArgs } from 'node:util';

import { consola } from 'consola';

import { ALL_LOCALES, ENTRY_LOCALE, type Locale } from '../src/config';

const { values: args } = parseArgs({
  options: {
    dir: { type: 'string', short: 'd' },
  },
  strict: false,
});

function extractInterpolations(text: string): string[] {
  const matches = text.match(/\{\{[\w.]+\}\}/g) || [];
  return matches.sort();
}

function readJSON(filepath: string): Record<string, string> {
  try {
    return JSON.parse(readFileSync(filepath, 'utf-8'));
  } catch (err) {
    consola.error(`Invalid JSON: ${filepath}`);
    throw err;
  }
}

let hasErrors = false;

function main() {
  const projectDir = args['dir'] || process.cwd();
  const localesDir = resolve(projectDir, 'locales');
  const sourceDir = resolve(localesDir, ENTRY_LOCALE);

  if (!existsSync(sourceDir)) {
    consola.error(`Source locale directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const namespaces = readdirSync(sourceDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => basename(f, '.json'));

  consola.info(`Validating ${namespaces.length} namespaces across ${ALL_LOCALES.length} locales...`);
  consola.log('');

  for (const ns of namespaces) {
    const sourceFile = resolve(sourceDir, `${ns}.json`);
    const source = readJSON(sourceFile);
    const sourceKeys = new Set(Object.keys(source));

    for (const locale of ALL_LOCALES) {
      if (locale === ENTRY_LOCALE) continue;

      const targetFile = resolve(localesDir, locale, `${ns}.json`);
      if (!existsSync(targetFile)) {
        consola.warn(`[${locale}/${ns}] File missing`);
        hasErrors = true;
        continue;
      }

      const target = readJSON(targetFile);
      const targetKeys = new Set(Object.keys(target));

      const missing = [...sourceKeys].filter((k) => !targetKeys.has(k));
      const extra = [...targetKeys].filter((k) => !sourceKeys.has(k));

      if (missing.length > 0) {
        consola.error(`[${locale}/${ns}] Missing ${missing.length} keys: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`);
        hasErrors = true;
      }

      if (extra.length > 0) {
        consola.warn(`[${locale}/${ns}] Extra ${extra.length} keys: ${extra.slice(0, 5).join(', ')}${extra.length > 5 ? '...' : ''}`);
      }

      for (const key of [...sourceKeys].filter((k) => targetKeys.has(k))) {
        const srcVars = extractInterpolations(source[key]);
        const tgtVars = extractInterpolations(target[key]);
        if (JSON.stringify(srcVars) !== JSON.stringify(tgtVars)) {
          consola.error(
            `[${locale}/${ns}] Interpolation mismatch on key "${key}": source=${srcVars.join(',')} target=${tgtVars.join(',')}`,
          );
          hasErrors = true;
        }
      }
    }

    consola.success(`[${ns}] Validated`);
  }

  consola.log('');
  if (hasErrors) {
    consola.error('Validation failed with errors');
    process.exit(1);
  }
  consola.success('All locales are valid!');
}

main();
