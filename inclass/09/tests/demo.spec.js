import { describe, it, expect } from 'vitest';
// import { Shape, supportedShapes } from '../finished-demo/shapes';
import { Shape, supportedShapes } from '../shapes';

describe('Lesson 09 demo', () => {
    it('should not have modified supportedShapes', () => {
        expect(supportedShapes).toEqual(['circle', 'square', 'triangle'])
    });

    const circle = 'circle';
    const square = 'square';
    const triangle = 'triangle';

    it.each(supportedShapes)('should not have a preset value for %s dimensions', (shape) => {
        let sut = new Shape(shape);
        expect(sut.dimensions).toBe(undefined);
    });

    it.each(supportedShapes)('should not have a preset value for %s area', (shape) => {
        let sut = new Shape(shape);
        expect(sut.area()).toBe(undefined);
    });

        // Note: We'll accept the following
        // - `radius` for circles
        // - `length` for squares
        // - `base` and `height` for triangles
    it('should accept radius for a circle', () => {
        let sut = new Shape(circle);
        sut.assignDimensions({ radius: 1});
        let actual = sut.dimensions;
        expect(actual.radius).toBe(1);
    });
    
    it('should accept length for a square', () => {
        let sut = new Shape(square);
        sut.assignDimensions({length: 1});
        let actual = sut.dimensions;
        expect(actual.length).toBe(1);
    });
    
    it('should accept base and height for a triangle', () => {
        let sut = new Shape(triangle);
        sut.assignDimensions({base: 2, height: 1});
        let actual = sut.dimensions;
        expect(actual.base).toBe(2);
        expect(actual.height).toBe(1);
    });
    
   
    it('should calculate the area of a circle', () => {
        let sut = new Shape(circle);
        sut.assignDimensions({radius: 1});
        let actual = sut.area();
        expect(actual).toBe(Math.PI);
    });
    
    it('should calculate the area of a square', () => {
        let sut = new Shape(square);
        sut.assignDimensions({length: 2});
        let actual = sut.area();
        expect(actual).toBe(4);
    });
    
    it('should calculate the area of a triangle', () => {
        let sut = new Shape(triangle);
        sut.assignDimensions({base: 2, height: 1});
        let actual = sut.area();
        expect(actual).toBe(1);
    });

});
