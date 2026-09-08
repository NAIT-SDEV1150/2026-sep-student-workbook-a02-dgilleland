import { describe, it, expect } from 'vitest';
import { soh, cah, toa, calculateLoan, fromSeconds } from '../homework';

describe('Homework 05', () => {
  it.each([
    {func: soh, name: "soh"},
    {func: cah, name:"cah"},
    {func: toa, name:"toa"},
    {func: calculateLoan, name:"calculateLoan"},
    {func: fromSeconds, name:"fromSeconds"}])
  ('should have exported function $name', ({func, name}) => {
    expect(func).toBeDefined();
    expect(typeof func).toBe('function');
  });
  
  it.each([
    { opp: 3, hyp: 5, 
      expected: { 
        degrees: 36.86989764584402, gradians: 40.96655293982669, radians: 0.6435011087932844
      } },
    { opp: 4, hyp: 5, 
      expected: { 
        degrees: 53.13010235415599, gradians: 59.033447060173316, radians: 0.9272952180016123
      } }
  ])('should calculate angles for soh($opp, $hyp)', ({opp, hyp, expected}) => {
    const actual = soh(opp, hyp);
    expect(actual).toEqual(expected);
  });

  it.each([
    { adj: 4, hyp: 5, 
      expected: { 
        degrees: 36.86989764584401, gradians: 40.966552939826684, radians: 0.6435011087932843
      } },
    { adj: 3, hyp: 5, 
      expected: { 
        degrees: 53.13010235415599, gradians: 59.033447060173316, radians: 0.9272952180016123
      } }
  ])
  ('should calculate angles for cah($adj, $hyp)', ({adj, hyp, expected}) => {
    const actual = cah(adj, hyp);
    expect(actual).toEqual(expected);
  });

  it.each([
    { opp: 3, adj: 4, 
      expected: { 
        degrees: 36.86989764584402, gradians: 40.96655293982669, radians: 0.6435011087932844
      } },
    { opp: 4, adj: 3, 
      expected: { 
        degrees: 53.13010235415598, gradians: 59.03344706017331, radians: 0.9272952180016122
      } }
  ])
  ('should calculate angles for toa($opp, $adj)', ({opp, adj, expected}) => {
    const actual = toa(opp, adj);
    expect(actual).toEqual(expected);
  });

  it.each([
    { principal: 64_000, annualRate: 4.45, years: 5, monthlyPayment: 1191.70, totalPayments: 60, totalPaid: 71_502.00 },
    { principal: 64_000, annualRate: 4.45, years: 10, monthlyPayment: 661.74, totalPayments: 120, totalPaid: 79_408.80}
  ])
  ('should calculate $totalPayments payments of $ $monthlyPayment from a $annualRate % loan for $ $principal over $years years amounting to $ $totalPaid', ({principal, annualRate, years, monthlyPayment, totalPayments, totalPaid}) => {
    const actual = calculateLoan(principal, annualRate, years);
    expect(actual?.monthlyPayment).toBe(monthlyPayment);
    expect(actual?.totalPayments).toBe(totalPayments);
    expect(actual?.totalPaid).toBe(totalPaid);
  });

  it.each([
    { given: 60, expected: { hours: 0, minutes: 1, seconds: 0 }},
    { given: 3600, expected: { hours: 1, minutes: 0, seconds: 0 }},
    { given: 5, expected: { hours: 0, minutes: 0, seconds: 5 }},
    { given: 3695, expected: { hours: 1, minutes: 1, seconds: 35 }}
  ])
  ('should calculate $expected from $given seconds', ({given, expected}) => {
    const actual = fromSeconds(given);
    expect(actual).toEqual(expected);
  });
});
