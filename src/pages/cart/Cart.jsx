import { Add, Delete, Remove } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductFromCart = async () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("Please log in to view your cart.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://mytshop.runasp.net/api/Carts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data.cartResponse);
    } catch (error) {
      console.error("Failed to fetch cart products:", error);
      alert("Unable to fetch cart. Please make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async (id) => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.patch(`http://mytshop.runasp.net/api/Carts/increaseCount/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.message === "success") {
        const updatedProduct = products.map((product) =>
          product.id === id
            ? { ...product, count: product.count + 1 }
            : product
        );
        setProducts(updatedProduct);
      } else {
        alert("Something went wrong.");
      }

    } catch (error) {
      console.error("Failed to increase quantity:", error);
      alert("Unable to update cart. Please try again.");
    }
  };

  const decreaseQty = async (id) => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.patch(`http://mytshop.runasp.net/api/Carts/decreaseCount/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.message === "success") {
        let updatedProduct = products.map((product) =>
          product.id === id
            ? { ...product, count: product.count - 1 }
            : product
        ).filter((product) => product.count > 0);

        setProducts(updatedProduct);
      } else {
        alert("Something went wrong.");
      }

    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      alert("Unable to update cart. Please try again.");
    }
  };

  const removeItem = async (id) => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.delete(`http://mytshop.runasp.net/api/Carts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 204) {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
      } else {
        alert("Failed to remove item.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Unable to remove item. Please try again.");
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.delete(`http://mytshop.runasp.net/api/Carts/clearCart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 204) {
        setProducts([]);
      } else {
        alert("Failed to clear cart.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Unable to clear cart. Please try again.");
    }
  };

  useEffect(() => {
    getProductFromCart();
  }, []);

  return (
    <Box>
      <Typography variant='h2' gutterBottom>Shopping Cart</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton color="error" onClick={clearCart}>
              <Delete />
              <Typography sx={{ ml: 1 }}>Clear Cart</Typography>
            </IconButton>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            products && products.length > 0 ? (
              products.map((product) =>
                <Card sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', p: 2, mb: 2 }} key={product.id}>
                  <CardMedia
                    component={'img'}
                    image='https://placehold.co/100'
                    alt={product.name}
                    sx={{ borderRadius: 2, width: 200 }}
                  />
                  <CardContent>
                    <Typography variant='h5'>{product.name}</Typography>
                    <Typography variant='h6' color='primary'>{product.price}</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={() => increaseQty(product.id)}><Add /></IconButton>
                    <Typography>{product.count}</Typography>
                    <IconButton onClick={() => decreaseQty(product.id)}><Remove /></IconButton>
                    <IconButton color='error' onClick={() => removeItem(product.id)}><Delete /></IconButton>
                  </Box>
                </Card>
              )
            ) : (
              <Typography variant="body1">No products in your cart.</Typography>
            )
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant='h4' gutterBottom>Order Summary</Typography>
           </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
