import toast from "react-hot-toast";

export const showToast = ({ response, error }) => {
  if (response) {
    toast.success(response);
    return;
  }

  if (!error) {
    toast.error("Something went wrong.");
    return;
  }

  // Server responded with an HTTP error
  if (error.response) {
    const status = error.response.status;

    if (status === 500) {
      toast.error("Server error. Please try again later.");
      return;
    }

    if (error.response.data?.errors) {
      const errors = error.response.data.errors;

      const firstKey = Object.keys(errors)[0];
      const firstError = errors[firstKey];

      const message = Array.isArray(firstError) ? firstError[0] : firstError;

      toast.error(message);
      return;
    }

    toast.error(
      error.response.data?.message || "Something went wrong. Please try again.",
    );

    return;
  }

  // Network error / timeout
  if (error.request) {
    toast.error(
      "Unable to connect to the server. Please check your connection.",
    );
    return;
  }

  // Unknown error
  toast.error(error.message || "Something went wrong. Please try again.");
};
