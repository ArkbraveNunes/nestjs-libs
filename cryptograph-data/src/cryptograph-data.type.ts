import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { CryptographDataConfigOptions } from './cryptograph-data.interface';

export type CryptographDataAsyncConfigOptions = Pick<
  ModuleMetadata,
  'imports'
> &
  Pick<FactoryProvider<CryptographDataConfigOptions>, 'useFactory' | 'inject'>;
