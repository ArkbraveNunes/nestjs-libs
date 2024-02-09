export interface EventEmitter {
  emit(key: string, payload: Record<string, any>): Promise<any>;
}
