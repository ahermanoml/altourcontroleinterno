# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This repo currently contains a **single untracked file**: `agencia-viagens-v2 (1).jsx` (note the space and parens in the filename — quote it in shell commands). There is no `package.json`, no build tooling, no tests, no `README.md`, and no commits yet on `main`. Treat the file as a self-contained React prototype/mockup, not a runnable app.

If you need to actually run it, you must scaffold a project first (e.g. Vite + React) and copy the component in — there is no existing build target to invoke.

## What the code is

A single-file React SPA mockup for **ViagemPro**, a Portuguese-language (pt-BR) CRM for a small travel agency. The file `export default`s an `App` component that renders the entire product. All data is hardcoded in `SAMPLE_*` constants at the top of the file — there is no API, no persistence, no router.

The product surface:
- **Onboarding wizard** (6 steps) gated by an `onboarded` state flag — shown on first render.
- **Sidebar tabs**: Painel (Dashboard), Clientes, Viagens, Financeiro, Fornecedores, Tarefas, Configurações. Defined in the `TABS` array; the active tab is rendered via the `tabContent` map in `App`.
- **Modals** for creating each entity (cliente, viagem, pagamento, fornecedor, tarefa), driven by a single `modal` string state in `App` and a switch of conditional renders.

## Architecture conventions to preserve

The whole file follows a few tight conventions. Match them when editing — don't introduce new patterns without reason.

- **Single-file, no imports beyond `useState`.** Everything (design tokens, sample data, shared components, tab components, modals, the `App` shell) lives in one file, separated by `// ─── SECTION ───` banner comments. New components should be added in the same banner-comment style, grouped by purpose.
- **Inline styles only — no CSS files, no className, no styled-components.** Every style is a JS object literal passed to `style={...}`. Colors come from the `C` constant near the top; status/priority colors come from `STATUS_COLORS` and `PRIORIDADE`. Always reference these instead of inlining hex values.
- **Fonts** are loaded by injecting a `<link>` to Google Fonts inside the rendered JSX (in `OnboardingWizard` and `App`). Headings use `'DM Serif Display'`; body uses `'IBM Plex Sans'`.
- **Shared primitives** live in the "SHARED COMPONENTS" section: `Badge`, `StatCard`, `SearchBar`, `Btn` (variants: `primary` | `secondary` | `accent` | `ghost`), `FormField` (handles input vs. select via the `options` prop), `Modal` (with optional `wide` prop), `SectionLabel`. Reuse these — don't reimplement buttons, inputs, or modal chrome inline.
- **State lives in `App`** and is passed down. Currently only `tarefas` is lifted to real state (via `setTarefas` for the toggle-complete interaction); the other entities are read directly from `SAMPLE_*` constants by the tab components. If you need a new entity to be mutable, follow the `tarefas` pattern: `useState(SAMPLE_X)` in `App`, pass `{x, setX}` into the tab.
- **Modal wiring**: tabs receive an `onAdd` (or `onAddPagamento`) callback from `App` that sets `modal` to a string key; `App` then conditionally renders the matching `Novo*Modal`. To add a new modal, extend the `modal` switch in `App` and pass a new callback into the relevant tab.
- **Locale**: all user-facing text is Brazilian Portuguese. Currency formatting goes through `fmt()` (BRL); dates through `fmtDate()` (yyyy-mm-dd → dd/mm/yyyy). Don't hand-format either.
- **Sample-data shape is the schema.** There is no separate type/model layer — the shape of each `SAMPLE_*` row is the de facto contract that every component reads. When adding fields, update the sample row, the modal's `FormField`s, and any tab that renders the entity.
