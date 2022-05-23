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
        const actualCaseThree = castValueToType(
            anotherDateString,
            'invalidInput'
        );

        expect(typeof actualCaseThree).toEqual(typeof expectedCaseThree);
    });
});
