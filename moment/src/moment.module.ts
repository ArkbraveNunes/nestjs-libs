import { Global, Module } from '@nestjs/common';
import { MomentService } from './moment.service';

@Global()
@Module({
  providers: [MomentService],
  exports: [MomentService],
})
export class MomentModule {}
