import { scaleBand, scaleLinear } from 'd3-scale';

import { asCategoryScale, asValueScale } from './scale';

describe('scale helper', () => {
    // Both readers are types at compile time and identity at runtime, and the
    // identity is the part that matters: a chart calls
    // `asCategoryScale(xScale)(name)` and relies on the live scale, so wrapping
    // or copying would quietly detach it from the one `buildScales` assigned.
    it('hands back the same scale, not a copy', () => {
        const linear = scaleLinear();
        const band = scaleBand();

        expect(asValueScale(linear)).toBe(linear);
        expect(asCategoryScale(band)).toBe(band);
    });

    it('stays live when the scale it was given is reconfigured', () => {
        const band = scaleBand().domain(['a', 'b']).range([0, 100]);
        const read = asCategoryScale(band);

        expect(read('a')).toBe(0);

        band.range([100, 200]);

        expect(read('a')).toBe(100);
    });

    it('reads a continuous scale as the number-to-number function it is', () => {
        const linear = scaleLinear().domain([0, 10]).range([0, 100]);

        expect(asValueScale(linear)(5)).toBe(50);
    });
});
