import { DynamicModule, Global, Module, ModuleMetadata } from '@nestjs/common';
import { HttpRequestFactoryService } from './request-factory.service';

export interface HttpRequestFactoryModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  provideName: string;
}
@Global()
@Module({})
export class HttpRequestFactoryModule {
  public static forRoot(
    httpRequestFactoryModuleAsyncOptions: HttpRequestFactoryModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: HttpRequestFactoryModule,
      imports: httpRequestFactoryModuleAsyncOptions.imports,
      providers: [
        {
          provide: httpRequestFactoryModuleAsyncOptions.provideName,
          useClass: HttpRequestFactoryService,
        },
      ],
      exports: [
        {
          provide: httpRequestFactoryModuleAsyncOptions.provideName,
          useClass: HttpRequestFactoryService,
        },
      ],
    };
  }
}
