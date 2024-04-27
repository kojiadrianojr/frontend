import { toast } from "react-toastify";

export const useToast = (config?: any) => {
  const handleToast = (payload: {
    type: "warn" | "success" | "error";
    message: string;
  }) => {
    const { type, message } = payload;
    return toast[`${type}`](message);
  };

  return {
    handleToast,
  };
};
