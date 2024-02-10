import { ApiHeaderOptions } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class TenantHeaderInputDto {
  @IsDefined({ message: 'Tenant is required' })
  @Expose({ name: 'tenant' })
  tenantId: string;
}

export const tenantHeaderOptions: ApiHeaderOptions[] = [
  {
    name: 'tenant',
    required: true,
  },
];
