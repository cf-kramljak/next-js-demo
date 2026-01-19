import SinglePost from "@/features/singlePost";
import { postsApi } from "@/lib/api";
import { SINGLE_POST_QUERY_KEY } from "@/lib/constants";
import { getSSRQueryClient } from "@/lib/queryClient";

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const paramsResolved = await params;
  const queryClient = getSSRQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [SINGLE_POST_QUERY_KEY, paramsResolved.postId],
    queryFn: () => postsApi.getSinglePost(paramsResolved.postId),
  });

  return <SinglePost postId={paramsResolved.postId} />;
};

export default PostPage;
