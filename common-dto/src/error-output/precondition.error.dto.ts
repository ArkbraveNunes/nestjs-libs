import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { ErrorOutput } from './error-output.interface';

export class PreconditionFailedErrorOutputDto implements ErrorOutput {
  @ApiProperty({ example: [HttpStatus.PRECONDITION_FAILED] })
  message: string[];

  @ApiProperty({ example: null })
  data: Record<string, any>;
}
