import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { ErrorOutput } from './error-output.interface';

export class ConflictErrorOutputDto implements ErrorOutput {
  @ApiProperty({ example: [HttpStatus[HttpStatus.CONFLICT]] })
  message: string[];

  data: Record<string, any>;
}
