# `.claude/` — Claude Code skills and agents

Project-local skills and agents for working on Britecharts with Claude Code. They
encode this repo's actual conventions — the Yarn 3 workspace commands, the
`react → wrappers → core` layering, the D3 reusable-chart API, and the three
different spec styles — so the assistant does not have to rediscover them.

These are adapted copies, not symlinks: they are specific to this repo and are
meant to be reviewed and evolved with it.

## Skills

Invoke with `/<name>`.

| Skill | What it does | Dispatches |
|---|---|---|
| `/audit-changes` | Lint, styles, related tests and format over the changed files, fixing until green | — |
| `/code-review` | Prioritized (P0–P4) review of the branch or unstaged diff | `cr-agent` |
| `/architecture-review` | Package layering, boundaries, API parity, declared deps, SCSS structure | `ar-agent` |
| `/create-story` | Storybook stories, in the core (vanilla) or react (JSX) style | `story-agent` |
| `/create-unit-test` | Jest specs for core charts, wrappers, or React components | `ut-agent` |

Review findings are written to `plan/`, which is gitignored.

## Notes for anyone editing these

- The integration branch is `main`. `origin/HEAD` still points at the v2
  `master` line, so diffs must name `main` explicitly.
- There is no type-check step in this repo; the `.d.ts` typings are hand-written
  and unchecked, which is why several of these files call out typings drift.
- Never run the root `yarn test` in tooling — its `posttest` hook runs
  `yarn format` across every `.js` file. Use `yarn test:ci`.
