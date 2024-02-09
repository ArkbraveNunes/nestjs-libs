import { HttpRequestFactoryService } from './request-factory.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { httpAxiosMethods } from './axios.enum';

describe('HttpRequestFactoryService', () => {
  let service: HttpRequestFactoryService;
  let httpService: MockProxy<HttpService>;
  const mockAxiosError = (method, retries = 0) => ({
    config: {
      url: 'http://example.com',
      headers: {
        axiosRetries: retries,
      },
      method: method,
    },
    response: {
      status: HttpStatus.REQUEST_TIMEOUT,
      data: {
        error: 'Timeout Exception',
      },
    },
  });

  beforeEach(() => {
    httpService = mock({
      axiosRef: { interceptors: { response: { use: () => null } } },
    });

    httpService.get.mockReturnValue(of([null] as any));
    httpService.post.mockReturnValue(of([null] as any));
    httpService.put.mockReturnValue(of([null] as any));
    httpService.patch.mockReturnValue(of([null] as any));
    httpService.delete.mockReturnValue(of([null] as any));

    service = new HttpRequestFactoryService(httpService);
  });

  it('should call get', async () => {
    await service.get();

    expect(httpService.get).toHaveBeenCalledTimes(1);
  });

  it('should call post', async () => {
    await service.post();

    expect(httpService.post).toHaveBeenCalledTimes(1);
  });

  it('should call put', async () => {
    await service.put();

    expect(httpService.put).toHaveBeenCalledTimes(1);
  });

  it('should call patch', async () => {
    await service.patch();

    expect(httpService.patch).toHaveBeenCalledTimes(1);
  });

  it('should call delete', async () => {
    await service.delete();

    expect(httpService.delete).toHaveBeenCalledTimes(1);
  });

  it('should call errorHandlerInterceptor - return FAILED_DEPENDENCY', async () => {
    try {
      service.errorHandlerInterceptor({
        response: { status: HttpStatus.SERVICE_UNAVAILABLE },
      });
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.FAILED_DEPENDENCY);
    }
  });

  it('should call errorHandlerInterceptor - return BAD_REQUEST', async () => {
    try {
      service.errorHandlerInterceptor({
        response: { status: HttpStatus.BAD_REQUEST },
        data: {},
      });
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should call errorHandlerInterceptor - return REQUEST_TIMEOUT', async () => {
    try {
      service.errorHandlerInterceptor({
        code: 'ECONNABORTED',
      });
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.REQUEST_TIMEOUT);
    }
  });

  it('should call errorHandlerInterceptor - return INTERNAL_SERVER_ERROR (Unknown Error)', async () => {
    try {
      service.errorHandlerInterceptor({});
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  it('should call axiosRetryInterceptor - return INTERNAL_SERVER_ERROR (Unknown Error)', async () => {
    try {
      await service.axiosRetryInterceptor({});
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  it('should call axiosRetryInterceptor - get - return BAD_REQUEST', async () => {
    httpService.get.mockReturnValue(
      of([
        () => {
          throw service.axiosRetryInterceptor(
            mockAxiosError(httpAxiosMethods.GET),
          );
        },
      ] as any),
    );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(httpAxiosMethods.GET, 1),
      );
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should call axiosRetryInterceptor - post - return BAD_REQUEST', async () => {
    httpService.get.mockReturnValue(
      of([
        () => {
          throw service.axiosRetryInterceptor(
            mockAxiosError(httpAxiosMethods.POST),
          );
        },
      ] as any),
    );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(httpAxiosMethods.POST, 1),
      );
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should call axiosRetryInterceptor - put - return BAD_REQUEST', async () => {
    httpService.get.mockReturnValue(
      of([
        () => {
          throw service.axiosRetryInterceptor(
            mockAxiosError(httpAxiosMethods.PUT),
          );
        },
      ] as any),
    );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(httpAxiosMethods.PUT, 1),
      );
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should call axiosRetryInterceptor - patch - return BAD_REQUEST', async () => {
    httpService.get.mockReturnValue(
      of([
        () => {
          throw service.axiosRetryInterceptor(
            mockAxiosError(httpAxiosMethods.PATCH),
          );
        },
      ] as any),
    );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(httpAxiosMethods.PATCH, 1),
      );
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });
  it('should call axiosRetryInterceptor - delete - return BAD_REQUEST', async () => {
    httpService.get.mockReturnValue(
      of([
        () => {
          throw service.axiosRetryInterceptor(
            mockAxiosError(httpAxiosMethods.DELETE),
          );
        },
      ] as any),
    );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(httpAxiosMethods.DELETE, 1),
      );
    } catch (actualError) {
      expect(actualError).toBeInstanceOf(HttpException);
      expect(actualError.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});
