import { EventEmitterModule as EmitterModule } from '@nestjs/event-emitter';
import { Global, Module } from '@nestjs/common';

import { EventEmitterService } from './event-emitter.service';

@Global()
@Module({
  imports: [EmitterModule.forRoot()],
  providers: [EventEmitterService],
  exports: [EventEmitterService],
})
export class EventEmitterModule {}
