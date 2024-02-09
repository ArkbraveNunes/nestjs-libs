export interface SaveRepository<T> {
  save(entity: T): Promise<void>;
}
