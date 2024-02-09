import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { MongoConfigOptions } from './database.mongo.interface';

export type MongoAsyncConfigOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<MongoConfigOptions>, 'useFactory' | 'inject'>;
