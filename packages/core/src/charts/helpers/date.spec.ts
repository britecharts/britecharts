import date from './date';

describe('date Helper', () => {
    describe('diffDays', () => {
        it('should return difference between dates', () => {
            const expected = 1;
            const actual = date.diffDays('Thu Oct 05 2017', 'Thu Oct 04 2017');

            expect(actual).toEqual(expected);
        });
    });

    describe('addDays', () => {
        it('should add a number of days to a date', () => {
            const expected = 'Fri Oct 06 2017';
            const actual = date.addDays('Thu Oct 05 2017', 1).slice(0, 15);

            expect(actual).toEqual(expected);
        });
    });

    describe('convertMillisecondsToDays', () => {
        it('should transform milliseconds to days', () => {
            const expected = 2;
            const actual = date.convertMillisecondsToDays(
                expected * 24 * 60 * 60 * 1000
            );

            expect(actual).toEqual(expected);
        });

        it('should round up to at least one day', () => {
            const expected = 1;
            const actual = date.convertMillisecondsToDays(1000);

            expect(actual).toEqual(expected);
        });
    });
});
