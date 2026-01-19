import { IUser } from "@/interfaces";
import { request } from "./request";

export interface IRegisterResponse {
  accessToken: string;
  user: IUser;
}

export interface ILoginResponse {
  accessToken: string;
}

const register = (
  username: string,
  password: string,
  confirmPassword: string,
): Promise<IRegisterResponse> =>
  request("/auth/register", {
    method: "POST",
    body: { username, password, confirmPassword },
  });

const login = (username: string, password: string): Promise<ILoginResponse> =>
  request("/auth/login", {
    method: "POST",
    body: { username, password },
  });

export default {
  register,
  login,
};
