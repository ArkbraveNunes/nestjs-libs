import { BadRequestException, ValidationPipe, flatten } from '@nestjs/common';
import { ValidationError } from 'class-validator';

type ErrorMessage = Record<string, any>;

function formatErrorsHelper(errors: ValidationError[]): ErrorMessage[] {
  return errors.map((item): ErrorMessage => {
    const { constraints, children } = item;
    const result: ErrorMessage[] = [];
    if (constraints) result.push(Object.values(constraints));
    if (Array.isArray(children) && children.length > 0)
      return formatErrorsHelper(children);
    return result;
  });
}

export const validationAndErrorFormatterPipe = new ValidationPipe({
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) => {
    return new BadRequestException(flatten(formatErrorsHelper(errors)));
  },
});
