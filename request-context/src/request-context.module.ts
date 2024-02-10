import { ParametersOptions } from './request-context.type';
import { ClsModule } from 'nestjs-cls';

export class RequestContextModule {
  static setParameters({ parameters }: ParametersOptions) {
    return {
      module: RequestContextModule,
      imports: [
        ClsModule.forRoot({
          global: true,
          middleware: {
            mount: true,
            setup: (cls, req) => {
              parameters.forEach(({ name, property }) => {
                cls.set(name, req[property][name]);
              });
            },
          },
        }),
      ],
    };
  }
}
