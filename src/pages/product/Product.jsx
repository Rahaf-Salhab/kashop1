import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {Box,Button,Card,Divider,Typography,useTheme,} from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '../../components/shared/Loader';
import { CartContext } from '../../context/CartContext';
import axiosAuth from '../../api/axiosAuthInstance';
import pic3 from '../../assets/images/pic3.png';

const fetchProduct = async (id) => {
  const { data } = await axiosAuth.get(`products/${id}`);
  return data;
};

const addToCartAPI = async (id) => {
  const { data } = await axiosAuth.post(`Carts/${id}`);
  return data;
};

function Product() {
  const theme = useTheme();
  const { cartItems, setCartItems, cartItemsList } = useContext(CartContext);
  const { id } = useParams();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });

  const mutation = useMutation({
    mutationFn: (id) => addToCartAPI(id),
    onSuccess: (_, addedProductId) => {
      const alreadyInCart = cartItemsList.some(item => item.id === addedProductId);
      if (!alreadyInCart) {
        setCartItems(prev => prev + 1);
      }
      toast.success("Product added to cart successfully!");
    },
    onError: () => {
      toast.error("Failed to add product to cart.");
    },
  });

  const handleAddToCart = () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      toast.warning("You must be logged in.");
      return;
    }
    mutation.mutate(product.id);
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Failed to load product.</div>;

   const buttonColor = theme.palette.mode === 'light' ? '#55cbd2' : '#044a4f';
  const buttonHover = theme.palette.mode === 'light' ? '#35b6bc' : '#033a3e';
  const bgColor = theme.palette.mode === 'light' ? '#f9f9f9' : theme.palette.background.default;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        bgcolor: bgColor,
        mt: { xs: 0, md: 8 },
        fontFamily: 'monospace',
      }}
    >
      {/*   صورة المنتج */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '45%',
          backgroundImage: `url(${pic3})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          mx: 2,
          mt: -5,
          mb: 2,
        }}
      />

      {/*   تفاصيل المنتج */}
      <Box
        sx={{
          width: { xs: '100%', md: '55%' },
          display: 'flex',
          alignItems: 'flex-start', 
          justifyContent: 'center',
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 4, md: 6 },
          mt: { xs: 2, md: 4 }, 
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 500,
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            boxShadow: theme.shadows[6],
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
          elevation={8}
        >
          <Typography
            variant="h4"
            fontWeight="700"
            textAlign="center"
            gutterBottom
          >
            {product?.name}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ color: buttonColor }}
          >
            ${product?.price?.toFixed(2)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              fontSize: '1.05rem',
              textAlign: 'center',
            }}
          >
            {product?.description}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleAddToCart}
            disabled={mutation.isLoading}
            sx={{
              mt: 4,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              fontFamily: 'monospace',
              bgcolor: buttonColor,
              '&:hover': {
                bgcolor: buttonHover,
              },
              alignSelf: 'center',
              width: '100%',
            }}
          >
            {mutation.isLoading ? 'Adding...' : 'Add To Cart'}
          </Button>
        </Card>
      </Box>
    </Box>
  );
}

export default Product;
