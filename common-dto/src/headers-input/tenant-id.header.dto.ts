import { ApiHeaderOptions } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class TenantIdHeaderInputDto {
  @IsDefined({ message: 'TenantId is required' })
  @Expose({ name: 'tenantId' })
  tenantId: string;
}

export const tenantIdHeaderOptions: ApiHeaderOptions[] = [
  {
    name: 'tenantId',
    required: true,
  },
];
