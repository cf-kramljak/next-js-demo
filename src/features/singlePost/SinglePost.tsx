"use client";

import { Button } from "@/components/ui/Button";
import { useGetSinglePostQuery } from "./hooks";
import { Trash2 } from "lucide-react";

interface IProps {
  postId: string;
}

const SinglePost = ({ postId }: IProps) => {
  const { data: post } = useGetSinglePostQuery(postId);

  if (!post) {
    return <div className="mt-20 p-10">Post not found</div>;
  }

  return (
    <div className="mt-20 p-10 flex w-full justify-between items-center">
      <h1 className="text-4xl font-semibold">{post?.title}</h1>
      <Button variant="ghost">
        <Trash2 className="text-red-500" />
      </Button>
    </div>
  );
};

export default SinglePost;
