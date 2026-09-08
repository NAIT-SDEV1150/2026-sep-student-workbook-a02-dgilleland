import { describe, it, expect } from 'vitest';
// import * as demo from '../finished-demo';
import * as demo from '../demo';

describe('Lesson 05 demo', () => {
    it('should have exported items', () => {
        console.log(demo)
        expect(demo).toBeDefined();
        expect(Object.keys(demo).length).toBeGreaterThan(0);
    });

    const { buildNumberedLogger, calculateAmount, calculateMealCost, calculateBusCount, calculateAdmissionCost, formatMoney } = demo;

    it.each([
        { first: 12, second: 13, expected: 25 },
        { first: 0.1, second: 0.2, expected: 0.30000000000000004 }
    ])('calculateAmount() should perform the operation with the correct answer', ({first, second, expected}) => {
        let operation = (a, b) => a + b;
        let actual = calculateAmount(first, second, operation);
        expect(actual).toBe(expected);
    });

    it.each([
        {count: 5 , perPerson: 2.93, expected: 14.65 }
    ])('calculateMealCost() should perform the calculation correctly', ({count, perPerson, expected}) => {
        let actual = calculateMealCost(count, perPerson);
        expect(actual).toBe(expected);
    });

    it.each([
        {count: 25, expected: 3},
        {count: 24, expected: 2}
    ])('calculateBusCount() should calculate $expected busses', ({count, expected}) => {
        let actual = calculateBusCount(count, 12);
        expect(actual).toBe(expected);
    });

    it.each([
        {count: 5, expected: 72.5}
    ])('calculateAdmissionCost() should produce $expected for $count people', ({count, expected}) => {
        let actual = calculateAdmissionCost(count, 14.50);
        expect(actual).toBe(expected);
    });

    it('formatMoney() should format as money', () => {
        let actual = formatMoney(12);
        expect(actual).toBe('$ 12.00')
    });

    it('buildNumberedLogger() should return a function', () => {
        let actual = buildNumberedLogger();
        expect(typeof actual).toBe('function');
    });
});
