import { boilPotatoes } from './nordo';

describe('controllers:nordo', () => {
    describe('boilPotatoes', () => {
        it('Should return boiled potatoes', () => {
            expect(boilPotatoes([{}])).toEqual([{ boiled: true }]);
        });
    });
});
