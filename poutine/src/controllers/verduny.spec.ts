import { cutPotatoes, dipPotatoes } from './verduny';

describe('controllers:verduny', () => {
    describe('cutPotatoes', () => {
        it('Should return cut potatoes', () => {
            expect(cutPotatoes(3, 2)).toEqual([
                { sideLength: 3, cut: true },
                { sideLength: 3, cut: true },
            ]);
        });
    });

    describe('dipPotatoes', () => {
        it('Should return dip potatoes', () => {
            expect(dipPotatoes([{ sideLength: 3, cut: true }], 42)).resolves.toEqual([
                { sideLength: 3, cut: true, dipped: true, dippingDuration: 42 },
            ]);
        });
    });
});
