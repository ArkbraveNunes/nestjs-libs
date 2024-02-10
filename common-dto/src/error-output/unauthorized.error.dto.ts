import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { ErrorOutput } from './error-output.interface';

export class UnauthorizedErrorOutputDto implements ErrorOutput {
  @ApiProperty({ example: [HttpStatus[HttpStatus.UNAUTHORIZED]] })
  message: string[];

  data: Record<string, any>;
}
