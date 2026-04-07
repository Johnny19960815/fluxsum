import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

const APPS_DIR = path.resolve(__dirname, "../../../apps");
const LOCALES_DIR = path.resolve(__dirname, "../locales");

const T_FUNCTION_REGEX = /\bt\s*\(\s*["'`]([^"'`]+)["'`]/g;
const USE_TRANSLATION_REGEX = /useTranslation\s*\(\s*["'`]([^"'`]+)["'`]/g;

interface ExtractedKey {
  key: string;
  file: string;
  line: number;
}

async function extractKeys() {
  console.log("Extracting translation keys from source files...\n");

  const sourceFiles = await glob("**/*.{ts,tsx}", {
    cwd: APPS_DIR,
    ignore: ["**/node_modules/**", "**/dist/**"],
  });

  const extractedKeys: ExtractedKey[] = [];
  const namespaces = new Set<string>();

  for (const file of sourceFiles) {
    const filePath = path.join(APPS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    let match;
    while ((match = T_FUNCTION_REGEX.exec(content)) !== null) {
      const key = match[1];
      const lineNumber = content.substring(0, match.index).split("\n").length;

      extractedKeys.push({
        key,
        file,
        line: lineNumber,
      });

      const namespace = key.split(":")[0];
      if (key.includes(":")) {
        namespaces.add(namespace);
      }
    }

    while ((match = USE_TRANSLATION_REGEX.exec(content)) !== null) {
      namespaces.add(match[1]);
    }
  }

  console.log(`Found ${extractedKeys.length} translation keys`);
  console.log(`Namespaces: ${Array.from(namespaces).join(", ")}\n`);

  const enCommonPath = path.join(LOCALES_DIR, "en", "common.json");
  let existingKeys: Record<string, unknown> = {};
  if (fs.existsSync(enCommonPath)) {
    existingKeys = JSON.parse(fs.readFileSync(enCommonPath, "utf-8"));
  }

  const existingKeysList = getAllKeys(existingKeys);
  const extractedKeysList = extractedKeys.map((k) => k.key.replace(/^[^:]+:/, ""));

  const missingKeys = extractedKeysList.filter((k) => !existingKeysList.includes(k));
  const unusedKeys = existingKeysList.filter((k) => !extractedKeysList.includes(k));

  if (missingKeys.length > 0) {
    console.log("Missing keys (used in code but not in translations):");
    for (const key of missingKeys) {
      const usage = extractedKeys.find((k) => k.key.endsWith(key));
      console.log(`  - ${key} (${usage?.file}:${usage?.line})`);
    }
  }

  if (unusedKeys.length > 0) {
    console.log("\nPotentially unused keys (in translations but not found in code):");
    for (const key of unusedKeys) {
      console.log(`  - ${key}`);
    }
  }

  if (missingKeys.length === 0 && unusedKeys.length === 0) {
    console.log("✓ All keys are in sync!");
  }
}

function getAllKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      keys.push(...getAllKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

extractKeys().catch(console.error);
