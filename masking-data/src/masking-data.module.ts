import { Global, Module } from '@nestjs/common';
import { MaskingDataService } from './masking-data.service';

@Global()
@Module({
  providers: [MaskingDataService],
  exports: [MaskingDataService],
})
export class MaskingDataModule {}
