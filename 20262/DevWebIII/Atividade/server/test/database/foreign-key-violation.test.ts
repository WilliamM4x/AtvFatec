import { isForeignKeyViolation } from '../../src/database/foreign-key-violation';

describe('isForeignKeyViolation', () => {
  it('retorna true quando o erro possui code "23503"', () => {
    expect(isForeignKeyViolation({ code: '23503' })).toBe(true);
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['string "23505"', '23505'],
    ['número 23503', 23503],
    ['objeto vazio', {}],
    ['objeto com outro código', { code: 'outro' }],
  ])('retorna false para %s', (_label, input) => {
    expect(isForeignKeyViolation(input)).toBe(false);
  });
});

