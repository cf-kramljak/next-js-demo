"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { useGetPostsQuery } from "../hooks";

const PostsList = () => {
  const { data: posts } = useGetPostsQuery();

  return (
    <div className="flex gap-4">
      {posts?.map((post) => (
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
  );
};

export default PostsList;
