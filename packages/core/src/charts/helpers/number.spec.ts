import { calcLinearRegression, calculatePercent, isInteger } from './number';

describe('number Helper', () => {
    describe('calcLinearRegression', () => {
        // These points sit exactly on y = x + 10, so the fit is slope 1,
        // intercept 10 and both ends are known without recomputing the
        // regression here.
        const onALine = [
            { x: 10, y: 20 },
            { x: 20, y: 30 },
            { x: 30, y: 40 },
        ];

        it('should put each end of the line at the height of its own x', () => {
            const actual = calcLinearRegression(onALine);

            expect(actual).toEqual({ x1: 10, y1: 20, x2: 30, y2: 40 });
        });

        // The regression used to evaluate the left end at the *number of
        // points* instead of at minX -- `slope * n + intercept`. With three
        // points on y = x + 10 that is 1 * 3 + 10 = 13, where the point at
        // x = 10 is at y = 20. The scatter plot drew the trendline from there,
        // so its left end hung 7 units low.
        it('should not evaluate the left end at the number of points', () => {
            const pointCount = onALine.length;
            const { y1 } = calcLinearRegression(onALine);

            expect(y1).not.toEqual(pointCount + 10);
            expect(y1).toEqual(20);
        });

        it('should slope downwards for descending data', () => {
            const actual = calcLinearRegression([
                { x: 0, y: 100 },
                { x: 10, y: 50 },
                { x: 20, y: 0 },
            ]);

            expect(actual).toEqual({ x1: 0, y1: 100, x2: 20, y2: 0 });
        });
    });

    it('should return true if its an integer', () => {
        const expected = true;
        const actual = isInteger(3);

        expect(actual).toEqual(expected);
    });

    it('should return false passed a non integer', () => {
        const expected = false;
        const actual = isInteger(3.2);

        expect(actual).toEqual(expected);
    });

    it('should calculate percent from value and total', () => {
        const expected = '10.0';
        const actual = calculatePercent(10, 100, '.1f');

        expect(actual).toEqual(expected);
    });

    it('should return specified number of decimal places', () => {
        const expected = '20.00';
        const actual = calculatePercent(20, 100, '.2f');

        expect(actual).toEqual(expected);
    });
});
