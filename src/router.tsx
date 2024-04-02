import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";
import MainLayout from "./pages/layouts/main-layout";
import RegisterCostumer from "@/pages/register-customer";
import EditCustomer from "@/pages/edit-customer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/customer/register",
        element: <RegisterCostumer />,
      },
      {
        path: "/customer/update/:id",
        element: <EditCustomer />,
      },
    ],
  },
]);
