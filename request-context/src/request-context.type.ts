import { TYPE_PARAMETER } from './request-context.enum';

type Parameter = {
  name: string;
  type: TYPE_PARAMETER;
};

export type RequestContextOptions = {
  parameters: Parameter[];
};
