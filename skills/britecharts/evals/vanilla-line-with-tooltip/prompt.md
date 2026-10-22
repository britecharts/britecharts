---
tags: [skill-creator]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

our admin dashboard is plain JS + vite (no framework) and we already use britecharts v3 for a couple of bar charts. can you add a line chart of daily signups per plan to the "signups" panel? the api gives me rows like this:

[{ "day": "2026-03-01", "plan": "Free", "signups": 120 }, { "day": "2026-03-01", "plan": "Pro", "signups": 14 }, { "day": "2026-03-02", "plan": "Free", "signups": 131 }, { "day": "2026-03-02", "plan": "Pro", "signups": 19 }, ...]

hovering should show a tooltip with each plan's number for that day. the panel is <div class="signups-chart"></div>. put the code in src/charts/signups.js and export a function drawSignups(rows).
