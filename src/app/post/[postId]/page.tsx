import SinglePost from "@/features/singlePost";
import { postsApi } from "@/lib/api";
import { POST_ROUTE, SINGLE_POST_QUERY_KEY } from "@/lib/constants";
import { getMetadataTitle } from "@/lib/metadata/metadataUtils";
import { openGraphImage } from "@/lib/metadata/openGraphImage";
import { getCachedQueryClient } from "@/lib/react-query/queryClient";
import { Metadata, ResolvingMetadata } from "next";

interface IParams {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata(
  { params }: IParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentOpengraphUrl = (await parent).openGraph?.url;
  const postId = (await params).postId;

  const post = await postsApi.getSinglePost(postId);

  return {
    title: getMetadataTitle(post?.title || ""),
    openGraph: {
      title: getMetadataTitle(post?.title || ""),
      url: `${parentOpengraphUrl}${POST_ROUTE}/${postId}`,
      ...openGraphImage,
    },
  };
}

const PostPage = async ({ params }: IParams) => {
  const paramsResolved = await params;
  const queryClient = getCachedQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [SINGLE_POST_QUERY_KEY, paramsResolved.postId],
    queryFn: () => postsApi.getSinglePost(paramsResolved.postId),
  });

  return <SinglePost postId={paramsResolved.postId} />;
};

export default PostPage;
