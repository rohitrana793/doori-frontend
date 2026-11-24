import { Toaster } from "react-hot-toast";

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2000,

        style: {
          background: "#ffffff",
          color: "#212834",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "12px 16px",
          fontFamily: "Karla, sans-serif",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
        },

        success: {
          style: {
            background: "#f0fdf4",
            color: "#166534",
            border: "1px solid #bbf7d0",
          },
          iconTheme: {
            primary: "#48b033",
            secondary: "#ffffff",
          },
        },

        error: {
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
          },
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};

export default AppToaster;
