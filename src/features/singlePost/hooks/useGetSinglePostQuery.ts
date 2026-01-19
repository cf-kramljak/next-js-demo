import { postsApi } from "@/lib/api";
import { SINGLE_POST_QUERY_KEY } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const useGetSinglePostQuery = (postId: string) => {
  return useQuery({
    queryKey: [SINGLE_POST_QUERY_KEY, postId],
    queryFn: async () => postsApi.getSinglePost(postId),
  });
};

export default useGetSinglePostQuery;
