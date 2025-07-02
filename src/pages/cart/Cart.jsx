import { Add, Delete, Remove, ShoppingCartOutlined } from '@mui/icons-material';
import {
  Box, Button, Card, CardContent, CardMedia,
  CircularProgress, Grid, IconButton, Typography, Divider
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

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    onSuccess: (data) => {
      const totalItems = data.reduce((acc, item) => acc + item.count, 0);
      getItems();
    }
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
    }
  });

  const decreaseMutation = useMutation({
    mutationFn: (id) => axiosAuth.patch(`Carts/decreaseCount/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      getItems();
    }
  });

  const removeMutation = useMutation({
    mutationFn: (id) => axiosAuth.delete(`Carts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      getItems();
    }
  });

  const clearMutation = useMutation({
    mutationFn: () => axiosAuth.delete(`Carts/clearCart`),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      getItems();
    }
  });

  return (
    <Box sx={{ px: 3, py: 5 }}>
      <Typography variant='h3' gutterBottom fontWeight="bold" color="primary">
        🛒 Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            {products.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => clearMutation.mutate()}
              >
                Clear Cart
              </Button>
            )}
          </Box>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                mt: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              <ShoppingCartOutlined sx={{ fontSize: 100, mb: 2 }} color="disabled" />
              <Typography variant="h5" gutterBottom>
                Your Cart is Empty.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Looks Like You Haven't Added Anything Yet,
                Let's Fix that!
              </Typography>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                size="large"
              >
                Shop now!
              </Button>
            </Box>
          ) : (
            products.map((product) => (
              <Card key={product.id} sx={{ mb: 2, p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      image="https://placehold.co/100"
                      alt={product.name}
                      sx={{ borderRadius: 2, width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1" color="primary">{product.price}$</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <IconButton onClick={() => increaseMutation.mutate(product.id)}><Add /></IconButton>
                      <Typography>{product.count}</Typography>
                      <IconButton onClick={() => decreaseMutation.mutate(product.id)}><Remove /></IconButton>
                      <IconButton color="error" onClick={() => removeMutation.mutate(product.id)}><Delete /></IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            ))
          )}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              🧾 Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>Total Items: <strong>{totalItems}</strong></Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Total Price: <strong>{totalPrice}$</strong></Typography>
            <Button
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              component={Link}
              to="/checkout"
              disabled={products.length === 0}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
