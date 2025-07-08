import { createBrowserRouter } from "react-router-dom";

// layout
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";

// pages
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
import UnAuthorized from "./unAuthorized/UnAuthorized";
import CategoryProducts from "./components/category/CategoryProducts";
import ProductReview from "./pages/productReview/ProductReview";
import SeeReviews from "./pages/SeeReviews/SeeReviews"; 

// protected routes
import ProtectedRouter from "./components/protectedRouter/ProtectedRouter";
import DashboardProtectedRouter from "./components/protectedRouter/DashboardProtectedRouter";

// admin pages
import Index from "./pages/admin/category/Index";

// profile pages
import Profile from "./pages/profile/Profile";
import Info from "./pages/profile/Info";
import ChangePassword from "./pages/profile/ChangePassword";
import Orders from "./pages/profile/Orders";
import OrderDetails from "./pages/profile/OrderDetails";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/checkout',
        element: (
          <ProtectedRouter>
            <CheckOut />
          </ProtectedRouter>
        )
      },
      {
        path: '/product/:id',
        element: <Product />,
        viewTransition: true
      },
      {
        path: '/product/:id/rate', // ✅ صفحة كتابة تقييم
        element: (
          <ProtectedRouter>
            <ProductReview />
          </ProtectedRouter>
        )
      },
      {
        path: '/product/:id/reviews', // ✅ صفحة عرض التقييمات
        element: <SeeReviews />
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
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        )
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
      },
      {
        path: '/category/:id/products',
        element: <CategoryProducts />
      },
      {
        path: '/profile',
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
        children: [
          {
            path: 'info',
            element: <Info />
          },
          {
            path: 'change-password',
            element: <ChangePassword />
          },
          {
            path: 'orders',
            element: <Orders />
          },
          {
            path: 'orders/:id',
            element: <OrderDetails />
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <DashboardProtectedRouter>
        <DashboardLayout />
      </DashboardProtectedRouter>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />
      },
      {
        path: 'category/index',
        element: <Index />
      }
    ]
  }
]);

export default routes;
