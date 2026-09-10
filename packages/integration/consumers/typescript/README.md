# typescript consumer

Compiled, never run. `src/charts/*.ts` are the fourteen chart sandboxes from
the old `britecharts-typescript-test-project`, pointed at `@britecharts/core`;
`src/react/*.tsx` builds every `@britecharts/react` component with its
required props. `tests/types.test.js` runs `tsc --noEmit` over them twice:

- `tsconfig.node.json` — `moduleResolution: node`, what TS users on older
  setups and Jest have.
- `tsconfig.bundler.json` — `moduleResolution: bundler`, what Vite and
  TypeScript 5 users have; this one honours the `exports` map.

`skipLibCheck` is deliberately **off**: the library's own `.d.ts` files are
the thing under test. Each file carries one `// @ts-expect-error` so a
typing that regresses to `any` fails the build too.

`@types/d3-selection` is intentionally not a dependency here: the core typings
import from `d3-selection`, so core has to bring the types itself.
