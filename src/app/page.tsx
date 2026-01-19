import Posts from "@/features/posts";
import { postsApi } from "@/lib/api";
import { POSTS_QUERY_KEY } from "@/lib/constants";
import { getSessionCookie } from "@/lib/cookies";
import { getSSRQueryClient } from "@/lib/queryClient";

const Home = async () => {
  const queryClient = getSSRQueryClient();
  const sessionCookie = await getSessionCookie();

  if (sessionCookie) {
    await queryClient.prefetchQuery({
      queryKey: [POSTS_QUERY_KEY],
      queryFn: () => postsApi.getPosts(sessionCookie),
    });
  }

  return <Posts />;
};

export default Home;
