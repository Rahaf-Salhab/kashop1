import React from 'react'
import Navbar from '../components/navbar/Navbar'
 import Footer from '../components/footer/Footer';
import { Outlet, useLocation } from 'react-router';
import { Box } from '@mui/material';
import CartContextProvider from '../context/CartContext';

function MainLayout() {
  const location = useLocation();

  // الصفحات التي لا يظهر فيها Navbar و Footer
  const hiddenRoutes = []; // مثال: ['/login', '/register']

  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <CartContextProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {!hideLayout && <Navbar />}

        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>

        {!hideLayout && <Footer />}
      </Box>
    </CartContextProvider>
  );
}

export default MainLayout;
