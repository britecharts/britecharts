import { scaleLinear } from 'd3-scale';

import { getBaselineExtent, getValueDomain } from './domain';

describe('domain helper', () => {
    describe('getValueDomain', () => {
        it('should return the plain extent for non-negative data', () => {
            expect(getValueDomain([2, 8, 5])).toEqual([0, 8]);
        });

        it('should keep zero in the domain when data goes below it', () => {
            expect(getValueDomain([-4, 8, 5])).toEqual([-4, 8]);
        });

        it('should keep zero in the domain when data is all negative', () => {
            expect(getValueDomain([-4, -8, -5])).toEqual([-8, 0]);
        });

        it('should apply the ratio to both ends', () => {
            expect(getValueDomain([-4, 8], { ratio: 2 })).toEqual([-8, 16]);
        });

        it('should give an all-zero dataset a usable domain', () => {
            expect(getValueDomain([0, 0])).toEqual([0, 1]);
            expect(getValueDomain([0, 0], { emptyDomainMax: 3 })).toEqual([
                0, 3,
            ]);
        });

        it('should give empty data a usable domain', () => {
            expect(getValueDomain([])).toEqual([0, 1]);
        });
    });

    describe('getBaselineExtent', () => {
        // A value axis drawn top-to-bottom, the way the charts build it
        const scale = scaleLinear().domain([-10, 10]).range([200, 0]);

        it('should measure a positive value up from the baseline', () => {
            expect(getBaselineExtent(scale, 10)).toEqual({
                start: 0,
                size: 100,
            });
        });

        it('should measure a negative value down from the baseline', () => {
            expect(getBaselineExtent(scale, -10)).toEqual({
                start: 100,
                size: 100,
            });
        });

        it('should give a zero value no size', () => {
            expect(getBaselineExtent(scale, 0)).toEqual({
                start: 100,
                size: 0,
            });
        });

        it('should never return a negative size', () => {
            [-7, -1, 0, 1, 7].forEach((value) => {
                expect(
                    getBaselineExtent(scale, value).size
                ).toBeGreaterThanOrEqual(0);
            });
        });
    });
});
