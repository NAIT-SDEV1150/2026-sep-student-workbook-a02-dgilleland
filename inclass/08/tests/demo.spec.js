import { describe, it, expect } from 'vitest';
// import * as demo from '../finished-demo';
import * as demo from '../demo';

describe('Lesson 08 demo', () => {
    it('should have exported items', () => {
        console.log(demo)
        expect(demo).toBeDefined();
        expect(Object.keys(demo).length).toBeGreaterThan(0);
    });
    
    const {isPassingGrade, hasCompleteProfile, hasHonoursGrade } = demo;
    
    it.each([
        { grade: 50, expected: true},
        { grade: 49, expected: false}
    ])
    ('should return $expected for isPassingGrade($grade)', ({grade, expected}) => {
        expect(isPassingGrade(grade)).toBe(expected);
    });
    
    it.each([
        { given: {name: 'Anna', email: 'a@b.com'}, expected: true},
        { given: {name: 'Anna', email: ''}, expected: false},
        { given: {name: '', email: 'a@b.com'}, expected: false},
    ])
    ('should return $expected for hasCompleteProfile($given)', ({given, expected}) => {
        expect(hasCompleteProfile(given)).toBe(expected);
    });
    
    it.each([
        { grade: 80, expected: true},
        { grade: 79, expected: false}
    ])
    ('should return $expected for hasHonoursGrade($grade)', ({grade, expected}) => {
        expect(hasHonoursGrade(grade)).toBe(expected);
    });

});
