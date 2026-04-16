/**
 * CDN 上传脚本
 *
 * 将翻译文件上传到 CDN：
 * - 阿里云 OSS（中国区）
 * - Cloudflare R2（海外）
 *
 * 环境变量：
 *   # 阿里云 OSS
 *   ALIYUN_OSS_REGION        - OSS 区域（如 oss-cn-hangzhou）
 *   ALIYUN_OSS_BUCKET        - 桶名称
 *   ALIYUN_ACCESS_KEY_ID     - Access Key ID
 *   ALIYUN_ACCESS_KEY_SECRET - Access Key Secret
 *
 *   # Cloudflare R2
 *   CF_R2_ACCOUNT_ID         - Cloudflare Account ID
 *   CF_R2_ACCESS_KEY_ID      - R2 Access Key ID
 *   CF_R2_ACCESS_KEY_SECRET  - R2 Access Key Secret
 *   CF_R2_BUCKET             - R2 桶名称
 *
 * 用法：tsx scripts/upload-cdn.ts --project ai-platform [--dir ./path] [--target cn|global|all]
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { parseArgs } from 'node:util';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { consola } from 'consola';

import { ALL_LOCALES, ENTRY_LOCALE } from '../src/config';

const { values: args } = parseArgs({
  options: {
    project: { type: 'string', short: 'p' },
    dir: { type: 'string', short: 'd' },
    target: { type: 'string', short: 't', default: 'all' },
  },
  strict: false,
});

function createOSSClient(): S3Client {
  const region = process.env['ALIYUN_OSS_REGION'] || 'oss-cn-hangzhou';
  return new S3Client({
    region,
    endpoint: `https://${region}.aliyuncs.com`,
    credentials: {
      accessKeyId: process.env['ALIYUN_ACCESS_KEY_ID']!,
      secretAccessKey: process.env['ALIYUN_ACCESS_KEY_SECRET']!,
    },
    forcePathStyle: true,
  });
}

function createR2Client(): S3Client {
  const accountId = process.env['CF_R2_ACCOUNT_ID']!;
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env['CF_R2_ACCESS_KEY_ID']!,
      secretAccessKey: process.env['CF_R2_ACCESS_KEY_SECRET']!,
    },
  });
}

async function uploadFile(
  client: S3Client,
  bucket: string,
  key: string,
  body: Buffer,
) {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: 'application/json; charset=utf-8',
      CacheControl: 'public, max-age=3600, s-maxage=86400',
    }),
  );
}

async function uploadToTarget(
  clientFactory: () => S3Client,
  bucket: string,
  project: string,
  localesDir: string,
  targetName: string,
) {
  const client = clientFactory();
  let count = 0;

  for (const locale of ALL_LOCALES) {
    const localeDir = resolve(localesDir, locale);
    if (!existsSync(localeDir)) continue;

    const files = readdirSync(localeDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const filepath = resolve(localeDir, file);
      const body = readFileSync(filepath);
      const key = `${project}/locales/${locale}/${file}`;

      await uploadFile(client, bucket, key, body);
      count++;
    }
  }

  consola.success(`[${targetName}] Uploaded ${count} files to ${bucket}`);
}

async function main() {
  const project = args['project'];
  if (!project) {
    consola.error('--project is required');
    process.exit(1);
  }

  const projectDir = args['dir'] || process.cwd();
  const localesDir = resolve(projectDir, 'locales');
  const target = (args['target'] as string) || 'all';

  if (!existsSync(localesDir)) {
    consola.error(`Locales directory not found: ${localesDir}`);
    process.exit(1);
  }

  consola.info(`Uploading ${project} locales to CDN (target: ${target})...`);

  if (target === 'cn' || target === 'all') {
    const bucket = process.env['ALIYUN_OSS_BUCKET'];
    if (!bucket) {
      consola.warn('ALIYUN_OSS_BUCKET not set, skipping OSS upload');
    } else {
      await uploadToTarget(createOSSClient, bucket, project, localesDir, 'Aliyun OSS');
    }
  }

  if (target === 'global' || target === 'all') {
    const bucket = process.env['CF_R2_BUCKET'];
    if (!bucket) {
      consola.warn('CF_R2_BUCKET not set, skipping R2 upload');
    } else {
      await uploadToTarget(createR2Client, bucket, project, localesDir, 'Cloudflare R2');
    }
  }

  consola.success('CDN upload complete!');
}

main().catch((err) => {
  consola.error(err);
  process.exit(1);
});
