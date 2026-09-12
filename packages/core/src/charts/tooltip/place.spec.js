import { place } from './place';

const frame = { width: 600, height: 300 };
const size = [250, 60];

describe('tooltip place()', () => {
    describe('horizontal side', () => {
        it('goes to the right of the anchor when there is room', () => {
            const { x, side } = place({ anchor: [100, 100], size, frame });

            expect(side).toEqual('right');
            expect(x).toEqual(112);
        });

        it('flips to the left when the box would leave the right edge', () => {
            const { x, side } = place({ anchor: [400, 100], size, frame });

            expect(side).toEqual('left');
            expect(x).toEqual(400 - 12 - 250);
        });

        it('respects a left preference when there is room', () => {
            const { x, side } = place({
                anchor: [400, 100],
                size,
                frame,
                side: 'left',
            });

            expect(side).toEqual('left');
            expect(x).toEqual(138);
        });

        it('flips a left preference to the right near the left edge', () => {
            const { x, side } = place({
                anchor: [100, 100],
                size,
                frame,
                side: 'left',
            });

            expect(side).toEqual('right');
            expect(x).toEqual(112);
        });

        it('uses the gap given', () => {
            const { x } = place({ anchor: [100, 100], size, frame, gap: 30 });

            expect(x).toEqual(130);
        });

        it('stays inside the frame when neither side has room', () => {
            const narrow = { width: 260, height: 300 };
            const { x } = place({ anchor: [130, 100], size, frame: narrow });

            expect(x).toBeGreaterThanOrEqual(0);
            expect(x + 250).toBeLessThanOrEqual(260);
        });

        it('starts at the edge when the box is wider than the frame', () => {
            const tiny = { width: 100, height: 300 };
            const { x } = place({ anchor: [50, 100], size, frame: tiny });

            expect(x).toEqual(0);
        });
    });

    describe('vertical position', () => {
        it('tops the box at the anchor', () => {
            const { y } = place({ anchor: [100, 100], size, frame });

            expect(y).toEqual(100);
        });

        it('applies the vertical offset', () => {
            const { y } = place({
                anchor: [100, 100],
                size,
                frame,
                offsetY: -20,
            });

            expect(y).toEqual(80);
        });

        it('clamps to the top edge', () => {
            const { y } = place({
                anchor: [100, 10],
                size,
                frame,
                offsetY: -55,
            });

            expect(y).toEqual(0);
        });

        it('clamps to the bottom edge', () => {
            const { y } = place({ anchor: [100, 280], size, frame });

            expect(y).toEqual(300 - 60);
        });

        it('starts at the top when the box is taller than the frame', () => {
            const { y } = place({
                anchor: [100, 100],
                size: [250, 400],
                frame,
            });

            expect(y).toEqual(0);
        });
    });

    describe('degenerate input', () => {
        it('treats an unbounded frame as never needing a flip or clamp', () => {
            const unbounded = { width: Infinity, height: Infinity };
            const { x, y, side } = place({
                anchor: [5000, 5000],
                size,
                frame: unbounded,
            });

            expect(side).toEqual('right');
            expect(x).toEqual(5012);
            expect(y).toEqual(5000);
        });

        it('treats a missing frame as unbounded', () => {
            const { x, y } = place({ anchor: [10, 20], size });

            expect(x).toEqual(22);
            expect(y).toEqual(20);
        });

        it('never returns NaN', () => {
            const { x, y } = place({
                anchor: [NaN, undefined],
                size: [NaN, 60],
                frame,
                offsetY: NaN,
            });

            expect(Number.isFinite(x)).toBe(true);
            expect(Number.isFinite(y)).toBe(true);
        });
    });
});
