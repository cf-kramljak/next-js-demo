import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/features/auth/auth.const";

export const getSessionCookie = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  return sessionCookie?.value;
};
