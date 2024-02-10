import { DynamicModule, Global, Module } from '@nestjs/common';
import { CryptographDataService } from './cryptograph-data.service';
import { CryptographDataAsyncConfigOptions } from './cryptograph-data.type';
import { CRYPTOGRAPH_DATA } from './cryptograph-data.enum';

@Global()
@Module({})
export class CryptographDataModule {
  static cryptographConfig(
    cryptographDataAsyncConfigOptions: CryptographDataAsyncConfigOptions,
  ): DynamicModule {
    return {
      module: CryptographDataModule,
      imports: [...cryptographDataAsyncConfigOptions.imports],
      providers: [
        {
          provide: CRYPTOGRAPH_DATA.CRYPTOGRAPH_DATA_CONFIG_OPTIONS,
          useFactory: cryptographDataAsyncConfigOptions.useFactory,
          inject: cryptographDataAsyncConfigOptions.inject,
        },
        CryptographDataService,
      ],
      exports: [CryptographDataService],
    };
  }
}
