import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import { ErrorOutput } from './error-output.interface';

export class ConflictErrorOutputDto implements ErrorOutput {
  @ApiProperty({ example: [HttpStatus.CONFLICT] })
  message: string[];

  @ApiProperty({ example: null })
  data: Record<string, any>;
}
