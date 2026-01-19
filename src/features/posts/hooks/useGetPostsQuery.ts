import { postsApi } from "@/lib/api";
import { POSTS_QUERY_KEY } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const useGetPostsQuery = () => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY],
    queryFn: () => postsApi.getPosts(),
  });
};

export default useGetPostsQuery;
