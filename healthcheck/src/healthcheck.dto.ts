import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty({ example: 'Ok' })
  status: string;

  @ApiProperty({ example: 'localhost' })
  version: string;
}
