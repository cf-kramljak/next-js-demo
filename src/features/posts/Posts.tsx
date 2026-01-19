"use client";

import { Button } from "@/components/ui/Button";
import PostsList from "./components/PostsList";
import CreatePostModal from "./components/modals/CreatePostModal";
import { useState } from "react";
import { Plus } from "lucide-react";

const Posts = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-10 mt-20 p-10">
        <Button
          className="w-fit gap-2"
          onClick={() => setIsCreatePostModalOpen(true)}
        >
          <Plus /> Create Post
        </Button>
        <PostsList />
      </div>

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
      />
    </>
  );
};

export default Posts;
