import { postsApi } from "@/lib/api";
import { POSTS_QUERY_KEY } from "@/lib/constants";
import { showErrorToast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreatePostMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string }) =>
      postsApi.createPost(data.title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      onSuccess?.();
    },
    onError: () => {
      showErrorToast("Failed to create post");
    },
  });
};

export default useCreatePostMutation;
