import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import AppRoute from "./routes/AppRoute.jsx";
import AppToaster from "./components/commom/AppToaster.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppToaster />
    <AppRoute />
  </StrictMode>,
);
