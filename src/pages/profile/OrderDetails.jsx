import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuthInstance';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Divider,
  useTheme,
  Avatar,
  Stack,
} from '@mui/material';
import {
  LocalMall,
  Event,
  Payment,
  Info,
  AttachMoney,
} from '@mui/icons-material';

const fetchOrderDetails = async (id) => {
  const { data } = await axiosAuth.get(`/Orders/${id}`);
  return data;
};

function OrderDetails() {
  const { id } = useParams();
  const theme = useTheme();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['orderDetails', id],
    queryFn: () => fetchOrderDetails(id),
  });

  if (isLoading) {
    return <Box textAlign="center" mt={6}><CircularProgress /></Box>;
  }

  if (isError) {
    return <Typography color="error" align="center" mt={6}>❌ Failed to load order details.</Typography>;
  }

  return (
    <Box px={{ xs: 2, sm: 4 }} py={6} maxWidth="700px" mx="auto">
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
          <LocalMall />
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Order #{data.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(data.orderDate).toLocaleString()}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Info Rows */}
      <InfoRow icon={<Event />} label="Order Date" value={new Date(data.orderDate).toLocaleDateString()} />
      <InfoRow icon={<Payment />} label="Payment Method" value={data.paymentMethodType} />
      <InfoRow
        icon={<Info />}
        label="Status"
        value={
          <Chip
            label={data.orderStatus}
            color={
              data.orderStatus === 'Delivered'
                ? 'success'
                : data.orderStatus === 'Failed'
                ? 'error'
                : 'warning'
            }
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        }
      />
      <InfoRow icon={<AttachMoney />} label="Total Price" value={`${data.totalPrice} JOD`} />
    </Box>
  );
}

 function InfoRow({ icon, label, value }) {
  return (
    <Grid container alignItems="center" spacing={2} mb={3}>
      <Grid item>
        <Avatar sx={{ bgcolor: 'grey.100', color: 'primary.main', width: 40, height: 40 }}>
          {icon}
        </Avatar>
      </Grid>
      <Grid item xs>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="subtitle1" fontWeight="medium">
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default OrderDetails;
