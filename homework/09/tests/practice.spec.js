import { describe, it, expect } from 'vitest';
import {} from '../homework';

describe('Homework 09', () => {
  it('should have exported items', () => {
    console.log(demo)
    expect(demo).toBeDefined();
    expect(Object.keys(demo).length).toBeGreaterThan(0);
  });
   
  it.todo('', () => {

  });
});
