import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {Box,Button,Card,Divider,Typography,useTheme} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/shared/Loader';
import { CartContext } from '../../context/CartContext';
import axiosAuth from '../../api/axiosAuthInstance'; 

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
    onError: (error) => {
      console.error("Failed to add to cart", error);
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

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f9f9f9',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 520,
          borderRadius: 4,
          boxShadow: theme.shadows[6],
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        elevation={8}
      >
        <Typography variant="h3" fontWeight="700" textAlign="center" gutterBottom>
          {product?.name}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="body1"
          sx={{ lineHeight: 1.6, fontSize: '1.1rem', mb: 3 }}
          textAlign="justify"
        >
          {product?.description}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleAddToCart}
          disabled={mutation.isLoading}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
            alignSelf: 'center',
            px: 5,
          }}
        >
          {mutation.isLoading ? 'Adding...' : 'Add To Cart'}
        </Button>
      </Card>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
      />
    </Box>
  );
}

export default Product;
