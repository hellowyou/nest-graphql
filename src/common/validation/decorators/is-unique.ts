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
 * Check if the given value does not exists yet in the given table.
 * If columnName is defined then it will be used as the column when checking for uniqueness.
 * Declare query constraint if you want additional conditions.
 *
 * @param {DatabaseSelectValidationOptions} opts The constaints.
 * @param {ValidationOptions} validationOptions The validation options.
 */
export function IsUnique<T>(
  opts: DatabaseSelectValidationOptions<T>,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    const columnName = opts.columnName || propertyName;

    registerDecorator({
      name: 'isUnique',
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

          return (await query.getCount()) === 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `The given ${columnName} already exists.`;
        },
      },
    });
  };
}
