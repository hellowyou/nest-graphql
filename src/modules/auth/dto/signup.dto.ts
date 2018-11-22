import { IsIn } from 'class-validator';
import { values } from 'lodash';

import { CreateUserDto } from '../../../modules/user/dto';
import { AuthStrategy } from '../../../generated/graphql';

export class SignupDto extends CreateUserDto {
  // TODO: make a validation decorator IsInValues, to omit calling values for an object.
  @IsIn(values(AuthStrategy))
  strategy;
}
