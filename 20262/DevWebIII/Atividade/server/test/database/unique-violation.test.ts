import { isUniqueViolation } from '../../src/database/unique-violation';

describe('isUniqueViolation', () => {
  it('retorna true quando o erro possui code "23505"', () => {
    expect(isUniqueViolation({ code: '23505' })).toBe(true);
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['string "23505"', '23505'],
    ['número 23503', 23503],
    ['objeto vazio', {}],
    ['objeto com outro código', { code: 'outro' }],
  ])('retorna false para %s', (_label, input) => {
    expect(isUniqueViolation(input)).toBe(false);
  });
});

