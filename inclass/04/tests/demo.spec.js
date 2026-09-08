import { describe, it, expect } from 'vitest';
// import * as demo from '../finished-demo';
import * as demo from '../demo';

describe('Lesson 04 demo', () => {
    it('should have exported items', () => {
        console.log(demo)
        expect(demo).toBeDefined();
        expect(Object.keys(demo).length).toBeGreaterThan(0);
    });
    const {cart, pickupItems, itemPrices, itemIsFrozen } = demo;

    it('should have a cart array of objects', () => {
        const expected = [
            { name: 'bread', price: 3.49, quantity: 1 }];
        expect(demo?.cart).toBeDefined();
        expect(demo.cart).toEqual(expect.arrayContaining(expected));
        expect(demo.cart.length).toBeGreaterThanOrEqual(3);
    });

    it('should have a pickupItems as an array of objects', () => {
        const expected = [ 'bread', 'apples', 'coffee'];
        expect(demo?.pickupItems).toBeDefined();
        expect(demo.pickupItems).toEqual(expect.arrayContaining(expected));
        expect(demo.pickupItems.length).toBeGreaterThanOrEqual(5);
    });

    it('should have the same number of elements in the pickupItems, itemPrices, and itemIsFrozen arrays', () => {
        expect(demo?.pickupItems).toBeDefined();
        expect(demo.pickupItems.length).toBeGreaterThanOrEqual(5);

        expect(demo?.itemPrices).toBeDefined();
        expect(demo.itemPrices.length).toBe(demo.pickupItems.length);

        expect(demo?.itemIsFrozen).toBeDefined();
        expect(demo.itemIsFrozen.length).toBe(demo.pickupItems.length);
    });
});
