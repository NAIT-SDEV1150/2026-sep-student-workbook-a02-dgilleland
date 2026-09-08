import { describe, it, expect } from 'vitest';
// import * as demo from '../finished-demo';
import * as demo from '../demo';

describe('Lesson 06 demo', () => {
    it('should have exported items', () => {
        console.log(demo)
        expect(demo).toBeDefined();
        expect(Object.keys(demo).length).toBeGreaterThan(0);
    });
    
    const { scissors, maskingTape, camera, SupplyItem } = demo;

    it.each([
        { prop: 'scissors', type: 'Object'},
        { prop: 'maskingTape', type: 'SupplyItem'},
        { prop: 'camera', type: 'CheckoutItem'}
    ])('should define $prop as a $type', ({prop, type}) => {
        expect(demo[prop]?.__proto__.constructor.name).toBe(type);
    });

    it('should define SupplyItem as a constructor function', () => {
        expect(typeof SupplyItem).toBe('function');
        const actual = new SupplyItem('paperclips', 24, 'box');
        expect(actual).toEqual(expect.objectContaining({
            name: 'paperclips',
            quantity: 24,
            unit: 'box'
        }));
    });
});
