import { fryPotatoes } from './bizar';

describe('controllers:bizar', () => {
    describe('fryPotatoes', () => {
        it('Should return fried potatoes when oil is available and potatoes are defined', () => {
            expect(fryPotatoes([{}], 'canola', ['canola', 'olive'])).toEqual([{ fried: true, oil: 'canola' }]);
        });

        it('Should throw an error when oil is NOT available', () => {
            function testThrow(): any {
                fryPotatoes([{}], 'funky', ['canola', 'olive']);
            }

            expect(testThrow).toThrow();
        });

        it('Should throw an error when availableOils is not defined', () => {
            function testThrow(): any {
                fryPotatoes([{}], 'funky', undefined);
            }

            expect(testThrow).toThrow();
        });
    });
});
