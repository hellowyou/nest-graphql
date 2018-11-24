import { Validator, ValidationSchema } from 'class-validator';
import { IsInValues } from './is-in-values';
import {
  checkReturnedError,
  checkInvalidValues,
  checkValidValues,
} from '../../../../test/helpers';

describe('IsInValues decorator', () => {
  const constraints = { key3: 'key1', key4: 'key2' };
  const validValues = ['key1', 'key2'];
  const invalidValues = ['key3', 'key4'];

  class CustomClass {
    @IsInValues(constraints)
    customProp: any;
  }

  it('should not fail if validation.validator said that its valid', () => {
    return checkValidValues(new CustomClass(), validValues);
  });

  it('should fail if validation.validator said that its invalid', () => {
    return checkInvalidValues(new CustomClass(), invalidValues);
  });

  it('should not fail if validator.validate said that its valid with skipMissingProperties set to true', () => {
    return checkValidValues(new CustomClass(), validValues, {
      skipMissingProperties: true,
    });
  });

  it('should fail if validator.validate said that its invalid with skipMissingProperties set to true', () => {
    return checkInvalidValues(new CustomClass(), invalidValues, {
      skipMissingProperties: true,
    });
  });

  it('should return error object with proper data', () => {
    const validationType = 'isInValues';
    const message = 'customProp is not in key1, key2';
    return checkReturnedError(
      new CustomClass(),
      invalidValues,
      validationType,
      message,
    );
  });
});
