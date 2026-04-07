import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

const LOCALES_DIR = path.resolve(__dirname, "../locales");

interface ValidationError {
  file: string;
  type: "missing_key" | "extra_key" | "invalid_json" | "empty_value";
  key?: string;
  message: string;
}

async function validateLocales() {
  const errors: ValidationError[] = [];

  const enFiles = await glob("en/*.json", { cwd: LOCALES_DIR });

  for (const enFile of enFiles) {
    const namespace = path.basename(enFile, ".json");
    const enPath = path.join(LOCALES_DIR, enFile);

    let enContent: Record<string, unknown>;
    try {
      enContent = JSON.parse(fs.readFileSync(enPath, "utf-8"));
    } catch {
      errors.push({
        file: enFile,
        type: "invalid_json",
        message: "Invalid JSON in English template",
      });
      continue;
    }

    const enKeys = getAllKeys(enContent);

    const localeFiles = await glob(`*/${namespace}.json`, { cwd: LOCALES_DIR });

    for (const localeFile of localeFiles) {
      if (localeFile.startsWith("en/")) continue;

      const localePath = path.join(LOCALES_DIR, localeFile);

      let localeContent: Record<string, unknown>;
      try {
        localeContent = JSON.parse(fs.readFileSync(localePath, "utf-8"));
      } catch {
        errors.push({
          file: localeFile,
          type: "invalid_json",
          message: "Invalid JSON",
        });
        continue;
      }

      const localeKeys = getAllKeys(localeContent);

      for (const key of enKeys) {
        if (!localeKeys.includes(key)) {
          errors.push({
            file: localeFile,
            type: "missing_key",
            key,
            message: `Missing key: ${key}`,
          });
        }
      }

      for (const key of localeKeys) {
        if (!enKeys.includes(key)) {
          errors.push({
            file: localeFile,
            type: "extra_key",
            key,
            message: `Extra key not in English: ${key}`,
          });
        }
      }

      for (const key of localeKeys) {
        const value = getValueByKey(localeContent, key);
        if (typeof value === "string" && value.trim() === "") {
          errors.push({
            file: localeFile,
            type: "empty_value",
            key,
            message: `Empty value for key: ${key}`,
          });
        }
      }
    }
  }

  if (errors.length === 0) {
    console.log("✓ All locale files are valid!");
    return;
  }

  console.log(`Found ${errors.length} validation errors:\n`);

  const groupedErrors: Record<string, ValidationError[]> = {};
  for (const error of errors) {
    if (!groupedErrors[error.file]) {
      groupedErrors[error.file] = [];
    }
    groupedErrors[error.file].push(error);
  }

  for (const [file, fileErrors] of Object.entries(groupedErrors)) {
    console.log(`\n${file}:`);
    for (const error of fileErrors) {
      console.log(`  ✗ ${error.message}`);
    }
  }

  process.exit(1);
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

function getValueByKey(obj: Record<string, unknown>, key: string): unknown {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

validateLocales().catch(console.error);
