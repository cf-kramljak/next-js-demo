import { authApi } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SESSION_COOKIE_NAME } from "../auth.const";
import { setCookie } from "cookies-next";
import { ILoginResponse } from "@/lib/api/auth";
import { showErrorToast } from "@/lib/toast";
import { CURRENT_USER_QUERY_KEY } from "@/lib/constants";

const useLoginMutation = (onSuccess?: () => void, onError?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      authApi.login(data.username, data.password),
    onSuccess: async (data: ILoginResponse) => {
      setCookie(SESSION_COOKIE_NAME, data.accessToken, {
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
      });
      await queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY],
      });
      onSuccess?.();
    },
    onError: () => {
      showErrorToast("Login Failed");
      onError?.();
    },
  });
};

export default useLoginMutation;
