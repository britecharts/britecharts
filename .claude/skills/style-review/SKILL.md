---
name: style-review
description: Use when checking Britecharts branch changes against the project's own documented conventions — accessor and variable naming, JSDoc completeness, the chart file's internal structure, and the reusable-chart closure shape
---

# Style Review

## Overview

Dispatches the `style-agent` to check the current branch's changes against the conventions this repo has written down about itself, in `packages/docs/docs/topics/`: accessor and variable naming (`api-guidelines.md`), JSDoc as the source the API reference is generated from (`code-standards.md`), the chart file's internal section order (`code-structure.md`), and the reusable-chart closure shape (`reusable-api.md`). The agent produces findings and naming proposals written to `plan/style-review.md`.

There is no `STYLEGUIDE.md` in this repo. Those four documents are the style guide, and the agent reads them at review time rather than carrying a copy — so the review cannot drift from what the project publishes.

## When to Use

- Before merging a feature branch into `main`
- When adding or renaming an accessor, a helper export, or a dispatched event
- When writing a new chart, or converting one to TypeScript — a conversion must keep every JSDoc tag verbatim, because the API pages are generated from them
- When a reviewer asks whether a name fits the guidelines

For logic and chart-API correctness use `/code-review`; for structure, layering and parity use `/architecture-review`; for the lint/test/format gate use `/audit-changes`. This skill is about **what things are called and how a file is shaped**, not formatting — `oxfmt` and ESLint already own that.

## Workflow

### Step 1: Determine Scope

- **Specific files/folders** — the user provided explicit paths
- **Full branch review** — everything else (default), diffed against `main`

`main` is the v3 integration branch; `origin/HEAD` still points at the v2 `master` line, so never let the review default to `master`.

### Step 2: Dispatch style-agent

Dispatch `style-agent` via the Agent tool with a prompt containing:

1. **The scope** — the specific paths, or "perform a full branch review against `main`"
2. **Any user context** — a name the user is unsure about, a chart they just wrote, or a particular document they want applied

The style-agent handles the rest autonomously: generating the diff, reading the `topics/` documents, reviewing, and writing the findings.

### Step 3: Present Results

When the style-agent returns, summarize for the user:

1. **New findings**, ordered by reach — a wrong accessor name or a missing JSDoc tag ships into the published API and the generated docs; an out-of-order accessor does not
2. Any **rename that is a breaking change** to the published API, and the changeset bump it needs
3. Any **document that is stale** rather than code that is wrong — usually the cheaper fix
4. Where the full review lives (`plan/style-review.md`)

Do not repeat pre-existing drift the diff merely sits next to; the agent separates it for this reason. If the diff is clean, say so in one line.
