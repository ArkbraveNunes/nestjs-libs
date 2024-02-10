import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { ErrorOutput } from './error-output.interface';

export class InternalServerErrorOutputDto implements ErrorOutput {
  @ApiProperty({ example: [HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]] })
  message: string[];

  data: Record<string, any>;
}
