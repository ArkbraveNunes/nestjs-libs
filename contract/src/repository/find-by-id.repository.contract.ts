export interface FindByIdRepository<T> {
  findById(id: string): Promise<T>;
}
