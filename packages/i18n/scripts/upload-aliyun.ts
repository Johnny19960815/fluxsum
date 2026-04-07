import OSS from "ali-oss";
import { glob } from "glob";
import * as fs from "fs";
import * as path from "path";

const LOCALES_DIR = path.resolve(__dirname, "../locales");

interface OSSConfig {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
}

async function uploadToAliyun() {
  const config: OSSConfig = {
    region: process.env.ALIYUN_OSS_REGION || "oss-cn-shanghai",
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || "",
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || "",
    bucket: process.env.ALIYUN_OSS_BUCKET || "fluxsum-i18n",
  };

  if (!config.accessKeyId || !config.accessKeySecret) {
    console.error("Missing Aliyun OSS credentials");
    console.error("Please set ALIYUN_ACCESS_KEY_ID and ALIYUN_ACCESS_KEY_SECRET");
    process.exit(1);
  }

  const client = new OSS(config);

  const files = await glob("**/*.json", { cwd: LOCALES_DIR });

  console.log(`Found ${files.length} locale files to upload`);

  for (const file of files) {
    const localPath = path.join(LOCALES_DIR, file);
    const remotePath = file;

    try {
      const content = fs.readFileSync(localPath, "utf-8");
      JSON.parse(content);

      await client.put(remotePath, localPath, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
          "Access-Control-Allow-Origin": "*",
        },
      });

      console.log(`✓ Uploaded: ${remotePath}`);
    } catch (error) {
      console.error(`✗ Failed to upload ${file}:`, error);
    }
  }

  console.log("\nAliyun OSS upload complete!");
  console.log(`CDN URL: https://${config.bucket}.${config.region}.aliyuncs.com/`);
}

uploadToAliyun().catch(console.error);
