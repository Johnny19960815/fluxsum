/**
 * 多语言同步脚本
 *
 * 同步源语言（zh-CN）的变更到其他所有目标语言：
 * 1. 检测源语言 key 变更（新增/删除/修改）
 * 2. 从目标语言中删除已移除的 key
 * 3. 清除已变更 key 的旧翻译（让 translate 脚本重新翻译）
 * 4. 保留未变更 key 的现有翻译
 *
 * 用法：tsx scripts/sync.ts [--dir ./path/to/project]
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { parseArgs } from 'node:util';

import { consola } from 'consola';

import { ENTRY_LOCALE, OUTPUT_LOCALES, type Locale } from '../src/config';

const { values: args } = parseArgs({
  options: {
    dir: { type: 'string', short: 'd' },
  },
  strict: false,
});

function readJSON(filepath: string): Record<string, string> {
  return JSON.parse(readFileSync(filepath, 'utf-8'));
}

function writeJSON(filepath: string, data: Record<string, string>) {
  const sorted = Object.fromEntries(
    Object.entries(data).sort(([a], [b]) => a.localeCompare(b)),
  );
  writeFileSync(filepath, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
}

function main() {
  const projectDir = args['dir'] || process.cwd();
  const localesDir = resolve(projectDir, 'locales');
  const sourceDir = resolve(localesDir, ENTRY_LOCALE);
  const snapshotDir = resolve(projectDir, '.i18n-snapshot');

  if (!existsSync(sourceDir)) {
    consola.error(`Source locale directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const namespaces = readdirSync(sourceDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => basename(f, '.json'));

  consola.info(`Syncing ${namespaces.length} namespaces from ${ENTRY_LOCALE}...`);

  let totalCleared = 0;
  let totalRemoved = 0;

  for (const ns of namespaces) {
    const sourceFile = resolve(sourceDir, `${ns}.json`);
    const source = readJSON(sourceFile);
    const sourceKeys = new Set(Object.keys(source));

    const snapshotFile = resolve(snapshotDir, `${ns}.json`);
    const snapshot = existsSync(snapshotFile) ? readJSON(snapshotFile) : {};

    const changedKeys = new Set<string>();
    for (const [key, value] of Object.entries(source)) {
      if (!(key in snapshot) || snapshot[key] !== value) {
        changedKeys.add(key);
      }
    }

    for (const locale of OUTPUT_LOCALES) {
      const targetDir = resolve(localesDir, locale);
      mkdirSync(targetDir, { recursive: true });

      const targetFile = resolve(targetDir, `${ns}.json`);
      if (!existsSync(targetFile)) continue;

      const target = readJSON(targetFile);
      const result: Record<string, string> = {};

      for (const key of sourceKeys) {
        if (key in target && !changedKeys.has(key)) {
          result[key] = target[key];
        }
      }

      const removed = Object.keys(target).filter((k) => !sourceKeys.has(k)).length;
      const cleared = [...changedKeys].filter((k) => k in target).length;

      if (removed > 0 || cleared > 0) {
        writeJSON(targetFile, result);
        totalRemoved += removed;
        totalCleared += cleared;
      }
    }

    // Update snapshot
    mkdirSync(snapshotDir, { recursive: true });
    writeJSON(snapshotFile, source);

    consola.success(
      `[${ns}] ${changedKeys.size} changed, synced to ${OUTPUT_LOCALES.length} locales`,
    );
  }

  consola.log('');
  consola.info(`Cleared ${totalCleared} stale translations, removed ${totalRemoved} orphan keys`);
  consola.success('Sync complete! Run translate script next to fill in missing translations.');
}

main();
