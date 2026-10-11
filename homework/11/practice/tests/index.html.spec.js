// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import path from 'path';


describe('The HTML file', () => {
    const indexFile = path.join(process.cwd(), 'index.html');
    let doc;
    beforeEach(async () => {
        const dom = await JSDOM.fromFile(indexFile);
        // NOTE: Remember, JSDOM does not implement `.innerText` on elements
        //       because `.innerText` requires layout, which JSDOM does not support.
        //       Tests should use `.textContent` instead
        //       OR patch it onto the prototype of the window that owns the elements
        //       (each JSDOM instance has its own window, so do it per instance):
        Object.defineProperty(dom.window.HTMLElement.prototype, 'innerText', {
            get: function () {
                return this.textContent;
            },
            set: function (str) {
                this.textContent = str.toString();
            }
        });
        doc = dom.window.document;
    });

    it('should have one script tag', () => {
        const scripts = doc.querySelectorAll('script');
        expect(scripts.length).toBe(1);
    });

    it('should have the script tag in the head', () => {
        const script = doc.querySelector('head script');
        expect(script).not.toBeNull();
    });

    it('should not be an inline script', () => {
        const script = doc.querySelector('script');
        expect(script.innerText.trim()).toBe('');
    })

    it('should have type="module" on script tag', () => {
        const script = doc.querySelector('script');
        const type = script.type;
        expect(type).toBe('module');
    });

    it('should not have the defer attribute on script tag', () => {
        const script = doc.querySelector('script');
        expect(script.defer).toBeFalsy();
    });

    it('should reference main.js as the source for the script', () => {
        const script = doc.querySelector('script') ?? {};
        const source = script.src;
        expect(source).toMatch(/js\/main.js$/);
    });
});
