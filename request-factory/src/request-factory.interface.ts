export interface RequestFactory {
  get(
    url: string,
    headers?: Record<string, any>,
    customConfig?: Record<string, any>,
  ): Promise<Record<string, any>>;
  delete(
    url: string,
    headers?: Record<string, any>,
    customConfig?: Record<string, any>,
  ): Promise<Record<string, any>>;
  post(
    url: string,
    data: Record<string, any>,
    headers?: Record<string, any>,
    customConfig?: Record<string, any>,
  ): Promise<Record<string, any>>;
  put(
    url: string,
    data: Record<string, any>,
    headers?: Record<string, any>,
    customConfig?: Record<string, any>,
  ): Promise<Record<string, any>>;
  patch(
    url: string,
    data: Record<string, any>,
    headers?: Record<string, any>,
    customConfig?: Record<string, any>,
  ): Promise<Record<string, any>>;
}
