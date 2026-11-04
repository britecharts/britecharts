---
name: quality
description: Use after main implementation tasks are complete — runs code review, architecture review, and style review in parallel to validate the branch before merge
---

# Quality

## Overview

After implementation and `$audit-changes` pass, run code, architecture, and style reviews against `main`. Reviews report findings without implementing fixes. `main` is the v3 integration branch; do not default to `master` or `origin/HEAD`.

## Workflow

1. Inspect the branch diff and its size:

   ```bash
   git diff --stat "$(git merge-base HEAD main)"...HEAD
   git diff "$(git merge-base HEAD main)"...HEAD -- ':(exclude)*.json' ':(exclude)pnpm-lock.yaml'
   ```

   Inspect changed manifests and relevant JSON separately. Avoid loading the lockfile into review context. If there are no changes in scope, report that and stop.

2. Run these three review workflows for the same scope:

   - [Code review](../code-review/SKILL.md): logic, functionality, chart API correctness, and intent. Output: `plan/cr-<batch>-<n>.md`.
   - [Architecture review](../architecture-review/SKILL.md): layering, boundaries, placement, API parity, dependencies, and SCSS. Output: `plan/architecture-review.md`.
   - [Style review](../style-review/SKILL.md): naming, JSDoc, chart structure, and reusable-chart closure. Output: `plan/style-review.md`.

   When subagent tools are available and delegation is permitted, run the three reviews concurrently, passing each the linked skill path, scope, and user context. Otherwise perform all three directly. Do not depend on Claude's Agent tool or named agent definitions.

3. Present a combined summary:

   - Code review: counts by priority and every P0/P1 title and location.
   - Architecture: recommendation and any breaking change requiring a major changeset.
   - Style: new findings ordered by impact on consumers, breaking renames, and stale convention documents.
   - Merge blockers: P0/P1 findings, parity/dependency violations, and public API changes missing changesets.
   - Links to the full reports in `plan/` (gitignored).

Report clean reviews plainly; do not manufacture findings. Prioritize P0/P1 over minor issues. Keep fixes separate from this review workflow.
