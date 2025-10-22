#!/usr/bin/env node
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const cwd = process.cwd();
const catalogDir = path.resolve(cwd, 'docs/catalog');
const componentsDir = path.join(catalogDir, 'components');

const schemaPath = path.join(catalogDir, 'schema.json');
const statusSchemaPath = path.join(catalogDir, 'status.schema.json');
const statusPath = path.join(catalogDir, 'status.json');

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const entrySchema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
const statusSchema = JSON.parse(readFileSync(statusSchemaPath, 'utf-8'));

const validateEntry = ajv.compile(entrySchema);
const validateStatus = ajv.compile(statusSchema);

let hasErrors = false;

const componentFiles = readdirSync(componentsDir).filter((file) => file.endsWith('.json'));

for (const file of componentFiles) {
  const filePath = path.join(componentsDir, file);
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  const valid = validateEntry(data);
  if (!valid) {
    hasErrors = true;
    console.error(`❌ ${path.relative(cwd, filePath)}`);
    console.error(JSON.stringify(validateEntry.errors, null, 2));
  } else {
    console.log(`✅ ${path.relative(cwd, filePath)}`);
  }
}

const statusData = JSON.parse(readFileSync(statusPath, 'utf-8'));

if (!validateStatus(statusData)) {
  hasErrors = true;
  console.error(`❌ ${path.relative(cwd, statusPath)}`);
  console.error(JSON.stringify(validateStatus.errors, null, 2));
} else {
  console.log(`✅ ${path.relative(cwd, statusPath)}`);
}

if (hasErrors) {
  process.exit(1);
}
