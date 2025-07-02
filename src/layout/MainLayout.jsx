import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet, useLocation } from 'react-router'
import { Container } from '@mui/material'
import CartContextProvider from '../context/CartContext'

function MainLayout() {
  {/*لاخفي navbar or footer من صفحة معينة*/}
   const location = useLocation();
   {/*تحديد بدي اخفي باي صفحة ؟ مثلا بدي اخفيهم ب checkout*/}
  const hiddenRoutes = ['/checkout'];
{/*فحص هل انا موجودة بالصفحة الي بدي احذف منها ؟*/}
{/*حيرجع false بكل الصفحات الا checkout : true*/}
 const hideLayout = hiddenRoutes.includes(location.pathname);
    console.log(hideLayout);

  return (
    <>
    <CartContextProvider>
      {/*اذا انا مش بالصفحة الي بدي احذف منها عادي بيظهر navbar */}
      {/*حيظهر navbar , footer بكل الصفحات الا checkout*/}
       {!hideLayout && <Navbar />}
      <Container>   
      <Outlet />
     </Container>
     {/*اذا انا مش بالصفحة الي بدي احذف منها عادي بيظهر footer */}
      {!hideLayout && <Footer />}

     </CartContextProvider>

    </>
   )
}
export default MainLayout