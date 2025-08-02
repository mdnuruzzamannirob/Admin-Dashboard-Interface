import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";

const Route = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
    children: [
      // manager dashboard routes //
      // {
      //   path: "subscription",
      //   element: (
      //     <ShopManagerRoute>
      //       <SubscriptionPayment />
      //     </ShopManagerRoute>
      //   ),
      //   loader: () => fetch("/pricing.json"),
      // },
      // {
      //   path: "manage-product/add-product",
      //   element: (
      //     <ShopManagerRoute>
      //       <AddProduct />
      //     </ShopManagerRoute>
      //   ),
      // },
    ],
  },
  //   {
  //     path: "/error/unauthorized",
  //     element: , //<UnauthorizedErrorPage />
  //   },
  //   {
  //     path: "/error/forbidden",
  //     element: <ForbiddenErrorPage />, //<ForbiddenErrorPage />
  //   },
]);

export default Route;
