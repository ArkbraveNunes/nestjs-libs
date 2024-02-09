import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { ErrorOutput } from './error-output.interface';

export class TooManyRequestsErrorOutputDto implements ErrorOutput {
  @ApiProperty({ example: [HttpStatus.TOO_MANY_REQUESTS] })
  message: string[];

  @ApiProperty({ example: null })
  data: Record<string, any>;
}
