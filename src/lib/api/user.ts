import { ICurrentUser } from "@/interfaces";
import { request } from "./request";

const getCurrentUser = async (sessionCookie?: string) => {
  console.log("getCurrentUser");
  return request<ICurrentUser>(
    "/user/me",
    sessionCookie
      ? { headers: { Authorization: `Bearer ${sessionCookie}` } }
      : {},
  );
};

export default { getCurrentUser };
