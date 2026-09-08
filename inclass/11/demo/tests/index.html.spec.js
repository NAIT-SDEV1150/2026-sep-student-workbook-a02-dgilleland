// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import path from 'path';


describe('The HTML file', () => {
    beforeAll(() => {
        // NOTE: Remember, JSDOM does not implement `.innerText` on elements
        //       because `.innerText` requires layout, which JSDOM does not support.
        //       Tests should use `.textContent` instead
        //       OR use the following in a beforeAll():
        Object.defineProperty(HTMLElement.prototype, 'innerText', {
            get: function () {
                return this.textContent;
            },
            set: function (str) {
                this.textContent = str.toString();
            }
        })
    });

    const indexFile = path.join(process.cwd(), 'index.html');
    beforeEach(async () => {
        await JSDOM.fromFile(indexFile).then(dom => document = dom.window.document);
    });

    it('should have one script tag', () => {
        const scripts = document.querySelectorAll('script');
        expect(scripts.length).toBe(1);
    });

    it('should have the script tag in the head', () => {
        const script = document.querySelector('head script');
        expect(script).not.toBeNull();
    });

    it('should not be an inline script', () => {
        const script = document.querySelector('script');
        expect(script.innerText).toBeUndefined();
    })

    it('should have type="module" on script tag', () => {
        const script = document.querySelector('script');
        const type = script.type;
        expect(type).toBe('module');
    });

    it('should not have the defer attribute on script tag', () => {
        const script = document.querySelector('script');
        expect(script.defer).toBeFalsy();
    });

    it('should reference main.js as the source for the script', () => {
        const script = document.querySelector('script') ?? {};
        const source = script.src;
        expect(source).toMatch(/js\/main.js$/);
    });
});
