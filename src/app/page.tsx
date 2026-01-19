import Posts from "@/features/posts";
import { POSTS_PER_PAGE } from "@/features/posts/posts.const";
import { postsApi } from "@/lib/api";
import { POSTS_QUERY_KEY } from "@/lib/constants";
import { getSSRQueryClient } from "@/lib/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface IProps {
  searchParams: {
    page?: string;
  };
}

const Home = async ({ searchParams }: IProps) => {
  const queryClient = getSSRQueryClient();

  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;

  await queryClient.prefetchQuery({
    queryKey: [POSTS_QUERY_KEY, page, POSTS_PER_PAGE],
    queryFn: () => postsApi.getPosts(page, POSTS_PER_PAGE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
};

export default Home;
