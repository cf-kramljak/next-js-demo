import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { UserPlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRegisterMutation } from "../hooks";
import { Label } from "@/components/ui/Label";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: IProps) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isShaking, setIsShaking] = useState(false);
  const [error, setError] = useState("");

  const resetState = () => {
    setRegisterData({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const { mutateAsync: register, isPending: isRegisterPending } =
    useRegisterMutation(() => {
      resetState();
      onClose();
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords don't match");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    await register(registerData);
  };

  const handleClose = () => {
    if (isRegisterPending) return;
    resetState();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-pink-500 text-xl">
            Create Account
          </DialogTitle>
          <DialogClose>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className={cn(
            "flex flex-col gap-6 py-4",
            isShaking && "animate-shake",
          )}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-username">Username</Label>
              <Input
                id="register-username"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                placeholder="Choose a username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                placeholder="Choose a password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex flex-col gap-2 w-full">
              <Button
                type="submit"
                variant="green"
                className="w-full"
                disabled={
                  !registerData.username ||
                  !registerData.password ||
                  !registerData.confirmPassword ||
                  isRegisterPending
                }
              >
                <UserPlus className="mr-2 h-4 w-4 text-black" />
                Create Account
              </Button>

              {error && <p className="text-red-500 text-sm mx-auto">{error}</p>}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
