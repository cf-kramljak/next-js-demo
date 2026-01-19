"use client";

import { Button } from "@/components/ui/Button";
import { useGetSinglePostQuery } from "./hooks";
import { Trash2 } from "lucide-react";
import { useCurrentUser } from "../users/hooks";
import { useState } from "react";
import ConfirmDeletePostModal from "./components/modals/ConfirmDeletePostModal";

interface IProps {
  postId: string;
}

const SinglePost = ({ postId }: IProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: post } = useGetSinglePostQuery(postId);
  const { data: currentUser } = useCurrentUser();

  if (!post) {
    return <div className="mt-20 p-10">Post not found</div>;
  }

  return (
    <>
      <div className="mt-20 p-10 flex w-full justify-between items-center">
        <h1 className="text-4xl font-semibold">{post?.title}</h1>
        {currentUser && currentUser.id === post.author.id && (
          <Button variant="ghost" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 className="text-red-500" />
          </Button>
        )}
      </div>

      <ConfirmDeletePostModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        postId={postId}
      />
    </>
  );
};

export default SinglePost;
