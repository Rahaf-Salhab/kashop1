import { Add, Delete, Remove, ShoppingCartOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CartContext } from '../../context/CartContext';
import axiosAuth from '../../api/axiosAuthInstance';

const fetchCart = async () => {
  const { data } = await axiosAuth.get(`Carts`);
  return data.cartResponse;
};

function Cart() {
  const { getItems } = useContext(CartContext);
  const queryClient = useQueryClient();
  const theme = useTheme();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    onSuccess: getItems,
  });

  const calculateTotals = () => {
    const totalPrice = products.reduce((acc, p) => acc + p.price * p.count, 0);
    const totalItems = products.reduce((acc, p) => acc + p.count, 0);
    return { totalPrice, totalItems };
  };

  const { totalPrice, totalItems } = calculateTotals();

  const increaseMutation = useMutation({
    mutationFn: (id) => axiosAuth.patch(`Carts/increaseCount/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      getItems();
    },
  });

  const decreaseMutation = useMutation({
    mutationFn: (id) => axiosAuth.patch(`Carts/decreaseCount/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      getItems();
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id) => axiosAuth.delete(`Carts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      getItems();
    },
  });

  const clearMutation = useMutation({
    mutationFn: () => axiosAuth.delete(`Carts/clearCart`),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      getItems();
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 1, sm: 2, md: 6 },
        py: 4,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          mt: { xs: 4, sm: 6, md: 8 },
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Box
            sx={{
              height: '60vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'text.secondary',
              px: 2,
            }}
          >
            <ShoppingCartOutlined sx={{ fontSize: 100, mb: 2 }} color="disabled" />
            <Typography variant="h5" gutterBottom>
              Your Cart is Empty.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Start shopping and add some products to your cart.
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#044a4f' : '#55cbd2',
                color: '#fff',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#033c40' : '#3cb5bd',
                },
              }}
            >
              Shop Now
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Order Summary */}
            <Grid
              item
              xs={12}
              md={4}
              order={{ xs: 2, md: 1 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Typography variant="h5" fontWeight="600">
                  Order Summary
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  size="small"
                  onClick={() => clearMutation.mutate()}
                  sx={{
                    borderRadius: 2,
                    color: '#fff',
                    fontWeight: 'bold',
                    px: 2,
                    py: 0.8,
                    minWidth: 0,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: '#b52b38',
                    },
                  }}
                >
                  CLEAR CART
                </Button>
              </Box>

              <Card
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: 4,
                  boxShadow: 3,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  Total Items: <strong>{totalItems}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Total Price: <strong>{totalPrice}$</strong>
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  component={Link}
                  to="/checkout"
                  startIcon={<ShoppingCartOutlined />}
                  sx={{
                    backgroundColor: '#044a4f',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: '#026469',
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Grid>

            {/* Product list */}
            <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
              {products.map((product) => (
                <Card
                  key={product.id}
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 4,
                    boxShadow: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f4f4f4',
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <CardMedia
                        component="img"
                        image={product.imageUrl || 'https://placehold.co/120x100'}
                        alt={product.name}
                        sx={{
                          borderRadius: 2,
                          width: '100%',
                          height: 100,
                          objectFit: 'cover',
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                      <Typography variant="h6" fontWeight="600">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Product Description Product Description
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="primary" mt={1}>
                        {product.price}$ &nbsp;
                        <Typography component="span" variant="body2" color="text.secondary">
                          x {product.count}
                        </Typography>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: { xs: 'flex-start', sm: 'center' },
                          gap: 1.5,
                          flexWrap: 'nowrap',
                          overflowX: 'auto',
                        }}
                      >
                        <IconButton
                          onClick={() => increaseMutation.mutate(product.id)}
                          sx={{ color: '#26A69A' }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                        <Typography fontWeight="bold">{product.count}</Typography>
                        <IconButton
                          onClick={() => decreaseMutation.mutate(product.id)}
                          sx={{ color: '#26A69A' }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => removeMutation.mutate(product.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Cart;
