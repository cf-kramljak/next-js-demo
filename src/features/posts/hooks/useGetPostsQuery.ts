import { postsApi } from "@/lib/api";
import { POSTS_QUERY_KEY } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const useGetPostsQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY, page, limit],
    queryFn: () => postsApi.getPosts(page, limit),
  });
};

export default useGetPostsQuery;
