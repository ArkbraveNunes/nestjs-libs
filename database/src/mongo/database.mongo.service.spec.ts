import { faker } from '@faker-js/faker/locale/pt_BR';
import { MockProxy, mock } from 'jest-mock-extended';

import { MongoDatabaseService } from './database.mongo.service';
import { LoggerService } from '@libs/logger';

describe('MongoDatabaseService', () => {
  let service: MongoDatabaseService;
  let loggerService: MockProxy<LoggerService>;

  beforeEach(() => {
    loggerService = mock();

    service = new MongoDatabaseService(
      {
        mongoDbHost: faker.string.uuid(),
        mongoDbName: faker.string.uuid(),
        mongoDbPassword: faker.string.uuid(),
        mongoDbPort: faker.number.int().toString(),
        mongoDbType: '',
        mongoDbUsername: faker.string.uuid(),
      },
      loggerService,
    );
  });

  it('should call getConfigs - success', async () => {
    const result = await service.getConfigs();

    expect(result.uri).toBeDefined();
  });
});
