import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { SESSION_COOKIE_NAME } from "../auth.const";
import { CURRENT_USER_QUERY_KEY } from "@/lib/constants";

const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signOut = useCallback(async () => {
    deleteCookie(SESSION_COOKIE_NAME);
    queryClient.setQueryData([CURRENT_USER_QUERY_KEY], null);
    router.refresh();
  }, []);

  return signOut;
};

export default useSignOut;
