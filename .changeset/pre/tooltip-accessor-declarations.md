---
'@britecharts/core': major
---

The tooltip's declarations match what it actually does. Sixteen setter-only accessors.

**Sixteen of its accessors were setter-only** — a single optional-parameter signature returning the module — so reading one reported the module rather than its value: `layout`, `dateFormat`, `dateCustomFormat`, `dateLabel`, `locale`, `nameLabel`, `numberFormat`, `valueFormatter`, `shouldShowDateInTitle`, `title`, `tooltipOffset`, `topicsOrder`, `topicLabel`, `valueLabel`, `maxEntries` and `xAxisValueType` are each a getter/setter overload pair now. `hide`, `show` and `update` are commands rather than accessors: they return void and have never chained.

**`dateFormat`'s getter never reports null**, where the two format accessors beside it do. It falls back to the default axis setting (`DAY_MONTH`) when none has been set, so it always answers with the format the tooltip would actually use, while `dateCustomFormat` and `numberFormat` report `null` until set. Three format accessors on one module, two different shapes.

**`locale` is `LocaleString | null | undefined`.** The tooltip declares it with no initialiser, so it reads `undefined` until set, and its setter accepts `null` — where the time-series charts default theirs to `null` and so never report `undefined`.

`TooltipXAxisValueType` is now a named export rather than an inline union repeated in two signatures.

**Breaking**, type-only: code relying on one of those sixteen getters' wrong return type no longer compiles, none of the setters accepts an explicit `undefined` any more, and the four nullable getters have to be guarded before use.

Found while preparing the tooltip's TypeScript conversion, which lands separately and which `mini-tooltip` is waiting on. `packages/integration`'s TypeScript consumer reads all sixteen, chains the setters and calls the formatter it reads back; `expect-errors.ts` holds the control for the four nullable ones.
