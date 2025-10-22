# Catalog Schema Overview

Each Base UI wrapper must ship a JSON descriptor in `components/` so humans and LLMs can query component capabilities quickly. The shape is defined in `schema.json` and validated against JSON Schema Draft 2020-12.

## File Naming

- One file per component using kebab-case (e.g., `components/accordion.json`, `components/navigation-menu.json`).
- Group recipe-level entries separately under `docs/recipes/` (to be added in Phase 4).

## Required Fields

- `id`, `title`, `category`, `baseDocUrl`, and `description` capture identity and upstream references.
- `status` tracks build progress across implementation, docs, and tests.
- `variants` summarizes showcased scenarios and prop overrides that appear in Storybook/playground demos.
- `props`, `a11y`, `interactions`, and `dependencies` list the guardrails agents need when composing flows.

## Authoring Flow

1. Copy `components/template.json` or reuse an existing entry.
2. Fill in fields using concise sentences (≤25 words) and prefer markdown-friendly formatting for multiline notes.
3. Update `lastSynced` when upstream Base UI docs change.
4. After editing, run `npm run catalog:validate`, `npm run lint:md`, and `npm run check:links` to ensure references stay clean.
5. Log progress updates in `docs/catalog/status.json`.

## Validation

Run `npm run catalog:validate` for schema conformance (uses Ajv under the hood). Add this as a CI step once the catalog grows.
