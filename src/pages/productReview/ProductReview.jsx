import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Stack,
  useTheme,
  Paper,
  InputAdornment,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosAuth from '../../api/axiosAuthInstance';
import { toast } from 'react-toastify';
import {
  StarRate,
  Comment as CommentIcon,
  ArrowBack,
  Send as SendIcon,
} from '@mui/icons-material';

export default function ProductReview() {
  const theme = useTheme();
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const buttonColor = theme.palette.mode === 'light' ? '#55cbd2' : '#044a4f';
  const buttonHover = theme.palette.mode === 'light' ? '#35b6bc' : '#033a3e';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosAuth.get(`/products/${id}`);
        setProductData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('❌ Please login to submit your review');
      return;
    }

    try {
      await axiosAuth.post(`/products/${id}/Reviews/Create`, {
        Rate: data.Rate,
        Comment: data.Comment,
      });
      toast.success('✅ Review submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Failed to submit review');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 540,
        mx: 'auto',
        mt: 6,
        px: { xs: 2, sm: 3 },
        fontFamily: 'monospace',
      }}
    >
      <Paper elevation={4} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
        {/* ✅ عنوان */}
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <StarRate color="warning" />
          <Typography variant="h5" fontWeight={600}>
            Rate Product
          </Typography>
        </Box>

        {/* ✅ صورة المنتج */}
        {productData?.image && (
          <Box textAlign="center" my={2}>
            <img
              src={productData.image}
              alt="Product"
              style={{ maxWidth: 120, borderRadius: 8 }}
            />
          </Box>
        )}

        {/* ✅ اسم المنتج */}
        {productData?.name && (
          <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
            {productData.name}
          </Typography>
        )}

        {/* ✅ التقييم الحالي */}
        {productData?.rating && (
          <Box textAlign="center" mb={2}>
            <Rating value={productData.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="textSecondary">
              {productData.rating.toFixed(1)} / 5.0
            </Typography>
          </Box>
        )}

        {/* ✅ وصف تشجيعي */}
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="center"
          mb={3}
        >
          Share your thoughts to help others make better choices!
        </Typography>

        {/* ✅ النموذج */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Box>
              <Typography gutterBottom>Rating</Typography>
              <Rating
                value={watch('Rate') || 0}
                onChange={(_, value) => setValue('Rate', value)}
              />
              {errors.Rate && (
                <Typography color="error" variant="body2">
                  {errors.Rate.message}
                </Typography>
              )}
            </Box>

            {/* ✅ تسجيل التقييم كمخفي للفلديشن */}
            <input
              type="hidden"
              {...register('Rate', {
                required: 'Rating is required',
                validate: (v) => v > 0 || 'Please select a rating',
              })}
            />

            <TextField
              label="Comment"
              multiline
              rows={4}
              fullWidth
              {...register('Comment', { required: 'Comment is required' })}
              error={!!errors.Comment}
              helperText={errors.Comment?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CommentIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SendIcon />}
              sx={{
                backgroundColor: buttonColor,
                '&:hover': { backgroundColor: buttonHover },
                textTransform: 'none',
                fontWeight: '600',
                fontSize: '1rem',
              }}
            >
              Submit Review
            </Button>

            <Button
              component={Link}
              to={`/product/${id}/reviews`}
              variant="text"
              startIcon={<ArrowBack />}
              sx={{ mt: -1, color: buttonColor }}
            >
              View all reviews
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}


