---
name: create-unit-test
description: Use when you need to create, run, update, or debug Vitest unit tests in the Britecharts monorepo — follows the project workflow, which knows the core/wrappers/react spec styles
---

# Create Unit Test

## Overview

Use the [detailed workflow](references/workflow.md) to handle unit test work in Britecharts: writing new specs, running existing ones, debugging failures, or closing coverage gaps. Testing is Vitest + jsdom, and the conventions differ by package, so the workflow selects its style from the target path.

| Package | What a spec tests | How |
|---|---|---|
| `@britecharts/core` | the rendered SVG and the accessor API | render into a jsdom fixture with `d3-selection`, assert on `.select(...).size()` |
| `@britecharts/wrappers` | the `create`/`update`/`destroy` contract | mount into a detached `div`, assert on thrown validation errors and DOM data |
| `@britecharts/react` | the component's delegation to its wrapper | `mount` (a Testing Library shim, `testing/mount.tsx`), `vi.spyOn` the wrapper's methods |

Specs are `<name>.spec.js`, colocated with their source. Sibling workspaces resolve to source via Vitest `resolve.alias`, so **no build step is needed before testing**.

## When to Use

- After adding a chart, an accessor, a helper, a wrapper, or a React component
- When a spec is failing and needs diagnosis
- When a behavior changed and its spec needs updating
- When you want coverage for an untested path

## Workflow

### Step 1: Determine Intent

- **Create** — new code needs specs
- **Run** — execute specs and report results
- **Debug** — specs are failing and need diagnosis
- **Update** — code changed and existing specs are stale

### Step 2: Execute the Workflow

Read [references/workflow.md](references/workflow.md) and perform it for the scope and user context identified above. This reference contains the full project-specific procedure and output requirements. Execute it directly; no Claude Agent tool or named Claude agent is required.

### Step 3: Present Results

When the workflow completes, summarize:

1. What was done — specs created, run, or fixed
2. Results — passed / failed / skipped counts
3. Any remaining gap, flake, or jsdom limitation worth knowing about
