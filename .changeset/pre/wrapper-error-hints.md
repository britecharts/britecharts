---
'@britecharts/wrappers': minor
---

A configuration key the chart has no accessor for still throws `Method not supported by Britechart: <keys>`, and the message now goes on to help fix it. For each key that looks like a typo or a miscased name, it suggests the accessor or event that was meant (`heigth: did you mean height?`), and it links the chart's API page. A missing container's error now says to pass an element that exists in the document.
