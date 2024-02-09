import { Injectable } from '@nestjs/common';
import { EventEmitter } from './event-emitter.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventEmitterService implements EventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emit(key: string, payload: Record<string, any>): Promise<any> {
    return this.eventEmitter.emit(key, payload);
  }
}
