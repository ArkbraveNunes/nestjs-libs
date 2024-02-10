import { cpf } from 'cpf-cnpj-validator';

import { CPFValidatorConstraint } from './cpf.validator.validator';

describe('CPFValidatorConstraint', () => {
  let validator: CPFValidatorConstraint;

  beforeAll(() => {
    validator = new CPFValidatorConstraint();
  });

  describe('validate()', () => {
    it.each([123, {}, [], true])(
      'should return false if CPF is not a string',
      (invalidCPF) => {
        const actualResult = validator.validate(invalidCPF);

        expect(actualResult).toBe(false);
      },
    );

    it('should return false if CPF is invalid', () => {
      const actualResult = validator.validate('invalid-CPF');

      expect(actualResult).toBe(false);
    });

    it('should return true if CPF is valid', () => {
      const actualResult = validator.validate(cpf.generate(false));

      expect(actualResult).toBe(true);
    });

    it('should call cpf with correct value', () => {
      const isValidSpy = jest.spyOn(cpf, 'isValid');
      const expectedValue = 'any-CPF';

      validator.validate(expectedValue);

      expect(isValidSpy).toHaveBeenCalledTimes(1);
      expect(isValidSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should return false if CPF value is undefined', () => {
      const actualResult = validator.validate(undefined);

      expect(actualResult).toBe(false);
    });
  });
});
