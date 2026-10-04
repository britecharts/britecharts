---
name: feedback-verify-dont-echo
description: Marcos wants claims verified from code (not from his own summary), reported as file:line, with plain disagreement when warranted — no restating his premise back to him
metadata:
  type: feedback
---

When Marcos asks for a claim to be verified, re-derive it from the code rather than reasoning from the summary he supplied, and say plainly if he is wrong.

**Why:** He explicitly framed a review as "answered from the code, not from my summary" and "do not restate my description back to me. If you think X is wrong, say so plainly and show the evidence." He supplies his own evidence list and expects it to be treated as a hypothesis to test, including sweeping the sources he did *not* list.

**How to apply:**
- Enumerate *every* candidate location exhaustively (all packages, fixtures, data builders, stories, docs, integration consumers) before agreeing — his list is usually a subset.
- Report with concrete `path:line`, not prose.
- Lead with the verdict (right / wrong / partially), skip any recap of his premise.
- Distinguish the field he asked about from same-named fields on other shapes (e.g. `CustomLine.name` vs `LineChartDataShape.name`) — that distinction is the kind of thing he wants surfaced.
- Check for collateral damage he did not ask about, especially downstream types carrying the same value.
