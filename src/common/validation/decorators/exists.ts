import {
  registerDecorator,
  Validator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { getConnection } from 'typeorm';
import { isFunction } from 'lodash';
import { DatabaseSelectValidationOptions } from '../../interfaces';

/**
 * Validates the given propertyName's value if it exists in the database.
 *
 * @param {KeyValue} keyValues An object with key, and value, value must be a string or a number.
 * @param {validationOptions} validationOptions The validation option object.
 */
export function Exists<T>(
  opts: DatabaseSelectValidationOptions<T>,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    const columnName = opts.columnName || propertyName;

    registerDecorator({
      name: 'exists',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const connection = getConnection();
          const repo = connection.getRepository(opts.entity);
          const query = repo
            .createQueryBuilder()
            .select()
            .where(`${columnName} = :check`, { check: value });
          if (opts.query && isFunction(opts.query)) {
            opts.query(query, args as any);
          }

          return (await query.getCount()) > 0;
        },
        defaultMessage(args: ValidationArguments) {
          return 'The given $property does not exists.';
        },
      },
    });
  };
}
