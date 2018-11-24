import { Validator, ValidatorOptions } from 'class-validator';

export async function checkValidValues(object: { customProp: any }, values: any[], validatorOptions?: ValidatorOptions) {
  const validator = new Validator();
  const promises = values.map(value => {
    object.customProp = value;
    return validator
      .validate(object, validatorOptions)
      .then(errors => expect(errors.length).toEqual(0));
  });

  return Promise.all(promises);
}

export async function checkInvalidValues(object: { customProp: any }, values: any[], validatorOptions?: ValidatorOptions) {
  const validator = new Validator();
  const promises = values.map(value => {
    object.customProp = value;
    return validator
      .validate(object, validatorOptions)
      .then(errors => expect(errors.length).toEqual(1));
  });
  return Promise.all(promises);
}

export async function checkReturnedError(object: { customProp: any },
  values: any[],
  validationType: string,
  message: string,
  validatorOptions?: ValidatorOptions) {

  const validator = new Validator();
  const promises = values.map(value => {
    object.customProp = value;
    return validator
      .validate(object, validatorOptions)
      .then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].target).toEqual(object);
        expect(errors[0].property).toEqual("customProp");
        expect(errors[0].constraints).toEqual({ [validationType]: message });
        expect(errors[0].value).toEqual(value);
      });
  });
  return Promise.all(promises);
}
