import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import RootLayout from "./pages/RootLayout";
import ProductDetail, {
  loader as productDetailLoader,
} from "./pages/ProductDetail";
import Home, { loader as productsLoader } from "./pages/Home";
import UserOrders, { loader as customerOrdersLoader } from "./pages/UserOrders";
import Login, { action as loginAction } from "./pages/Login";
import ProductEdit, { action as editProductAction } from "./pages/ProductEdit";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import { action as logoutAction } from "./pages/Logout";
import OrderSummary from "./pages/OrderSummary";
import AdminOrders, { loader as adminOrdersLoader } from "./pages/AdminOrders";
import {
  checkTokenLoader,
  checkIsAdminLoader,
  authLoader,
} from "./utils/auth-utils";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <Error />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: productsLoader,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "order-summary",
        element: <OrderSummary />,
        loader: checkTokenLoader,
      },
      {
        path: "orders-current",
        element: <UserOrders />,
        loader: customerOrdersLoader,
      },
      {
        path: "orders-admin",
        element: <AdminOrders />,
        loader: adminOrdersLoader,
      },
      {
        path: "new-product",
        element: <NewProduct />,
        loader: checkIsAdminLoader,
        action: newProductAction,
      },
      {
        path: "products/:pid",
        loader: productDetailLoader,
        id: "product-detail",
        children: [
          { index: true, element: <ProductDetail /> },
          {
            path: "edit",
            element: <ProductEdit />,
            loader: checkIsAdminLoader,
            action: editProductAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
