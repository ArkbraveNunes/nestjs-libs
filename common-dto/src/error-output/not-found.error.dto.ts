import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { ErrorOutput } from './error-output.interface';

export class NotFoundErrorOutputDto implements ErrorOutput {
  @ApiProperty({ example: [HttpStatus.NOT_FOUND] })
  message: string[];

  @ApiProperty({ example: null })
  data: Record<string, any>;
}
