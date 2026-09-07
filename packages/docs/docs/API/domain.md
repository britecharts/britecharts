# Constants

<dl>
<dt><a href="#getValueDomain">getValueDomain</a> ⇒ <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Builds the domain for a value axis so that it always contains zero.</p>
<p>Charts whose marks grow from a baseline need that baseline inside the domain,
otherwise a negative value scales to a coordinate outside the range and the
mark is drawn with a negative width or height, which SVG rejects.</p>
<p>For data that is entirely non-negative this returns the same <code>[0, max]</code> the
charts used before, so nothing about existing charts changes.</p>
</dd>
<dt><a href="#getBaselineExtent">getBaselineExtent</a> ⇒ <code>Object</code></dt>
<dd><p>Where a mark that grows from the zero baseline starts, and how long it is.</p>
<p>Works for either axis: with a vertical scale <code>start</code> is a y and <code>size</code> a
height, with a horizontal one they are an x and a width. Negative values come
back on the other side of the baseline with a positive size, which is what
SVG needs.</p>
</dd>
</dl>

<a name="getValueDomain"></a>

# getValueDomain ⇒ <code>Array.&lt;Number&gt;</code>
Builds the domain for a value axis so that it always contains zero.

Charts whose marks grow from a baseline need that baseline inside the domain,
otherwise a negative value scales to a coordinate outside the range and the
mark is drawn with a negative width or height, which SVG rejects.

For data that is entirely non-negative this returns the same `[0, max]` the
charts used before, so nothing about existing charts changes.

**Kind**: global constant  
**Returns**: <code>Array.&lt;Number&gt;</code> - [lower, upper], always spanning zero  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;Number&gt;</code> | Values the axis has to cover |
| ratio | <code>Number</code> | Headroom multiplier applied to the extent |
| emptyDomainMax | <code>Number</code> | Upper bound to use when every value is 0 |

<a name="getBaselineExtent"></a>

# getBaselineExtent ⇒ <code>Object</code>
Where a mark that grows from the zero baseline starts, and how long it is.

Works for either axis: with a vertical scale `start` is a y and `size` a
height, with a horizontal one they are an x and a width. Negative values come
back on the other side of the baseline with a positive size, which is what
SVG needs.

**Kind**: global constant  
**Returns**: <code>Object</code> - { start, size }  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>function</code> | Linear scale for the value axis |
| value | <code>Number</code> | Value to place |

