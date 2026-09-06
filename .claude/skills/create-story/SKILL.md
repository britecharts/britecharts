---
name: create-story
description: Use when you need to create Storybook stories for a Britecharts chart — dispatches the story-agent, which handles both the core (vanilla D3/HTML) and react story styles
---

# Create Story

## Overview

Dispatches the `story-agent` to write Storybook stories for a Britecharts chart. Stories are the primary documentation for this library — the published Storybooks are what users browse — so every chart and every meaningful accessor should be visible in one.

The repo has **two different story styles** and the agent picks by package:

| Package | Storybook renderer | A story is… | File |
|---|---|---|---|
| `@britecharts/core` | `@storybook/html` | a function returning a DOM node the chart was rendered into | `src/charts/<chart>/<chart>.stories.js` |
| `@britecharts/react` | `@storybook/react` | a function returning JSX | `src/charts/<chartName>/<chartName>.stories.js` |

`@britecharts/wrappers` has no Storybook. `@britecharts/demos` composes the core and react Storybooks as refs — it is not where individual stories go.

## When to Use

- After adding a new chart to `core`, or a new React component to `react`
- After adding a public accessor or prop that has no visible demo
- When a chart's stories miss a state that users hit (loading, empty data, negative values, horizontal orientation)

## Workflow

### Step 1: Identify the Target

- **Chart path** — the exact source file the stories are for
- **Package** — `core` (vanilla) or `react`; this decides the whole story shape
- **Composition** — whether the chart is normally paired with `miniTooltip`, `tooltip` or `legend`, which the story should demo too

If the user names a chart without a package, default to `core` and say so — that is where a chart exists first.

### Step 2: Dispatch story-agent

Dispatch the `story-agent` via the Agent tool with a prompt containing:

1. **The chart path and package**
2. **Which variants to showcase** — or let the agent derive them from the accessors and the data builder
3. **Any user context** — a specific state, orientation, or color schema to highlight

The story-agent handles the rest: reading the chart's accessors, finding the data builder or fixtures, writing the stories in the right style, and running the Storybook build check.

### Step 3: Present Results

When the story-agent returns, summarize:

1. The story file written and its location
2. The named stories added, and which accessor or state each one demonstrates
3. How to view them — `yarn demos:core` (port 2001) or `yarn demos:react` (port 2002)
4. Any accessor left without a demo, and why
