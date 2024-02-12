import { Global, Module } from '@nestjs/common';
import { RequestContextOptions } from './request-context.type';
import { ClsModule } from 'nestjs-cls';
import { Request } from 'express';

@Global()
@Module({})
export class RequestContextModule {
  static setParameters({ parameters }: RequestContextOptions) {
    return {
      module: RequestContextModule,
      imports: [
        ClsModule.forRoot({
          global: true,
          middleware: {
            mount: true,
            setup: (cls, req: Request) => {
              parameters.forEach(({ name, type }) => {
                cls.set(name, req[type][name]);
              });
            },
          },
        }),
      ],
    };
  }
}
