import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
