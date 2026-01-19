"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import LoginModal from "@/features/auth/modals/LoginModal";
import { useState } from "react";
import { LogOut, Menu, User } from "lucide-react";
import { X } from "lucide-react";
import RegisterModal from "@/features/auth/modals/RegisterModal";
import useCurrentUser from "@/features/users/hooks/useCurrentUser";
import { useSignOut } from "@/features/auth/hooks";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { data: currentUser } = useCurrentUser();

  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-500">NextPress</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center space-x-4">
              {!!currentUser ? (
                <div className="flex items-center gap-4">
                  <p className="text-white w-full">
                    @{currentUser.name || "John Doe"}
                  </p>
                  <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-red-500">Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="ml-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-950"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Register
                  </Button>
                  <Button
                    className="bg-pink-500 hover:bg-pink-600"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-pink-500" />
            ) : (
              <Menu className="h-6 w-6 text-pink-500" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black z-10 container mx-auto px-4 pb-6 md:hidden">
            <div className="flex flex-col space-y-4">
              {!!currentUser ? (
                <div className="border-t border-gray-800 pt-4 mt-2">
                  {/* User info for mobile */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-gray-800 rounded-full p-2">
                      <User className="h-5 w-5 text-pink-500" />
                    </div>
                    <span className="text-white font-medium">
                      @{currentUser.name || "John Doe"}
                    </span>
                  </div>

                  {/* Logout button for mobile */}
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-500 hover:bg-green-950"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsRegisterModalOpen(true);
                    }}
                  >
                    Register
                  </Button>
                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
