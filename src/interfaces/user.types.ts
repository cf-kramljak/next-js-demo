export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface ICurrentUser {
  id: number;
  role: UserRole;
  username: string;
}

export interface IUser {
  id: string;
  name: string | null;
  username: string;
  password: string;
}
