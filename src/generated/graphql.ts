export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateVideoInput {
  title: string;
  description: string;
  genres: string[];
}

export interface UpdateUserInput {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface UpdateVideoInput {
  id: string;
  title?: string;
  description?: string;
  genres: string[];
}

export interface Genre {
  id: string;
  title: string;
  slug: string;
  videos: Video[];
}

export interface IMutation {
  createUser(data: CreateUserInput): User | Promise<User>;
  updateUser(data: UpdateUserInput): User | Promise<User>;
  deleteUser(id: string): User | Promise<User>;
  createGenre(title: string, slug?: string): Genre | Promise<Genre>;
  updateGenre(
    id: string,
    title?: string,
    slug?: string,
  ): Genre | Promise<Genre>;
  deleteGenre(id: string): Genre | Promise<Genre>;
  createVideo(data: CreateVideoInput): Video | Promise<Video>;
  updateVideo(data: UpdateVideoInput): Video | Promise<Video>;
  deleteVideo(id: string): Video | Promise<Video>;
}

export interface IQuery {
  user(id: string): User | Promise<User>;
  users(
    first?: number,
    after?: string,
    skip?: number,
  ): User[] | Promise<User[]>;
  genre(id: string): Genre | Promise<Genre>;
  genres(
    first?: number,
    skip?: number,
    after?: string,
  ): Genre[] | Promise<Genre[]>;
  video(id: string): Video | Promise<Video>;
  videos(
    first?: number,
    skip?: number,
    after?: string,
  ): Video[] | Promise<Video[]>;
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

export interface Video {
  id: string;
  title?: string;
  description?: string;
  genres: Genre[];
  createdAt?: string;
  updatedAt?: string;
}
