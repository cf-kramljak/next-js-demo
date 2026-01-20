import { IPost } from "@/interfaces";
import { postsApi } from "@/lib/api";
import { POSTS_QUERY_KEY, SINGLE_POST_QUERY_KEY } from "@/lib/constants";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditPostMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, title }: { postId: number; title: string }) =>
      postsApi.updatePost(postId, title),
    onSuccess: async (data: IPost) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [SINGLE_POST_QUERY_KEY, data.id.toString()],
        }),
        queryClient.invalidateQueries({
          queryKey: [POSTS_QUERY_KEY],
        }),
      ]);

      showSuccessToast("Post updated successfully.");
      onSuccess?.();
    },
    onError: () => {
      showErrorToast("Failed to update post. Please try again.");
    },
  });
};

export default useEditPostMutation;
