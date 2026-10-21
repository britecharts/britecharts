---
tags: [skill-creator]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

I'm working on a React 19 + TypeScript app that uses @britecharts/react. I need a RevenueByRegion component (src/components/RevenueByRegion.tsx) that fetches /api/revenue and shows quarterly revenue stacked by region, full width of its parent, with a tooltip on hover. While the request is in flight it should show the chart's loading state rather than a spinner. The endpoint returns { rows: Array<{ quarter: string; region: string; revenue: number }> }, e.g. { quarter: "Q1 2026", region: "EMEA", revenue: 120000 }. Write the component.
