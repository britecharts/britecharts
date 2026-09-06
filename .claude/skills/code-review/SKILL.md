---
name: code-review
description: Use when reviewing Britecharts branch changes or unstaged changes for logic errors, unclear intent, and chart-API correctness before merging or committing
---

# Code Review

## Overview

Dispatches the `cr-agent` to perform a meticulous code review of Britecharts changes, focused on logic, functionality, chart-API correctness and clarity of intent. The agent produces prioritized findings (P0–P4) written to individual files in `plan/`. It does **not** implement fixes.

## When to Use

- Before merging a feature branch into `main` (full branch review)
- Before committing work in progress (unstaged-only review)
- When you want a second pair of eyes on changed chart code

For "does it lint, test and format" use `/audit-changes` instead — this skill is about judgment, not the gate.

## Workflow

### Step 1: Determine Scope

- **Unstaged changes only** — the user explicitly asked for unstaged/uncommitted changes
- **Full branch review** — everything else (default), diffed against `main`

`main` is the v3 integration branch. `master` is the v2 maintenance line and `origin/HEAD` still points at it, so never let the review default to `master` unless the user is reviewing a v2 backport.

### Step 2: Dispatch cr-agent

Dispatch `cr-agent` via the Agent tool with a prompt containing:

1. **The scope** — "review unstaged changes only" or "perform a full branch review against `main`"
2. **Any user context** — specific concerns, packages, charts, or files the user called out

The cr-agent handles the rest autonomously: generating the diff, reading plan context, reviewing, and writing findings.

### Step 3: Present Results

When the cr-agent returns, summarize for the user:

1. Counts by priority (P0, P1, P2, …)
2. Every **P0 and P1** finding with its title and location
3. Where the full findings live (`plan/cr-<batch>-*.md`)
