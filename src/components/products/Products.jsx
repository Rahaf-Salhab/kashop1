import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Stack,
  Rating,
  TextField,
  Pagination,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axiosAuth from '../../api/axiosAuthInstance';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchProducts = async () => {
    const { data } = await axiosAuth.get('products?sortBy=price&order=asc');
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productsSortedByPriceAsc'],
    queryFn: fetchProducts,
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return null;

  const products = data?.data || [];

  // فلترة حسب البحث
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // pagination logic (للشاشات الصغيرة فقط)
  const itemsPerPage = 1;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = isSmallScreen
    ? filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : filteredProducts;

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, sm: 6 },
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? '#f9f9f9' : 'background.default',
      }}
    >
      {/* Search */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <TextField
          label="Search products..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1); // reset page on search
          }}
          sx={{ width: { xs: '100%', sm: '60%', md: '40%' } }}
        />
      </Box>

      {/* المنتجات */}
      <Grid
        container
        spacing={{ xs: 3, sm: 4, md: 5 }}
        justifyContent="center"
      >
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 4,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={product.mainImg}
                  alt={product.description}
                  sx={{
                    height: { xs: 180, sm: 200 },
                    objectFit: 'cover',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, pb: 0 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                  >
                    {product.description?.slice(0, 60)}...
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating
                      value={product.rate}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({product.rate?.toFixed(1)})
                    </Typography>
                  </Stack>
                </CardContent>

                <CardActions
                  sx={{
                    justifyContent: 'center',
                    px: 2,
                    pb: 2,
                    pt: 1,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      component={Link}
                      to={`/product/${product.id}`}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        px: 2,
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'light' ? '#55cbd2' : '#044a4f',
                        '&:hover': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? '#3bb8c1'
                              : '#03383c',
                        },
                      }}
                    >
                      View Details
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/product/${product.id}/rate`}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        px: 2,
                        color: (theme) =>
                          theme.palette.mode === 'light' ? '#55cbd2' : '#044a4f',
                        borderColor: (theme) =>
                          theme.palette.mode === 'light' ? '#55cbd2' : '#044a4f',
                        '&:hover': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? '#e0f7f9'
                              : '#022f32',
                          borderColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? '#3bb8c1'
                              : '#03383c',
                        },
                      }}
                    >
                      Rate
                    </Button>

                    <Button
                      variant="text"
                      size="small"
                      component={Link}
                      to={`/product/${product.id}/reviews`}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'medium',
                        px: 1,
                        color: (theme) =>
                          theme.palette.mode === 'light'
                            ? '#1976d2'
                            : '#90caf9',
                      }}
                    >
                      See All Reviews
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ mt: 5 }}>
            No products found.
          </Typography>
        )}
      </Grid>

      {/* Pagination for small screens only */}
      {isSmallScreen && totalPages > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}


