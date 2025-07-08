 // src/pages/SeeReviews/SeeReviews.jsx

import React from 'react';
import {
  Box,
  Typography,
  Rating,
  Card,
  CardContent,
  Container,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuthInstance';
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function SeeReviews() {
  const { id } = useParams();
  const theme = useTheme();

  const fetchProductReviews = async () => {
    const { data } = await axiosAuth.get(`/products/${id}`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: fetchProductReviews,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box textAlign="center" mt={6}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );

  const { name, reviews = [], rate } = data;

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      {/* عنوان المنتج مع الأيقونة */}
      <Box
        display="flex"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={1}
        mb={3}
        textAlign={{ xs: 'left', sm: 'inherit' }}
      >
        <FeedbackIcon
          color="primary"
          sx={{ fontSize: { xs: 30, sm: 40 } }}
        />
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ fontSize: { xs: '1.4rem', sm: '2rem' } }}
        >
          Reviews for "{name}"
        </Typography>
      </Box>

      {/* تقييم النجوم العام */}
      <Box
        display="flex"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={0.5}
        mb={4}
      >
        <Rating value={rate} readOnly precision={0.5} />
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
        >
          {rate?.toFixed(1)} / 5
        </Typography>
      </Box>

      {/* المراجعات */}
      {reviews.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No reviews yet.
        </Typography>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} sx={{ mb: 2, boxShadow: 2 }}>
            <CardContent>
              <Rating
                value={review.rate}
                readOnly
                precision={0.5}
                sx={{ color: '#fbc02d' }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
                sx={{ wordBreak: 'break-word' }}
              >
                {review.comment}
              </Typography>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ display: 'block', mt: 1 }}
              >
                {new Date(review.reviewDate).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}


