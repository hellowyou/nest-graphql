import {
  registerDecorator,
  Validator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { values } from 'lodash';
import { KeyValue } from '../../interfaces';

/**
 * Validates if the given value is in the given value of an object.
 *
 * @param {KeyValue} keyValues An object with key, and value, value must be a string or a number.
 * @param {validationOptions} validationOptions The validation option object.
 */
export function IsInValues(
  keyValues: KeyValue<string>,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    const validator = new Validator();
    const vals = values(keyValues);
    registerDecorator({
      name: 'isInValues',
      target: object.constructor,
      propertyName,
      constraints: [keyValues],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validator.isIn(value, vals);
        },
        defaultMessage(args: ValidationArguments) {
          return `${propertyName} is not in ${vals.join(', ')}`;
        },
      },
    });
  };
}
