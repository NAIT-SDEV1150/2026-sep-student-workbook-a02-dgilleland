import { describe, it, expect, vi, afterEach } from 'vitest';
import { calculateLetterGrade, calculateGradePoint, isValidLetterGrade, isValidPercent } from '../homework';
import * as homework from '../homework';

describe('Homework 08', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it.each([
    // {func: soh, name: "soh"},
    {func: isValidPercent, name:"isValidPercent"},
    {func: isValidLetterGrade, name:"isValidLetterGrade"},
    {func: calculateLetterGrade, name:"calculateLetterGrade"},
    {func: calculateGradePoint, name:"calculateGradePoint"}])
  ('should have exported function $name', ({func, name}) => {
    expect(func).toBeDefined();
    expect(typeof func).toBe('function');
  });

  it.each([
    { letter: 'A+', grade: 4.0},
    { letter: 'A',  grade: 4.0},
    { letter: 'A-', grade: 3.7},
    { letter: 'B+', grade: 3.3},
    { letter: 'B',  grade: 3.0},
    { letter: 'B-', grade: 2.7},
    { letter: 'C+', grade: 2.3},
    { letter: 'C',  grade: 2.0},
    { letter: 'C-', grade: 1.7},
    { letter: 'D+', grade: 1.3},
    { letter: 'D',  grade: 1},
    { letter: 'F',  grade: 0},
    { letter: 'WF', grade: 0}
  ])('should calculate $grade grade points for a $letter letter grade', ({letter, grade}) => {
    expect(calculateGradePoint(letter)).toBe(grade);
  });

  it('should use a switch statement in calculateGradePoint', () => {
    /* 🎵 A note about this test:
        This is not really a strong test in any real-world sense. It *can* be "faked" to get it to pass, so it's more of an "honors system" test. I am expecting the student to actually write the switch statement, not "pretend" to.
    */
    const actual = calculateGradePoint.toString();
    expect(actual).contains('select');
    const regex = new RegExp(`\\bcase\\b`, "g");
    const cases = actual.match(regex);
    expect(cases, 'expected the case keyword to be present').not.toBeNull();
    expect(cases.length, 'expected at least 9 case blocks').toBeGreaterThanOrEqual(9);
    expect(actual).contains('default:');
  });

  it.each([0, 50, 100])
  ('should accept %d as a valid percentage', (percent) => {
    expect(isValidPercent(percent)).toBe(true);
  });

  it.each([-1, 101])
  ('should reject %d an invalid percentage', (invalid) => {
    expect(isValidPercent(invalid)).toBe(false);
  });

  it.each(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'WF'])
  ('should accept %s a valid letter grade', (letter) => {
    expect(isValidLetterGrade(letter)).toBe(true);
  });

  it.each(['W', 'E', 'A++'])
  ('should reject %s as an invalid letter grade', (invalid) => {
    expect(isValidLetterGrade(invalid)).toBe(false);
  });

  it('should call isValidPercent() inside calculateLetterGrade()', () => {
    /* 🎵 A note about the mock...
      Students: Do NOT apply this as a general mocking pattern to use in real-world tests! 👀
      I'm using this approach because me test is checking a structural requirement in the assignment:
        calculateLetterGrade() should call isValidPercent()
      I am trying to verify that students practice composing functions by calling one local helper function from another.
    */
    const isValidPercent = vi.fn(() => true);
    const calculateLetterGradeWithMock = 
      new Function('isValidPercent',
                   `return ${calculateLetterGrade.toString()};`)
                   (isValidPercent);
    calculateLetterGradeWithMock(85);
    expect(isValidPercent).toHaveBeenCalledOnce();
  });

  it('should call isValidLetterGrade() inside calculateGradePoint()', () => {
    /* 🎵 A note about the mock...
      Students: Do NOT apply this as a general mocking pattern to use in real-world tests! 👀
      I'm using this approach because me test is checking a structural requirement in the assignment:
        calculateLetterGrade() should call isValidPercent()
      I am trying to verify that students practice composing functions by calling one local helper function from another.
    */
    const isValidLetterGrade = vi.fn(() => true);
    const calculateGradePointWithMock = 
      new Function('isValidLetterGrade',
                   `return ${calculateGradePoint.toString()};`)
                   (isValidLetterGrade);
    calculateGradePointWithMock('B+');
    expect(isValidLetterGrade).toHaveBeenCalledOnce();
  });

  it('should throw an Error() when an invalid percentage is supplied to calculateLetterGrade()', () => {
    const act = () => calculateLetterGrade(101);
    expect(act).toThrow();
  });

  it('should throw an Error() when an invalid letter grade is supplied to calculateGradePoint()', () => {
    const act = () => calculateGradePoint('A++');
    expect(act).toThrow();
  });
});
