import { CreateUserInput } from '../../../generated/graphql';
import { MinLength, IsEmail, ValidateNested } from 'class-validator';

export class CreateUserDto implements CreateUserInput {
  @MinLength(2)
  firstName;
  @MinLength(2)
  lastName;
  @MinLength(6)
  password;
  @IsEmail()
  email;
}
// Does not work still
export class CreateUserDataDto {
  @ValidateNested()
  data: CreateUserDto;
}
