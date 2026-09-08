import { describe, it, expect } from 'vitest';
// import * as demo from '../finished-demo';
import * as demo from '../demo';

describe('Lesson 02 demo', () => {
    it('should have exported items', () => {
        console.log(demo)
        expect(demo).toBeDefined();
        expect(Object.keys(demo).length).toBeGreaterThan(0);
    });
    
    it.each([
        {identifier: 'tax', value: 5.325},
        {identifier: 'totalWithTax', value: 111.825},
        {identifier: 'gstRate', value: 0.05},
        {identifier: 'totalBudget', value: 106.5},
        {identifier: 'donationText', value: '25.50'},
        {identifier: 'donationAmount', value: 25.5}
    ])
    ('$identifier should exist with a value of $value', ({identifier, value}) => {
        expect(demo[identifier]).toBeDefined();
        expect(demo[identifier]).toBe(value);
    });
});
