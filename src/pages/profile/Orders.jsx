import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuthInstance';
import {Box,Typography,Paper,CircularProgress,Button,Divider,useTheme,Stack,} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const fetchOrders = async () => {
  const { data } = await axiosAuth.get('Orders');

  console.log("🛒 Orders Response:", data); 

  const sorted = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  return sorted;
};

function Orders() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const navbarColor = theme.palette.mode === 'light' ? '#55cbd2' : '#044a4f';
  const navbarHover = theme.palette.mode === 'light' ? '#3bbabe' : '#033639';
  const titleColor = theme.palette.mode === 'light' ? '#002B5B' : '#ffffff';

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography color="error" fontWeight="bold">
          ⚠️ Failed to load orders.
        </Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Typography mt={6} align="center" fontWeight="bold">
        📭 No orders found.
      </Typography>
    );
  }

  return (
    <Box p={{ xs: 2, sm: 4 }} maxWidth="800px" mx="auto">
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        sx={{ color: titleColor }}
      >
        🧾 Your Orders
      </Typography>

      <Stack spacing={3}>
        {data.map((order) => (
          <Paper
            key={order.id}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.shadows[2],
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              🆔 Order ID: {order.id}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography>
              <strong>📅 Date:</strong>{' '}
              {new Date(order.orderDate).toLocaleString()}
            </Typography>
            <Typography>
              <strong>📦 Status:</strong> {order.orderStatus}
            </Typography>
            <Typography>
              <strong>💰 Total:</strong> {order.totalPrice} JOD
            </Typography>

            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 2,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: navbarColor,
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: navbarHover,
                },
              }}
              onClick={() => navigate(`/profile/orders/${order.id}`)}
            >
              View Details
            </Button>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default Orders;
