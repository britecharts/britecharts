import { calculatePercent, isInteger } from './number';

describe('number Helper', () => {
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
