import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import SendCode from "./pages/sendCode/SendCode"; 
import Product from "./pages/product/Product";
 
const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: '/send-code',           
        element: <SendCode />         
      },
    ],
  }
]);

export default routes;

