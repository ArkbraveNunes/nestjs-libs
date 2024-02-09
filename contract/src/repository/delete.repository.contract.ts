export interface DeleteRepository {
  delete(id: string): Promise<void>;
}
