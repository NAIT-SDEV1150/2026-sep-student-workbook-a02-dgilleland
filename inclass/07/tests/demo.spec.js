import { describe, it, expect } from 'vitest';
// import * as demo from '../finished-demo';
import * as demo from '../demo';

describe('Lesson 07 demo', () => {
    it('should have exported items', () => {
        console.log(demo)
        expect(demo).toBeDefined();
        expect(Object.keys(demo).length).toBeGreaterThan(0);
    });
    
    const { checkBattery, bookSeats, announcePlayStatus, reportTriangle } = demo;

    it.each([ 'checkBattery', 'bookSeats', 'announcePlayStatus', 'reportTriangle' ])
    ('should have coded the function %s()', (identifier) => {
        expect(demo[identifier]).toBeDefined();
        expect(typeof demo[identifier]).toBe('function');
    });

    it.each([ 'checkBattery', 'announcePlayStatus' ])
    ('should have an if statement in the function %s()', (identifier) => {
        expect(demo[identifier]).toBeDefined();
        const code = demo[identifier].toString();
        expect(code.includes(' if')).toBeTruthy();
    });

    it.each([ 'bookSeats', 'reportTriangle' ])
    ('should have an if-else statement in the function %s()', (identifier) => {
        expect(demo[identifier]).toBeDefined();
        const code = demo[identifier].toString();
        expect(code.includes(' if')).toBeTruthy();
        expect(code.includes('} else {')).toBeTruthy();
    });
});
