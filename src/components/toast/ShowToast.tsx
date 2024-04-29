import { toast, ToastContainer } from "react-toastify";
export const showToast = (
  message: string,
  type: "error" | "success" | "info"
) => {
  if (type == "success") {
    toast.success(message, {
      closeButton: true,
      style: { backgroundColor: "#00737F", color: "#fff" },
    });
  } else if (type == "info") {
    toast.info(message, {
      closeButton: true,
    });
  } else {
    toast.error(message, {
      closeButton: true,
      style: { backgroundColor: "#00737F", color: "#fff" },
    });
  }
};
