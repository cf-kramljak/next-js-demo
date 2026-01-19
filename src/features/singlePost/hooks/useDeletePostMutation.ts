import { POSTS_PER_PAGE } from "@/features/posts/posts.const";
import { postsApi } from "@/lib/api";
import { POSTS_QUERY_KEY } from "@/lib/constants";
import { revalidatePosts } from "@/lib/serverActions/posts";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeletePostMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => postsApi.deletePost(postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEY, 1, POSTS_PER_PAGE],
      });
      await revalidatePosts();

      showSuccessToast("Post deleted successfully.");
      onSuccess?.();
    },
    onError: () => {
      showErrorToast("Failed to delete post. Please try again.");
    },
  });
};

export default useDeletePostMutation;
