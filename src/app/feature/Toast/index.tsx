import { ReactNode } from "react";
import { toast } from "react-toastify";

export const useToast = () => {
  const handleToast = (payload: {
    type: "warn" | "success" | "error";
    message: string | ReactNode;
  }) => {
    const { type, message } = payload;
    return toast[`${type}`](message);
  };

  return {
    handleToast,
  };
};
