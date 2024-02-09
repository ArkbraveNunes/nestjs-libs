import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  ValidationError,
  flatten,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeadersValidator<T> implements NestMiddleware {
  private dtoType: new () => T;

  constructor(dtoType: new () => T) {
    this.dtoType = dtoType;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance<T, object>(this.dtoType, req.headers, {
      excludeExtraneousValues: true,
    });
    const errors: ValidationError[] = await validate(dto as object);
    if (errors.length > 0) {
      const validationErrors = errors.map((obj) =>
        Object.values(obj.constraints),
      );
      throw new BadRequestException(flatten(validationErrors));
    }
    next();
  }
}
