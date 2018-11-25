import { MinLength, IsEmail, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

import { IsUnique } from '../../../common';
import { CreateUserInput } from '../../../generated/graphql';

import { UserEntity } from '../entities';

export class CreateUserDto implements CreateUserInput {
  @MinLength(2)
  firstName;
  @MinLength(2)
  lastName;
  @MinLength(6)
  password;
  @IsEmail()
  @IsUnique({ entity: UserEntity })
  email;
}

export class CreateUserDataDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  data: CreateUserDto;
}
