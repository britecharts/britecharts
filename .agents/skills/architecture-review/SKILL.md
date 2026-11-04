---
name: architecture-review
description: Use when reviewing Britecharts branch changes for architectural compliance — package layering, chart/helper boundaries, core→wrappers→react API parity, declared dependencies, and SCSS structure
---

# Architecture Review

## Overview

Use the [detailed workflow](references/workflow.md) to review the current branch's changes against the Britecharts monorepo architecture: the `react → wrappers → core → helpers → d3` dependency direction, the chart/helper boundary inside `core`, three-tier public API parity, and the SCSS bundle structure. The workflow produces findings, refactoring options, and a concrete recommendation written to `plan/architecture-review.md`.

## When to Use

- Before merging a feature branch into `main`
- When adding a new chart, or promoting a core-only chart into `wrappers`/`react`
- When moving code between `charts/` and `charts/helpers/`, or between packages
- When changing what a package imports, exports, or declares as a dependency
- When restructuring SCSS partials or the `britecharts.scss` / `common.scss` barrels

For logic and chart-API correctness use `$code-review`; for the lint/test/format gate use `$audit-changes`. This skill is about **structure**.

## Workflow

### Step 1: Determine Scope

- **Specific files/folders** — the user provided explicit paths
- **Full branch review** — everything else (default), diffed against `main`

`main` is the v3 integration branch; `origin/HEAD` still points at the v2 `master` line, so never let the review default to `master`.

### Step 2: Execute the Workflow

Read [references/workflow.md](references/workflow.md) and perform it for the scope and user context identified above. This reference contains the full project-specific procedure and output requirements. Execute it directly; no Claude Agent tool or named Claude agent is required.

### Step 3: Present Results

When the workflow completes, summarize for the user:

1. Key findings, highest-impact first
2. The recommended refactoring option
3. Where the full review lives (`plan/architecture-review.md`)
