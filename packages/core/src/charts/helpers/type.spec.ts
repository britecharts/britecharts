import { castValueToType } from './type';

describe('type Helper', () => {
    it('should cast the type correct to a number', () => {
        const actualCaseOne = castValueToType('127', 'number');
        const expectedCaseOne = 127;

        expect(typeof actualCaseOne).toEqual(typeof expectedCaseOne);

        const expectedCaseTwo = new Date('December 17, 2020 01:02:03');
        const dateString = 'December 17, 2020 01:02:03';
        const actualCaseTwo = castValueToType(dateString, 'date');

        expect(typeof actualCaseTwo).toEqual(typeof expectedCaseTwo);

        const expectedCaseThree = new Date('December 17, 2020 01:02:03');
        const anotherDateString = 'December 17, 2020 01:02:03';
        // Pins the fall-through: anything that is not 'number' casts to a
        // Date. Worth keeping, and worth rejecting at the type level -- the
        // only two values the charts ever pass are 'date' and 'number', so a
        // third one reaching here is a caller bug even though the runtime
        // copes with it.
        const actualCaseThree = castValueToType(
            anotherDateString,
            // @ts-expect-error not an XAxisValueType; the runtime falls through
            'invalidInput'
        );

        expect(typeof actualCaseThree).toEqual(typeof expectedCaseThree);
    });
});
