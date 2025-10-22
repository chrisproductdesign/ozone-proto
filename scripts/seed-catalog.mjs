#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const cwd = process.cwd();
const catalogDir = path.join(cwd, 'docs/catalog');
const componentsDir = path.join(catalogDir, 'components');

if (!existsSync(componentsDir)) {
  mkdirSync(componentsDir, { recursive: true });
}

const status = JSON.parse(readFileSync(path.join(catalogDir, 'status.json'), 'utf-8'));

const exceptionDocPaths = {
  'direction-provider': 'utils/direction-provider.md',
};

const titleMap = {
  'navigation-menu': 'Navigation Menu',
  'number-field': 'Number Field',
  'toggle-group': 'Toggle Group',
  'checkbox-group': 'Checkbox Group',
  'preview-card': 'Preview Card',
  'scroll-area': 'Scroll Area',
  'alert-dialog': 'Alert Dialog',
  'context-menu': 'Context Menu',
};

const toTitle = (id) => {
  if (titleMap[id]) return titleMap[id];
  return id
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
};

const today = new Date().toISOString().slice(0, 10);

const baseTemplate = ({ id, category }) => ({
  $schema: '../schema.json',
  id,
  title: toTitle(id),
  category,
  baseDocUrl: `https://base-ui.com/react/${exceptionDocPaths[id] ?? `components/${id}.md`}`,
  description: 'TODO: add concise component summary.',
  status: {
    implementation: 'not-started',
    docs: 'not-started',
    tests: 'not-started',
  },
  variants: [],
  props: [],
  a11y: [],
  interactions: [],
  dependencies: [],
  recipes: [],
  agentNotes: '',
  lastSynced: today,
});

let created = 0;
for (const entry of status.components) {
  const filePath = path.join(componentsDir, `${entry.id}.json`);
  if (existsSync(filePath)) {
    continue;
  }
  const content = `${JSON.stringify(baseTemplate(entry), null, 2)}\n`;
  writeFileSync(filePath, content, 'utf-8');
  created += 1;
  console.log(`Created ${path.relative(cwd, filePath)}`);
}

if (created === 0) {
  console.log('No new catalog files were created.');
} else {
  console.log(`Created ${created} catalog stub(s).`);
}
