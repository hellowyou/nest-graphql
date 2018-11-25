import { SelectQueryBuilder, ObjectType } from 'typeorm';
import { ValidationArguments } from 'class-validator';

export interface KeyValue<V = string> {
  [key: string | number]: V;
}

export type Omit<T, O> = Pick<T, Exclude<keyof T, O>>;

export interface WithEntityTypeValidationArguments<T>
  extends ValidationArguments {
  object: T;
}

export interface DatabaseSelectValidationOptions<T> {
  entity: ObjectType<T>;
  columnName?: string;
  query?: (
    builder: SelectQueryBuilder<T>,
    args: WithEntityTypeValidationArguments<T>,
  ) => void;
}
