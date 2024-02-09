import { axiosEnumErrors, httpAxiosMethods } from './axios.enum';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RequestFactory } from './request-factory.interface';

type AxiosRetriesHeader = {
  axiosRetries: number;
};

@Injectable()
export class HttpRequestFactoryService implements RequestFactory {
  axiosRetriesHeader: AxiosRetriesHeader = {
    axiosRetries: 3,
  };
  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.response.use(
      (response) => response.data,
      (error) => this.axiosRetryInterceptor(error),
    );
  }

  async post(
    url: string = '',
    data: Record<string, any> = {},
    headers: Record<string, any> = {},
    customConfig: Record<string, any> = {},
  ): Promise<Record<string, any>> {
    return firstValueFrom(
      this.httpService.post(url, data, {
        ...customConfig,
        headers: { ...this.axiosRetriesHeader, ...headers },
      }),
    );
  }

  async get(
    url: string = '',
    headers: Record<string, any> = {},
    customConfig: Record<string, any> = {},
  ): Promise<Record<string, any>> {
    return await firstValueFrom(
      this.httpService.get(url, {
        ...customConfig,
        headers: { ...this.axiosRetriesHeader, ...headers },
      }),
    );
  }

  async put(
    url: string = '',
    data: Record<string, any> = {},
    headers: Record<string, any> = {},
    customConfig: Record<string, any> = {},
  ): Promise<Record<string, any>> {
    return firstValueFrom(
      this.httpService.put(url, data, {
        ...customConfig,
        headers: { ...this.axiosRetriesHeader, ...headers },
      }),
    );
  }

  async patch(
    url: string = '',
    data: Record<string, any> = {},
    headers: Record<string, any> = {},
    customConfig: Record<string, any> = {},
  ): Promise<Record<string, any>> {
    return firstValueFrom(
      this.httpService.patch(url, data, {
        ...customConfig,
        headers: { ...this.axiosRetriesHeader, ...headers },
      }),
    );
  }

  async delete(
    url: string = '',
    headers: Record<string, any> = {},
    customConfig: Record<string, any> = {},
  ): Promise<Record<string, any>> {
    return firstValueFrom(
      this.httpService.delete(url, {
        ...customConfig,
        headers: { ...this.axiosRetriesHeader, ...headers },
      }),
    );
  }

  errorHandlerInterceptor(error: Record<string, any>): void {
    let errorObject, errorStatus;

    switch (true) {
      case error.response && error.response.status >= 500:
        errorObject = axiosEnumErrors.ECONNREFUSED;
        errorStatus = axiosEnumErrors.ECONNREFUSED.status;
        break;
      case error.response && error.response.status >= 400:
        errorObject = error.response.data;
        errorStatus = HttpStatus.BAD_REQUEST;
        break;
      case error.code && Object.keys(axiosEnumErrors).includes(error.code):
        errorObject = axiosEnumErrors[error.code];
        errorStatus = axiosEnumErrors[error.code].status;
        break;
      default:
        errorObject = axiosEnumErrors.ERR_NETWORK;
        errorStatus = axiosEnumErrors.ERR_NETWORK.status;
        break;
    }

    throw new HttpException(errorObject, errorStatus);
  }

  axiosRetryInterceptor(
    error: Record<string, any>,
  ): Promise<Record<string, any>> {
    const axiosRetries = error.config?.headers?.axiosRetries | 0;
    const axiosRetriesStatus = [HttpStatus.REQUEST_TIMEOUT];

    if (axiosRetries === 0) {
      this.errorHandlerInterceptor(error);
    } else if (
      error.response.status &&
      (axiosRetriesStatus.includes(error.response.status) ||
        error.response.status >= 500)
    ) {
      const headers = {
        ...error.config.headers,
        axiosRetries: axiosRetries - 1,
      };
      switch (error.config.method) {
        case httpAxiosMethods.GET:
          return this.get(error.config.url, headers);
        case httpAxiosMethods.POST:
          return this.post(error.config.url, error.config.data, headers);
        case httpAxiosMethods.PUT:
          return this.put(error.config.url, error.config.data, headers);
        case httpAxiosMethods.PATCH:
          return this.patch(error.config.url, error.config.data, headers);
        case httpAxiosMethods.DELETE:
          return this.delete(error.config.url, headers);
        default:
          this.errorHandlerInterceptor(error);
      }
    } else {
      this.errorHandlerInterceptor(error);
    }
  }
}
