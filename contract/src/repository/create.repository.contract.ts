export interface CreateRepository<T> {
  create(entity: T): Promise<void>;
}
