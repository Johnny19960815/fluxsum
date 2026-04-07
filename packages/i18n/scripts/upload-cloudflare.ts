import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { glob } from "glob";
import * as fs from "fs";
import * as path from "path";

const LOCALES_DIR = path.resolve(__dirname, "../locales");

interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

async function uploadToCloudflare() {
  const config: R2Config = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "",
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
    bucket: process.env.CLOUDFLARE_R2_BUCKET || "fluxsum-i18n",
  };

  if (!config.accountId || !config.accessKeyId || !config.secretAccessKey) {
    console.error("Missing Cloudflare R2 credentials");
    console.error("Please set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, and CLOUDFLARE_R2_SECRET_ACCESS_KEY");
    process.exit(1);
  }

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  const files = await glob("**/*.json", { cwd: LOCALES_DIR });

  console.log(`Found ${files.length} locale files to upload`);

  for (const file of files) {
    const localPath = path.join(LOCALES_DIR, file);

    try {
      const content = fs.readFileSync(localPath, "utf-8");
      JSON.parse(content);

      const command = new PutObjectCommand({
        Bucket: config.bucket,
        Key: file,
        Body: content,
        ContentType: "application/json",
        CacheControl: "public, max-age=3600",
      });

      await client.send(command);
      console.log(`✓ Uploaded: ${file}`);
    } catch (error) {
      console.error(`✗ Failed to upload ${file}:`, error);
    }
  }

  console.log("\nCloudflare R2 upload complete!");
  console.log(`CDN URL: https://i18n.fluxsum.com/`);
}

uploadToCloudflare().catch(console.error);
