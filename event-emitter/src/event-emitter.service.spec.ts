import { EventEmitter2 } from '@nestjs/event-emitter';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { EventEmitterService } from './event-emitter.service';
import { MockProxy, mock } from 'jest-mock-extended';

describe('EventEmitterService', () => {
  let service: EventEmitterService;
  let eventEmitter: MockProxy<EventEmitter2>;

  beforeEach(() => {
    eventEmitter = mock();
    eventEmitter.emit.mockReturnValue(true);

    service = new EventEmitterService(eventEmitter);
  });

  it('should call EventEmitterService - emit event', async () => {
    const key = faker.string.uuid();
    await service.emit(key, {});

    expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
    expect(eventEmitter.emit).toHaveBeenCalledWith(key, {});
  });
});
