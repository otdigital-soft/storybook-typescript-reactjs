import { CreateUpdateProject } from 'api/schema';

type EmptyValue<T> = {
  [P in keyof T]: T[P] | '';
};

export type FormValues = EmptyValue<CreateUpdateProject>;
