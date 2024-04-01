import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";
import MainLayout from "./pages/layouts/main-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
