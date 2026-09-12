// This fixes a problem with the wrapTextWithEllipses function in britecharts
// using getComputedTextLength and not being available because of jsdom.
// More info in https://github.com/britecharts/britecharts-react/pull/65#issuecomment-348726423
// jest.spyOn(
//     global.Element.prototype,
//     'getComputedTextLength'
// ).mockImplementation(() => 200);
global.Element.prototype.getComputedTextLength = jest.fn(() => 200);

// We don't want to show console.warn logs as we use them for deprecation messages
jest.spyOn(console, 'warn').mockImplementation(() => {});

// jsdom has no SVG geometry. d3's transform interpolator (used by every
// transition on a `transform` attribute) reads `transform.baseVal` off a
// detached <g>, which jsdom leaves undefined, so a transition that actually
// ticks under a spec would throw. With `consolidate()` returning null, d3
// treats the current transform as the identity and the tween runs.
if (
    typeof window !== 'undefined' &&
    window.SVGElement &&
    !('transform' in window.SVGElement.prototype)
) {
    Object.defineProperty(window.SVGElement.prototype, 'transform', {
        configurable: true,
        get() {
            return { baseVal: { consolidate: () => null } };
        },
    });
}
