"use client";

import * as React from "react";
import { Slide, ToastContainer, toast as toastify } from "react-toastify";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, X } from "lucide-react";

type ToastVariant = "success" | "error";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: ToastVariant;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-green-800 text-white",
  error: "bg-red-900 text-white",
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="h-6 w-6" />,
  error: <AlertCircle className="h-6 w-6" />,
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "success", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center rounded-lg shadow-lg",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  ),
);
Toast.displayName = "Toast";

const ToastIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center", className)}
    {...props}
  />
));
ToastIcon.displayName = "ToastIcon";

const ToastContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 py-4 font-medium text-base", className)}
    {...props}
  />
));
ToastContent.displayName = "ToastContent";

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus:outline-none",
      className,
    )}
    {...props}
  />
));
ToastClose.displayName = "ToastClose";

const ToastContainerSetup = () => (
  <ToastContainer
    position="bottom-center"
    closeButton={false}
    autoClose={2500}
    transition={Slide}
    hideProgressBar={true}
    toastClassName={() => "p-0 w-[80%] md:w-[600px]"}
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);

export function showToast(
  variant: ToastVariant,
  title: string,
  description?: string,
) {
  return toastify(({ closeToast }) => (
    <Toast
      variant={variant}
      className={cn("w-full", !description && "items-center justify-center")}
    >
      <ToastIcon className="px-4">{variantIcons[variant]}</ToastIcon>
      <ToastContent className={cn(description && "flex-1")}>
        <p className="font-bold text-label-base tracking-[-0.02em]">{title}</p>
        {description && <p>{description}</p>}
      </ToastContent>
      <ToastClose onClick={closeToast} className="mr-4">
        <X className="h-5 w-5" />
      </ToastClose>
    </Toast>
  ));
}

export { Toast, ToastIcon, ToastContent, ToastContainerSetup };
