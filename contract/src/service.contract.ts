export interface Service<I, O> {
  execute(input: I): O;
}
