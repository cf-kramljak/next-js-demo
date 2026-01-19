import { postsApi } from "@/lib/api";
import { POSTS_QUERY_KEY } from "@/lib/constants";
import { revalidatePosts } from "@/lib/serverActions/posts";
import { showErrorToast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCreatePostMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { title: string }) =>
      postsApi.createPost(data.title),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEY],
      });
      await revalidatePosts();
      router.refresh();
      onSuccess?.();
    },
    onError: () => {
      showErrorToast("Failed to create post");
    },
  });
};

export default useCreatePostMutation;
