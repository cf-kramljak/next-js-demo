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
import { LogIn, X } from "lucide-react";
import { useState } from "react";
import { useLoginMutation } from "../hooks";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: IProps) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const resetState = () => {
    setLoginData({
      username: "",
      password: "",
    });
  };

  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation(
    () => {
      resetState();
      onClose();
    },
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(loginData);
  };

  const handleClose = () => {
    if (isLoginPending) return;
    resetState();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-pink-500 text-xl">Login</DialogTitle>
          <DialogClose>
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    username: e.target.value,
                  })
                }
                placeholder="Enter your username"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                placeholder="Enter your password"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600"
              disabled={
                !loginData.username || !loginData.password || isLoginPending
              }
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isLoginPending ? "Logging in..." : "Login"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
