export type EntityProps = {
  id: string;
  createdAt: string;
};

export abstract class Entity {
  readonly id: string;
  readonly createdAt: string;

  constructor(props: EntityProps) {
    Object.assign(this, props);
  }
}
