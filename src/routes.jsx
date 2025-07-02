 import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import AdminHome from "./pages/admin/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import SendCode from "./pages/sendCode/SendCode"; 
import Product from "./pages/product/Product";
import CheckOut from "./pages/checkout/CheckOut";
import ProtectedRouter from "./components/protectedRouter/ProtectedRouter";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import Index from "./pages/admin/category/Index";
import DashboardProtectedRouter from "./components/protectedRouter/DashboardProtectedRouter";
import UnAuthorized from "./unAuthorized/UnAuthorized";
 
const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <Home />
      },
      {
         path: '/checkout',
         element: 
          <ProtectedRouter>
             <CheckOut />
         </ProtectedRouter>
       },
      {
        path: '/product/:id',
        element: <Product />,
        viewTransition: true
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
        element: 
          <ProtectedRouter>
             <Cart />
           </ProtectedRouter>
       },
      {
        path: '/forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: '/send-code',           
        element: <SendCode />         
      },
      {
        path: '/unAuthorized',
        element: <UnAuthorized />
      }
    ],
  },
  {
    path:'/admin',
    element :
         <DashboardProtectedRouter>
           <DashboardLayout />,
       </DashboardProtectedRouter>,
     children:[
      {
        index:true,
        element: <AdminHome />
      },
      {
        path:'category/index',
        element: <Index />
      }
    ],
  }
]);

export default routes;

