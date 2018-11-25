import {
  MinLength,
  IsOptional,
  IsEmail,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsUnique, Exists } from '../../../common';
import { UpdateUserInput } from '../../../generated/graphql';

import { CreateUserDto } from './create-user-dto';
import { UserEntity } from '../entities';

export class UpdateUserDto extends CreateUserDto implements UpdateUserInput {
  @Exists({ entity: UserEntity })
  id;
  @IsOptional()
  password;
  @IsOptional()
  firstName;
  @IsOptional()
  lastName;
  @IsOptional()
  @IsUnique({
    entity: UserEntity,
    query: (q, { object: { id } }) => q.andWhere('id != :id', { id }),
  })
  email;
}

export class UpdateUserDataDto {
  @ValidateNested()
  @Type(() => UpdateUserDto)
  data: UpdateUserDto;
}
