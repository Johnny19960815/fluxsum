import * as fs from "fs";
import * as path from "path";

const LOCALES_DIR = path.resolve(__dirname, "../locales");
const SUPPORTED_LOCALES = [
  "en", "zh-CN", "zh-TW", "ja", "ko", "es", "de", "fr",
  "pt", "it", "ar", "ru", "id", "vi", "th"
];
const NAMESPACES = ["common", "auth", "errors", "validation"];

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getEnglishTemplate(namespace: string): Record<string, unknown> | null {
  const templatePath = path.join(LOCALES_DIR, "en", `${namespace}.json`);
  if (fs.existsSync(templatePath)) {
    return JSON.parse(fs.readFileSync(templatePath, "utf-8"));
  }
  return null;
}

function generateMissingFiles() {
  console.log("Generating missing locale files...\n");

  for (const locale of SUPPORTED_LOCALES) {
    const localeDir = path.join(LOCALES_DIR, locale);
    ensureDir(localeDir);

    for (const namespace of NAMESPACES) {
      const filePath = path.join(localeDir, `${namespace}.json`);

      if (!fs.existsSync(filePath)) {
        const template = getEnglishTemplate(namespace);
        if (template) {
          fs.writeFileSync(filePath, JSON.stringify(template, null, 2), "utf-8");
          console.log(`✓ Created: ${locale}/${namespace}.json (from English template)`);
        } else {
          fs.writeFileSync(filePath, "{}", "utf-8");
          console.log(`✓ Created: ${locale}/${namespace}.json (empty)`);
        }
      }
    }
  }

  console.log("\nGeneration complete!");
}

function generateTypeDefinitions() {
  console.log("\nGenerating TypeScript definitions...\n");

  const enCommon = path.join(LOCALES_DIR, "en", "common.json");
  if (!fs.existsSync(enCommon)) {
    console.error("English common.json not found");
    return;
  }

  const content = JSON.parse(fs.readFileSync(enCommon, "utf-8"));

  function generateInterface(obj: Record<string, unknown>, indent = ""): string {
    let result = "{\n";
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        result += `${indent}  "${key}": ${generateInterface(value as Record<string, unknown>, indent + "  ")};\n`;
      } else {
        result += `${indent}  "${key}": string;\n`;
      }
    }
    result += `${indent}}`;
    return result;
  }

  const typeContent = `// Auto-generated - DO NOT EDIT
// Run 'pnpm generate' to regenerate

export interface CommonTranslations ${generateInterface(content)}

export interface TranslationKeys {
  common: CommonTranslations;
  auth: Record<string, unknown>;
  errors: Record<string, unknown>;
  validation: Record<string, unknown>;
}
`;

  const typesPath = path.join(__dirname, "../src/generated-types.ts");
  fs.writeFileSync(typesPath, typeContent, "utf-8");
  console.log("✓ Generated: src/generated-types.ts");
}

generateMissingFiles();
generateTypeDefinitions();
