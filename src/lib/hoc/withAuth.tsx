import { JSX } from "react";
import { getSessionCookie } from "../cookies";
import { redirect } from "next/navigation";

export function withAuth(Component: () => JSX.Element) {
  return async function AuthComponent() {
    const accessToken = await getSessionCookie();
    if (!accessToken) return redirect("/");
    return <Component />;
  };
}
