import { getPotContent } from './oldoporto';

describe('controllers:oldoporto', () => {
    describe('getPotContent', () => {
        it('Should return Pot content', () => {
            expect(getPotContent({ temperature: 43, content: { field1: 'data' } })).toEqual({ field1: 'data' });
        });
    });
});
