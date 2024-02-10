import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function PasswordValidator(validationOptions?: ValidationOptions): any {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordValidatorConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'passwordValidator', async: false })
export class PasswordValidatorConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean {
    if (typeof value !== 'string') return false;
    return value
      ? !!(
          value.length >= 8 &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /[0-9]/.test(value)
        )
      : false;
  }
}
