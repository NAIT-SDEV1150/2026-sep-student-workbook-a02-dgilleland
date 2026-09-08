import { describe, test, it, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest';
import { defineInnerText, readTestFile, resolvePath } from './__helpers';

describe('main.js', () => {
    beforeAll(async () => {
        defineInnerText();
        document.body.innerHTML = readTestFile('../index.html');
        await import(resolvePath('js', 'main.js'));
    });

    afterAll(() => {
        vi.resetAllMocks();
    });

    it('should set the first H1 text (with proper upper/lower case text)', () => {
        const expected = 'JavaScript Can Update the DOM';
        const sut = document.querySelector('h1');
        expect(sut.textContent).toBe(expected);
    });

    it.each([
        { prop: 'width', expected: 180},
        { prop: 'alt', expected: 'A person building a website'}
    ])
    ('should set the aside image\'s $prop property  to $expected', ({prop, expected})=> {
        const asideImage = document.querySelector('aside img');
        expect(asideImage[prop]).toBe(expected);
    });

    it("should set the aside image's 'src' property to './img/undraw_code-review_jdgp.svg'", ()=> {
        const expected = '/img/undraw_code-review_jdgp.svg';
        const asideImage = document.querySelector('aside img');
        expect(asideImage.src).contains(expected);
    });
});
