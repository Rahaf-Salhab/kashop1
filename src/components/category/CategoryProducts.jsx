import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuthInstance';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Rating,
} from '@mui/material';
import Loader from '../../components/shared/Loader';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export default function CategoryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 1;
  const [sortOption, setSortOption] = useState('name_asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProductId, setExpandedProductId] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { getItems } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("userToken");
  const isLoggedIn = !!token;

  const fetchProducts = async () => {
    const { data } = await axiosAuth.get(`/categories/${id}/products`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productsByCategory', id],
    queryFn: fetchProducts,
  });

  const handleAddToCart = async (productId) => {
    try {
      await axiosAuth.post(
        `/Carts/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product added to cart!");
      getItems();
    } catch (error) {
      toast.error("Failed to add to cart.");
      console.error("Add to cart error:", error);
    }
  };

  const handleRateClick = (productId) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setExpandedProductId((prev) => (prev === productId ? null : productId));
    }
  };

  const onReviewSubmit = async (data, productId) => {
    try {
      await axiosAuth.post(`/products/${productId}/Reviews/Create`, {
        Rate: data.Rate,
        Comment: data.Comment,
      });
      toast.success("✅ Review submitted successfully!");
      reset();
      setExpandedProductId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to submit review");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Typography color="error">Error: {error.message}</Typography>;

  const [sortBy, sortOrder] = sortOption.split('_');

  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'name') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProduct = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box px={isMobile ? 2 : 8} py={4}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        Category Products
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mb={4}
        justifyContent="center"
        alignItems="stretch"
      >
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortOption}
            label="Sort"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value="name_asc">Name (A-Z)</MenuItem>
            <MenuItem value="name_desc">Name (Z-A)</MenuItem>
            <MenuItem value="price_asc">Price (Low to High)</MenuItem>
            <MenuItem value="price_desc">Price (High to Low)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={4} justifyContent="center">
        {currentProduct.length > 0 ? (
          currentProduct.map((product) => (
            <Grid item xs={12} sm={10} md={8} key={product.id}>
              <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleRateClick(product.id)}
                  >
                    {expandedProductId === product.id ? "Cancel" : "Rate Product"}
                  </Button>
                </CardActions>

                {expandedProductId === product.id && isLoggedIn && (
                  <Box
                    component="form"
                    onSubmit={handleSubmit((data) => onReviewSubmit(data, product.id))}
                    sx={{ px: 3, pb: 3 }}
                  >
                    <Stack spacing={2}>
                      <Rating
                        value={watch('Rate') || 0}
                        onChange={(_, value) => setValue('Rate', value)}
                      />
                      <input
                        type="hidden"
                        {...register('Rate', {
                          required: 'Rating is required',
                          validate: (v) => v > 0 || 'Please select a rating',
                        })}
                      />
                      {errors.Rate && (
                        <Typography color="error">{errors.Rate.message}</Typography>
                      )}

                      <TextField
                        label="Comment"
                        multiline
                        fullWidth
                        rows={2}
                        {...register('Comment', { required: 'Comment is required' })}
                        error={!!errors.Comment}
                        helperText={errors.Comment?.message}
                      />

                      <Button type="submit" variant="contained" size="small">
                        Submit Review
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" mt={4}>
            No products found.
          </Typography>
        )}
      </Grid>

      {sortedProducts.length > 0 && (
        <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
          <Button
            variant="contained"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Typography mt={1}>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
}

