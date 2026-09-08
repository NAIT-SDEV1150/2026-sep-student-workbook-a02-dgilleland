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
        const expected = 'Assignment 1 - Mark Breakdown';
        const sut = document.querySelector('h1');
        expect(sut.textContent).toBe(expected);
    });

    it.each([ 'trending', 'earned-to-date' ])
    ('should set the element with id %s to some text', (id)=> {
        const sut = document.getElementById(id);
        expect(sut.textContent).toBeTruthy();
    });

    it("should fill the table with a header and at least 5 rows of data", ()=> {
        const table = document.querySelector('table');
        const actual = table.querySelectorAll('tr');
        expect(actual.length).toBeGreaterThanOrEqual(6);
    });
});
