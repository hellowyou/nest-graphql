export class CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UpdateUserInput {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export abstract class IMutation {
  abstract createUser(data: CreateUserInput): User | Promise<User>;

  abstract updateUser(data: UpdateUserInput): User | Promise<User>;

  abstract deleteUser(id: string): User | Promise<User>;
}

export abstract class IQuery {
  abstract user(id: string): User | Promise<User>;

  abstract users(
    first?: number,
    after?: string,
    skip?: number,
  ): User[] | Promise<User[]>;

  abstract temp__(): boolean | Promise<boolean>;
}

export class User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}
