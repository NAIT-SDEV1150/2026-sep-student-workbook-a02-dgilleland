import { describe, it } from 'vitest';
import { EvaluationItem, EvaluationPlan } from '../src/course-evaluations';

/* Rough planning....
- All numeric values cannot be negative

evaluations: evaluation[]
- Total Weight should equal 100

evaluation: { name: string, weight: number, pointsTotal: number | null, pointsEarned: number | null }
- name cannot be empty
- cannot have a number for `pointsEarned` while `pointsTotal` is null
- `pointsEarned` cannot be greater than `pointsTotal`
- `weight` cannot be zero or more than 100
- `pointsTotal` must be greater than zero


grade: { trendingAverageMark: number, earnedWeight: number, outstandingWeight: number }
    (all calculations)
- Earned weight is the marks earned so far in the course towards the final grade (sum of the marked evaulations).
- Outstanding weight represents the total weight of unmarked evaluations.
- Trending average mark is the percent average over the marked evaluations.
*/

describe('evaluation item validation', () => {
    // TODO: Implement at least 8 of the following unit tests,
    //       along with working code for the EvaluationItem class.
    it.todo('requires a non-empty name');
    it.todo('requires a numeric weight');
    it.todo('rejects negative numeric values');
    it.todo('rejects a weight of zero');
    it.todo('rejects a weight greater than 100');
    it.todo('allows points total and points earned to both be null');
    it.todo('rejects earned points when points total is null');
    it.todo('rejects a points total of zero');
    it.todo('rejects a negative points total');
    it.todo('rejects negative earned points');
    it.todo('rejects earned points greater than points total');
    it.todo('accepts earned points of zero when points total is greater than zero');
});

describe('evaluation plan validation', () => {
    // TODO: Do NOT create any working tests.
    // TODO: DO create simple test descriptions as to-do tests
    //       e.g.:
    //       it.todo('description');
});

describe('evaluation item calculations', () => {
    // TODO: Do NOT create any working tests.
    // TODO: DO create simple test descriptions as to-do tests
    //       e.g.:
    //       it.todo('description');
});

describe('course grade calculations', () => {
    // TODO: Do NOT create any working tests.
    // TODO: DO create simple test descriptions as to-do tests
    //       e.g.:
    //       it.todo('description');
});
