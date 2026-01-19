import { authApi } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SESSION_COOKIE_NAME } from "../auth.const";
import { setCookie } from "cookies-next";
import { IRegisterResponse } from "@/lib/api/auth";
import { showErrorToast } from "@/lib/toast";
import { CURRENT_USER_QUERY_KEY } from "@/lib/constants";

const useRegisterMutation = (onSuccess?: () => void, onError?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      username: string;
      password: string;
      confirmPassword: string;
    }) => authApi.register(data.username, data.password, data.confirmPassword),
    onSuccess: async (data: IRegisterResponse) => {
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
      showErrorToast("Registration Failed");
      onError?.();
    },
  });
};

export default useRegisterMutation;
