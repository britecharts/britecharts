---
name: create-story
description: Use when you need to create Storybook stories for a Britecharts chart — follows the project workflow, which handles both the core (vanilla D3/HTML) and react story styles
---

# Create Story

## Overview

Use the [detailed workflow](references/workflow.md) to write Storybook stories for a Britecharts chart. Stories are the primary documentation for this library — the published Storybooks are what users browse — so every chart and every meaningful accessor should be visible in one.

The repo has **two different story styles** and the workflow selects by package:

| Package | Storybook renderer | A story is… | File |
|---|---|---|---|
| `@britecharts/core` | `@storybook/html-vite` | a function returning a DOM node the chart was rendered into | `src/charts/<chart>/<chart>.stories.js` |
| `@britecharts/react` | `@storybook/react-vite` | a typed function returning JSX | `src/charts/<chartName>/<chartName>.stories.tsx` |

`@britecharts/wrappers` has no Storybook. `@britecharts/demos` composes the core and react Storybooks as refs — it is not where individual stories go.

## When to Use

- After adding a new chart to `core`, or a new React component to `react`
- After adding a public accessor or prop that has no visible demo
- When a chart's stories miss a state that users hit (loading, empty data, negative values, horizontal orientation)

## Workflow

### Step 1: Identify the Target

- **Chart path** — the exact source file the stories are for
- **Package** — `core` (vanilla) or `react`; this decides the whole story shape
- **Composition** — whether the chart is normally paired with `tooltip` or `legend`, which the story should demo too

If the user names a chart without a package, default to `core` and say so — that is where a chart exists first.

### Step 2: Execute the Workflow

Read [references/workflow.md](references/workflow.md) and perform it for the scope and user context identified above. This reference contains the full project-specific procedure and output requirements. Execute it directly; no Claude Agent tool or named Claude agent is required.

### Step 3: Present Results

When the workflow completes, summarize:

1. The story file written and its location
2. The named stories added, and which accessor or state each one demonstrates
3. How to view them — `pnpm run demos:core` (port 2001) or `pnpm run demos:react` (port 2002)
4. Any accessor left without a demo, and why
