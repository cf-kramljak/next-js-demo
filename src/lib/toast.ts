import { showToast } from "@/components/ui/Toast";

export const showSuccessToast = (title: string, description?: string) =>
  showToast("success", title, description);

export const showErrorToast = (title: string, description?: string) =>
  showToast("error", title, description);
