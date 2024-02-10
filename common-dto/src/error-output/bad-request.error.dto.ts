import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { ErrorOutput } from './error-output.interface';

export class BadRequestErrorOutputDto implements ErrorOutput {
  @ApiProperty({ example: [HttpStatus[HttpStatus.BAD_REQUEST]] })
  message: string[];

  data: Record<string, any>;
}
