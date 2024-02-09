import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigOptions } from './config.type';

@Global()
@Module({})
export class AppConfigModule {
  static injectConfig({ config }: ConfigOptions): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          load: [...config],
          isGlobal: true,
        }),
      ],
    };
  }
}
