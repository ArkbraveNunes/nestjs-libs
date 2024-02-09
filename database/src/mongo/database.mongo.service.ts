import { Inject, Injectable } from '@nestjs/common';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { MongoConfigOptions } from './database.mongo.interface';
import { LoggerService } from '@libs/logger';
import { MONGO_DATABASE } from './database.mongo.enum';

@Injectable()
export class MongoDatabaseService {
  constructor(
    @Inject(MONGO_DATABASE.MONGO_CONFIG_OPTIONS)
    private readonly mongoConfigOptions: MongoConfigOptions,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(MongoDatabaseService.name);
  }

  async getConfigs(): Promise<MongooseModuleFactoryOptions> {
    const {
      mongoDbHost,
      mongoDbName,
      mongoDbPassword,
      mongoDbPort,
      mongoDbType,
      mongoDbUsername,
    } = this.mongoConfigOptions;

    const mongoDbUri = `mongodb${mongoDbType}://${mongoDbUsername}:${mongoDbPassword}@${mongoDbHost}:${mongoDbPort}/${mongoDbName}?authSource=admin`;
    await this.loggerService.debug(`Mongo Uri -> ${mongoDbUri}`);

    return {
      uri: mongoDbUri,
    };
  }
}
