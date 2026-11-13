import { HttpError } from '../src/errors';
import {
  parseId,
  positiveInteger,
  validateBody,
  validateName,
} from '../src/validation';

function expectBadRequest(action: () => unknown): void {
  expect.assertions(2);
  try {
    action();
  } catch (error) {
    expect(error).toBeInstanceOf(HttpError);
    expect((error as HttpError).statusCode).toBe(400);
  }
}

describe('validation', () => {
  describe('positiveInteger', () => {
    it.each([1, 2147483647])(
      'retorna o próprio número para o limite válido %i',
      (value) => {
        expect(positiveInteger(value, 'RA')).toBe(value);
      },
    );

    it.each([
      ['0', 0],
      ['-1', -1],
      ['1.5', 1.5],
      ['NaN', Number.NaN],
      ['Infinity', Number.POSITIVE_INFINITY],
      ['2147483648', 2147483648],
      ['string "123"', '123'],
      ['null', null],
      ['undefined', undefined],
    ])('lança HttpError 400 para %s', (_label, value) => {
      expectBadRequest(() => positiveInteger(value, 'RA'));
    });
  });

  describe('parseId', () => {
    it.each([
      ['"1"', '1', 1],
      ['"2147483647"', '2147483647', 2147483647],
    ])('converte %s para o número %i', (_label, input, expected) => {
      expect(parseId(input, 'RA')).toBe(expected);
    });

    it.each([
      ['"1abc"', '1abc'],
      ['"1.2"', '1.2'],
      ['"1e2"', '1e2'],
      ['string vazia', ''],
      ['"-1"', '-1'],
      ['"0"', '0'],
      ['"2147483648"', '2147483648'],
      ['número 123', 123],
    ])('lança HttpError 400 para %s', (_label, value) => {
      expectBadRequest(() => parseId(value, 'RA'));
    });
  });

  describe('validateName', () => {
    it.each([
      ['"Ana"', 'Ana'],
      ['string com 100 letras "a"', 'a'.repeat(100)],
    ])('retorna o nome válido para %s', (_label, value) => {
      expect(validateName(value)).toBe(value);
    });

    it.each([
      ['string vazia', ''],
      ['"ab"', 'ab'],
      ['apenas espaços "   "', '   '],
      ['" a "', ' a '],
      ['string com 101 letras "a"', 'a'.repeat(101)],
      ['número 123', 123],
      ['null', null],
      ['undefined', undefined],
    ])('lança HttpError 400 para %s', (_label, value) => {
      expectBadRequest(() => validateName(value));
    });
  });

  describe('validateBody', () => {
    it('retorna a mesma referência de um objeto congelado sem modificá-lo', () => {
      const body = Object.freeze({ name: 'Ana' });
      const result = validateBody(body);

      expect(result).toBe(body);
      expect(result).toEqual({ name: 'Ana' });
    });

    it('aceita campos extras e retorna a mesma referência sem alterar o objeto', () => {
      const body = { name: 'Ana', extra: true };
      const result = validateBody(body);

      expect(result).toBe(body);
      expect(result).toEqual({ name: 'Ana', extra: true });
    });

    it.each([
      ['null', null],
      ['undefined', undefined],
      ['array vazio', []],
      ['string "Ana"', 'Ana'],
      ['número 12', 12],
    ])('lança HttpError 400 para %s', (_label, value) => {
      expectBadRequest(() => validateBody(value));
    });
  });
});
