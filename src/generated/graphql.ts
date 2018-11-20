export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdateUserInput {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface IMutation {
    createUser(data: CreateUserInput): User | Promise<User>;
    updateUser(data: UpdateUserInput): User | Promise<User>;
    deleteUser(id: string): User | Promise<User>;
}

export interface IQuery {
    user(id: string): User | Promise<User>;
    users(first?: number, after?: string, skip?: number): User[] | Promise<User[]>;
    temp__(): boolean | Promise<boolean>;
}

export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
}
