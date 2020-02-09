import { isMorty, isRick } from '../checkCharacters';

describe('isMorty', () => {
    it.each(['Morty capitalize', 'some over words and morty'])(
        'return true if passed "%s"',
        name => {
            expect(isMorty(name)).toBe(true);
        },
    );

    it.each(['kek_lol', ''])('should fail when pass string what not match ("%s")', wrongName => {
        expect(isMorty(wrongName)).not.toBe(true);
    });
});

describe('isRick function', () => {
    it.each(['Rick capitalize', 'some over words rick'])('return true if passed "%s"', name => {
        expect(isRick(name)).toBe(true);
    });

    it.each(['kek_lol', ''])('should fail when pass string what not match ("%s")', wrongName => {
        expect(isRick(wrongName)).not.toBe(true);
    });
});
