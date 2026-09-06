---
name: create-unit-test
description: Use when you need to create, run, update, or debug Jest unit tests in the Britecharts monorepo — dispatches the ut-agent, which knows the core/wrappers/react spec styles
---

# Create Unit Test

## Overview

Dispatches the `ut-agent` to handle unit test work in Britecharts: writing new specs, running existing ones, debugging failures, or closing coverage gaps. Testing is Jest + jsdom, and the conventions differ by package, so the agent picks its style from the target path.

| Package | What a spec tests | How |
|---|---|---|
| `@britecharts/core` | the rendered SVG and the accessor API | render into a jsdom fixture with `d3-selection`, assert on `.select(...).size()` |
| `@britecharts/wrappers` | the `create`/`update`/`destroy` contract | mount into a detached `div`, assert on thrown validation errors and DOM data |
| `@britecharts/react` | the component's delegation to its wrapper | enzyme `mount`, `jest.spyOn` the wrapper's methods |

Specs are `<name>.spec.js`, colocated with their source. Sibling workspaces resolve to source via `moduleNameMapper`, so **no build step is needed before testing**.

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

### Step 2: Dispatch ut-agent

Dispatch the `ut-agent` via the Agent tool with a prompt containing:

1. **The intent** — create, run, debug, or update
2. **Target files** — the exact source or spec paths involved
3. **Any context** — error output, the behavior that changed, or the coverage gap

The ut-agent handles the rest: reading the neighbouring specs for style, writing, running, and fixing until green.

### Step 3: Present Results

When the ut-agent returns, summarize:

1. What was done — specs created, run, or fixed
2. Results — passed / failed / skipped counts
3. Any remaining gap, flake, or jsdom limitation worth knowing about
