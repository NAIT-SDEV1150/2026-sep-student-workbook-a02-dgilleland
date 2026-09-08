import { describe, it, expect } from 'vitest';
// import * as demo from '../finished-demo';
import * as demo from '../demo';

describe('Lesson 03 demo', () => {
    it('should have exported items', () => {
        console.log(demo)
        expect(demo).toBeDefined();
        expect(Object.keys(demo).length).toBeGreaterThan(0);
    });

    it.each([
        {identifier: 'room', value: 'Media Lab'},
        {identifier: 'capacity', value: 16},
        {identifier: 'isOnline', value: false},
        {identifier: 'waitlist', value: 3},
    ])
    ('should include a workshop with a .$identifier property with a value of $value', ({identifier, value}) => {
        expect(demo?.workshop[identifier]).toBeDefined();
        expect(demo?.workshop[identifier]).toBe(value);
    });
    
    it('should include a facilitator object with certain properties', () => {
        const expected = {
            firstName: 'Avery',
            lastName: 'Chen',
            email: 'avery.chen@example.test',
            yearsExperience: 4,
            active: true
        }
       expect(demo?.facilitator).toEqual(expect.objectContaining(expected));
    });

    it('should have a signupUrl variable as an URL object', () => {
        expect(demo?.signupUrl).toBeDefined();
        expect(demo.signupUrl).toBeInstanceOf(URL);
    });
});
