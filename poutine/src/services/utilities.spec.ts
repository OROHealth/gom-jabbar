import { splitEnvVarArray } from './utilities';

describe('services:utilities', () => {
    describe('splitEnvVarArray', () => {
        it('Should return array split into a List', () => {
            expect(splitEnvVarArray('word1,word2')).toEqual(['word1', 'word2']);
        });

        it('Should return an empty List when input array is an empty string', () => {
            expect(splitEnvVarArray('')).toEqual([]);
        });
    });
});
