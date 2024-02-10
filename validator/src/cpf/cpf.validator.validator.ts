import { cpf } from 'cpf-cnpj-validator';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function CPFValidator(validationOptions?: ValidationOptions): any {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CPFValidatorConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'cpfValidator', async: false })
export class CPFValidatorConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (typeof value !== 'string') return false;
    return value ? cpf.isValid(value) : false;
  }
}
