# `.claude/` — Claude Code skills and agents

Project-local skills and agents for working on Britecharts with Claude Code. They
encode this repo's actual conventions — the pnpm workspace commands, the
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
| `/style-review` | Accessor naming, JSDoc completeness, chart file structure, the reusable-chart closure | `style-agent` |
| `/quality` | The post-completion gate: runs the three reviews below in parallel | `cr-agent`, `ar-agent`, `style-agent` |

Review findings are written to `plan/`, which is gitignored.

`/audit-changes` is the gate to run *while* working; `/quality` is the one to run
when the work is done, before opening a PR. `/quality` is marked
`disable-model-invocation`, so it only runs when you ask for it by name.

## Agents

Each is dispatched by the skill beside it; none needs to be launched by name.

| Agent | What it reviews |
|---|---|
| `cr-agent` | Logic errors, chart-API correctness, unclear intent |
| `ar-agent` | Package layering, boundaries, API parity, declared deps, SCSS structure |
| `story-agent` | Storybook stories, core (vanilla) and react (JSX) styles |
| `ut-agent` | Jest specs across the three spec styles |
| `style-agent` | The conventions in `packages/docs/docs/topics/` — accessor naming, JSDoc completeness, chart file structure, the reusable-chart closure |

`ar-agent` and `style-agent` divide a line worth knowing: `ar-agent` decides
which layer a file belongs to, `style-agent` decides what the thing in it is
called. Neither reports formatting — `oxfmt` and ESLint own that, via
`/audit-changes`.

## Notes for anyone editing these

- The integration branch is `main`. `origin/HEAD` still points at the v2
  `master` line, so diffs must name `main` explicitly.
- The package manager is pnpm (`packageManager: pnpm@12.6.0`). Scripts fan out
  with `pnpm -r`, so a per-package script has to exist in every package the
  root script targets.
- There **is** a type-check step: `pnpm run type-check` per package and in
  `lint.yml`, folded into the root `check`. The `.d.ts` typings under
  `packages/core/src/typings/` are still hand-written, and a TypeScript
  migration is converting the source that they describe — so these files' notes
  about typings drift still apply, but the drift is now caught by
  `pnpm --filter @britecharts/core run check:api-parity`, which compares each
  chart's runtime surface against its declaration in both directions.
- Use `pnpm run test:ci`, not the root `pnpm test`, in tooling. (`test` carries a
  `posttest` format hook that would reformat files mid-run.)
- `pnpm run test:integration` needs `pnpm run build:packages` first and Chromium
  installed once:
  `pnpm --filter @britecharts/integration exec playwright install chromium`.
