"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { useGetPostsQuery } from "../hooks";
import { POSTS_PER_PAGE } from "../posts.const";
import { usePagination } from "@/lib/hooks";
import Pagination from "@/components/ui/Pagination";

const PostsList = () => {
  const { page, handlePageChange } = usePagination();
  const { data } = useGetPostsQuery(page, POSTS_PER_PAGE);

  const totalPages = Math.ceil((data?.total ?? 0) / POSTS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.posts?.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer overflow-hidden border-gray-800 bg-gray-900 transition-all hover:border-pink-500/50 hover:shadow-md hover:shadow-pink-500/20"
          >
            <CardContent className="p-4 gap-4 flex flex-col">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p>Author: @{post.author.username}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PostsList;
