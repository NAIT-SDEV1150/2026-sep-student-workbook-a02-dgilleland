import fs from 'fs';
import path from 'path';

/**
 * resolvePath() is a wrapper for the @see {@link path.resolve} function
 * @param  {...any} paths - A sequence of paths or path segments
 * @returns {String} The fully-qualified path
 */
export const resolvePath = (...paths) => path.resolve(...paths);

/**
 * readTestFile() returns the contents of a file in the `~/tests/` folder
 * @param  {...any} paths - Typically just the file name, but can be a deeply nested file 
 * @returns {String} The contents of the file in the `~/tests/` folder
 */
export const readTestFile = (...paths) => fs.readFileSync(path.resolve('tests', ...paths));

/**
 * definInnerText() will add an `.innerText` property onto the 
 * `HTMLElement.prototype` whose implementation gets/sets the 
 * `.textContent` of a DOM element.
 * @description
 * HACK: Remember, JSDOM does not implement `.innerText` on elements
 *       because `.innerText` requires layout, which JSDOM does not support.
 *       This is a suitable hack, however, as long as you are expecting
 *       the DOM elements under test to only have text (no nested DOM elements).
 */
export const defineInnerText = function() {
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
        get: function() {
            return this.textContent.toString();
        },
        set: function(str) {
            this.textContent = str.toString();
        }
    });
}
