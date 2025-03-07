export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface CreateUser extends Pick<User, 'name' | 'email'> {
  password: string;
}

export type UpdateUser = Partial<Omit<UserWithPassword, 'id'>>;
