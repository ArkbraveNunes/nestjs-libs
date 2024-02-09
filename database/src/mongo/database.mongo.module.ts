import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoDatabaseService } from './database.mongo.service';
import { MongoAsyncConfigOptions } from './database.mongo.type';
import { LoggerModule } from '@libs/logger';
import { MONGO_DATABASE } from './database.mongo.enum';

@Global()
@Module({})
export class MongoDatabaseModule {
  static mongoDBConfig(configOptions: MongoAsyncConfigOptions): DynamicModule {
    return {
      module: MongoDatabaseModule,
      imports: [...configOptions.imports, LoggerModule],
      providers: [
        {
          provide: MONGO_DATABASE.MONGO_CONFIG_OPTIONS,
          useFactory: configOptions.useFactory,
          inject: configOptions.inject,
        },
        MongoDatabaseService,
      ],
      exports: [MongoDatabaseService],
    };
  }

  static mongoDBInit(): DynamicModule {
    return {
      module: MongoDatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          inject: [MongoDatabaseService],
          useFactory: (mongoDatabaseService: MongoDatabaseService) =>
            mongoDatabaseService.getConfigs(),
        }),
      ],
    };
  }
}
