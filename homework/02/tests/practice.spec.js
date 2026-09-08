import { describe, it, expect } from 'vitest';
// import * as demo from '../finished-demo';
import * as demo from '../practice';

describe('Homework 02', () => {
    it('should have exported items', () => {
        console.log(demo)
        expect(demo).toBeDefined();
        expect(Object.keys(demo).length).toBeGreaterThan(0);
    });
   
    it.each([
        {identifier: 'patchTotal', value: 52.199999999999996},
        {identifier: 'chainTotal', value: 66},
        {identifier: 'standTotal', value: 119.98},
        {identifier: 'subtotal', value: 238.18}
    ])
    ('$identifier should exist with a value of $value', ({identifier, value}) => {
        expect(demo[identifier]).toBeDefined();
        expect(demo[identifier]).toBe(value);
    });

    it('border should exist with two columns', () => {
        expect(demo?.border).toBeDefined();
        expect(typeof demo.border).toBe('string');
        expect(demo.border.length).toBeGreaterThanOrEqual(25);
        expect(demo.border.startsWith('|')).toBeTruthy();
        expect(demo.border.endsWith('|')).toBeTruthy();
        expect(demo.border.includes('--|--')).toBeTruthy();
    });

    it('logInventoryLine should be a function', () => {
        expect(typeof demo?.logInventoryLine).toBe('function');
    })
});
