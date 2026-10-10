---
'@britecharts/core': major
---

`TooltipTopic.name` is `string | number`, and `topicsOrder` matches it.

Two charts feed the tooltip's list layout and they name their topics differently. **line** hands over its raw flat rows, where `name` is a numeric topic id and `topicName` is the label. **stacked area**'s topics are named by string — `"Direct"` in its own data-shape example, and the string names its story passes to `topicsOrder`. The tooltip only ever compares this field or sorts by it, so both work at runtime.

Only the declaration had to pick one, and it had picked each in turn: `string` first, then `number` once `LineChartDataShape.name` was corrected. Both were half the story, and whichever was declared made the other chart's correct usage a type error.

**`topicsOrder` is now `TooltipTopic['name'][]`.** It was declared `string[]`, which matched neither consistently: the tooltip orders with `topic.name === orderName`, and its own spec passes `[1, 2, 3, 4, 5]` while stacked area's story passes `['Other', 'Sunny', …]`. A consumer who passed the wrong kind got no error and a list that silently sorted to nothing, because no comparison ever matched.

**Breaking**, type-only: code that narrowed a topic's `name` to `number` (or to `string`) now has to handle both, and `topicsOrder` accepts either kind.

`packages/integration`'s TypeScript consumer asserts both: a numeric order and a string order, each read back. Narrowing the union to either half fails the other one, which is the control.
