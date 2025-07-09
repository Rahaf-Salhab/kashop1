import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/category/Category";
import Products from "../../components/products/Products";
import Pictures from "../../components/pictures/Pictures";
import SubscribeForm from "../../components/subscribeForm/SubscribeForm";
 import { Box } from "@mui/material";

function Home() {
  return (
    <>
      <Box sx={{ '& > *': { mb: { xs: 3, sm: 5 } } }}>
        <HeroSection />
        <Category />
        <Products />
        <Pictures />
        <SubscribeForm />
      </Box>
     </>
  );
}

export default Home;
