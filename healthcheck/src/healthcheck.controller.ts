import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthCheckResponseDto } from './healthcheck.dto';

@Controller('/healthCheck')
@ApiTags('Health Check')
export class HealthCheckController {
  @ApiResponse({
    status: 200,
    description: 'Response Body',
    type: HealthCheckResponseDto,
  })
  @Get()
  healthCheck() {
    return { status: 'ok', version: process.env.APP_VERSION || 'localhost' };
  }
}
