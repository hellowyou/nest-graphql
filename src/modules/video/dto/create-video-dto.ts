import { CreateVideoInput } from '../../../generated/graphql';
import { MinLength, IsEmail, ValidateNested } from 'class-validator';

export class CreateVideoDto implements CreateVideoInput {
  @MinLength(2)
  title;
  @MinLength(2)
  description;
  genres;
}
