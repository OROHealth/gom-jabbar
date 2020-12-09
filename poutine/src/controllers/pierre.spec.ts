import { mix } from './pierre';

describe('controllers:pierre', () => {
    describe('mix', () => {
        it('Should return mixed content', () => {
            expect(mix({ field1: 'data' })).toEqual({ field1: 'data', mixed: true });
        });

        it('Should throw an error if content is undefined', () => {
            function toTest(): void {
                mix(undefined);
            }

            expect(toTest).toThrow();
        });

        it('Should throw an error if content is empty', () => {
            function toTest(): void {
                mix({});
            }

            expect(toTest).toThrow();
        });
    });
});
