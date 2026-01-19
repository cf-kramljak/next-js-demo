import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useDeletePostMutation } from "../../hooks";

interface ConfirmDeletePostModalProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDeleting?: boolean;
}

const ConfirmDeletePostModal = ({
  postId,
  open,
  onOpenChange,
}: ConfirmDeletePostModalProps) => {
  const router = useRouter();

  const { mutate: deletePost, isPending } = useDeletePostMutation(() => {
    onOpenChange(false);
    router.push("/");
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deletePost(postId)}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeletePostModal;
