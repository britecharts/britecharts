---
 sidebar_position: 1 
---
 # @britecharts/core

> `@britecharts/core` is the main package for the [Britecharts][homepage] charting library. Use this package directly in your JavaScript projects.

## Usage
Read the [main readme][readme] or check the [Getting Started guide][gettingStarted] to learn how to use Britecharts.

## Installation
To install run:
```sh
pnpm add @britecharts/core
```
Or, with npm:

```
npm i --save @britecharts/core
```

Britecharts is available as an [NPM module][npmModule] or through CDN links (in [different formats][jsDelivrLib] or a [bundle][jsDelivrDist]).

## Using Britecharts with a coding agent
The package ships an agent skill in `skills/britecharts`. It covers each chart's data shape and accessors, tooltip wiring, React and the wrappers, and the v2 code that no longer works in v3. Install it with the [skills CLI][skillsCli]:

```sh
npx skills add britecharts/britecharts
```

Or copy `node_modules/@britecharts/core/skills/britecharts` into your agent's skills folder, such as `.claude/skills/` for Claude Code. Agents that read [llms.txt][llmsTxt] can also load the whole documentation from [llms-full.txt][llmsFullTxt].

## See Also
- [Documentation Homepage][homepage]
- [Contributing Guide][contributing]
- [Code of Conduct][codeOfConduct]

## Contribute
Check the [contributing guide][contributing] if you want to help us bringing these in. 

[readme]: https://britecharts.github.io/britecharts/docs/Britecharts
[homepage]: https://britecharts.github.io/britecharts/
[gettingStarted]: https://britecharts.github.io/britecharts/docs/tutorials/getting-started
[npmModule]: https://www.npmjs.com/package/@britecharts/core
[jsDelivrLib]: https://cdn.jsdelivr.net/npm/@britecharts/core/dist/
[jsDelivrDist]: https://cdn.jsdelivr.net/npm/@britecharts/core/dist/cdn/bundle/core.cdn.min.js
[skillsCli]: https://github.com/vercel-labs/skills
[llmsTxt]: https://britecharts.github.io/britecharts/llms.txt
[llmsFullTxt]: https://britecharts.github.io/britecharts/llms-full.txt
[contributing]: https://github.com/britecharts/britecharts/blob/main/.github/CONTRIBUTING.md
[codeOfConduct]: https://github.com/britecharts/britecharts/blob/main/CODE_OF_CONDUCT.md
