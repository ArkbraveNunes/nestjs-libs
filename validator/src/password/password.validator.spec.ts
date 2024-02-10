import { PasswordValidatorConstraint } from './password.validator';

describe('PasswordValidatorConstraint', () => {
  let validator: PasswordValidatorConstraint;

  beforeAll(() => {
    validator = new PasswordValidatorConstraint();
  });

  describe('validate()', () => {
    it.each([123, {}, [], true])(
      'should return false if password is not a string',
      (invalidDocument) => {
        const actualResult = validator.validate(invalidDocument);

        expect(actualResult).toBe(false);
      },
    );

    it.each([
      {
        text: 'has less than eigth characters',
        invalidPassword: 'Pass123',
      },
      {
        text: 'has less than one upper case letter',
        invalidPassword: 'pass1234',
      },
      {
        text: 'has less than one lower case letter',
        invalidPassword: 'PASS1234',
      },
      {
        text: 'has less than one number',
        invalidPassword: 'Password',
      },
    ])(
      'should return false if password is invalid because $text',
      ({ invalidPassword }) => {
        const actualResult = validator.validate(invalidPassword);

        expect(actualResult).toBe(false);
      },
    );

    it('should return true if password is valid', () => {
      const actualResult = validator.validate('Valid-pass1');

      expect(actualResult).toBe(true);
    });

    it('should return false if password value is undefined', () => {
      const actualResult = validator.validate(undefined);

      expect(actualResult).toBe(false);
    });
  });
});
