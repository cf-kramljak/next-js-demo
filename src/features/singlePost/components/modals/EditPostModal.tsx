import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { IPost } from "@/interfaces";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";
import useEditPostMutation from "../../hooks/useEditPostMutation";

interface IProps {
  post: IPost;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditPostModal = ({ post, open, onOpenChange }: IProps) => {
  const [postData, setPostData] = useState({
    title: post.title,
  });

  const resetState = () => {
    setPostData({
      title: post.title,
    });
  };

  const { mutate: editPost, isPending } = useEditPostMutation(() => {
    resetState();
    onOpenChange(false);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editPost({ postId: post.id, title: postData.title });
  };

  const handleClose = () => {
    if (isPending) return;
    resetState();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-pink-500 text-xl">Edit Post</DialogTitle>
          <DialogClose>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className={cn("flex flex-col gap-6 py-4")}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="post-title">Title</Label>
            <Input
              id="post-title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              placeholder="Enter post title"
            />
          </div>

          <DialogFooter>
            <div className="flex flex-col gap-2 w-full">
              <Button
                type="submit"
                variant="green"
                className="w-full"
                disabled={!postData.title || isPending}
              >
                Update Post
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
