import { useState } from "react";
import { useCreatePostMutation } from "../../hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, X } from "lucide-react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: IProps) => {
  const [postData, setPostData] = useState({
    title: "",
  });

  const resetState = () => {
    setPostData({
      title: "",
    });
  };

  const { mutate: createPost, isPending: isCreatePostPending } =
    useCreatePostMutation(() => {
      resetState();
      onClose();
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost({ title: postData.title });
  };

  const handleClose = () => {
    if (isCreatePostPending) return;
    resetState();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-pink-500 text-xl">
            Create Post
          </DialogTitle>
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
                disabled={!postData.title || isCreatePostPending}
              >
                <Plus className="mr-2 h-4 w-4 text-black" />
                Create Post
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
