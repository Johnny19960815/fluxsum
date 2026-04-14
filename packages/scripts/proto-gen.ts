#!/usr/bin/env bun

import { $ } from "bun";
import { join } from "path";

const PROTO_DIR = join(import.meta.dir, "../proto");
const OUTPUT_DIR = {
  ts: join(import.meta.dir, "../proto/gen/ts"),
  go: join(import.meta.dir, "../proto/gen/go"),
  py: join(import.meta.dir, "../proto/gen/py"),
};

async function generateProto() {
  console.log("🔄 Generating protobuf files...");

  // Create output directories
  for (const dir of Object.values(OUTPUT_DIR)) {
    await $`mkdir -p ${dir}`;
  }

  const protoFiles = ["auth.proto", "common.proto", "chat.proto"];

  for (const file of protoFiles) {
    const protoPath = join(PROTO_DIR, file);

    // Generate TypeScript
    console.log(`  📦 Generating TS for ${file}...`);
    await $`protoc --plugin=protoc-gen-ts_proto --ts_proto_out=${OUTPUT_DIR.ts} --proto_path=${PROTO_DIR} ${protoPath}`.quiet();

    // Generate Go
    console.log(`  📦 Generating Go for ${file}...`);
    await $`protoc --go_out=${OUTPUT_DIR.go} --go-grpc_out=${OUTPUT_DIR.go} --proto_path=${PROTO_DIR} ${protoPath}`.quiet();

    // Generate Python
    console.log(`  📦 Generating Python for ${file}...`);
    await $`python -m grpc_tools.protoc --python_out=${OUTPUT_DIR.py} --grpc_python_out=${OUTPUT_DIR.py} --proto_path=${PROTO_DIR} ${protoPath}`.quiet();
  }

  console.log("✅ Protobuf generation complete!");
}

generateProto().catch(console.error);
