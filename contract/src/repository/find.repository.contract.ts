export interface FindRepository<T> {
  find(): Promise<T[]>;
}
