import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Button, Stack, MenuItem, TextField,
  InputAdornment, Select, FormControl, useTheme, useMediaQuery,
  Card, CardContent, CardActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Rating from '@mui/material/Rating';

import axiosAuth from '../../api/axiosAuthInstance';
import { CartContext } from '../../context/CartContext';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Loader from '../../components/shared/Loader';

export default function CategoryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 1;
  const [sortOption, setSortOption] = useState('price_asc');
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';

  const textColor = isDarkMode ? '#ffffff' : '#002B5B';
  const buttonColor = isDarkMode ? '#ffffff' : '#55cbd2';
  const cardColor = isDarkMode ? '#0b3c3e' : '#e0f7f9';
  const bgColor = isDarkMode ? '#001f1f' : '#f0fafa';

  const { getItems } = useContext(CartContext);
  const token = localStorage.getItem("userToken");

  const fetchProducts = async () => {
    const { data } = await axiosAuth.get(`/categories/${id}/products`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productsByCategory', id],
    queryFn: fetchProducts,
  });

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
  const currentProduct = isMobile
    ? sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : sortedProducts;

  const handleAddToCart = async (productId) => {
    try {
      await axiosAuth.post(`/Carts/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product added to cart!");
      getItems();
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  return (
    <Box px={isMobile ? 2 : 6} py={2} sx={{ backgroundColor: bgColor, minHeight: '75vh' }}>
      <Typography variant="h5" align="center" fontWeight={600} color={textColor} mb={2}>
        Category Products
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Search Products"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: textColor }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            input: { color: textColor },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: textColor },
              '&:hover fieldset': { borderColor: buttonColor },
            },
          }}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Sort' }}
            sx={{
              color: textColor,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: textColor,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: buttonColor,
              },
            }}
          >
            <MenuItem value="price_asc">Price (Low to High)</MenuItem>
            <MenuItem value="price_desc">Price (High to Low)</MenuItem>
            <MenuItem value="name_asc">Name (A-Z)</MenuItem>
            <MenuItem value="name_desc">Name (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={3} justifyContent="center">
        {currentProduct.length > 0 ? (
          currentProduct.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 3,
                  backgroundColor: cardColor,
                  border: "1px solid #ccc",
                  textAlign: "center",
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={1} color={textColor}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" sx={{ color: buttonColor }} fontWeight={600}>
                    ${product.price}
                  </Typography>
                  <Rating value={product.rate} precision={0.5} readOnly sx={{ mt: 1 }} />
                </CardContent>

                <CardActions
                  sx={{
                    justifyContent: 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 1,
                    px: 2,
                    pb: 2,
                  }}
                >
                  <Button
                    fullWidth={isMobile}
                    variant="contained"
                    size="medium"
                    onClick={() => handleAddToCart(product.id)}
                    sx={{
                      backgroundColor: buttonColor,
                      color: isDarkMode ? '#000' : '#fff',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#3bb8c1' },
                    }}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    fullWidth={isMobile}
                    variant="outlined"
                    size="medium"
                    onClick={() => navigate(`/product/${product.id}/rate`)}
                    sx={{
                      borderColor: buttonColor,
                      color: buttonColor,
                      textTransform: 'none',
                      '&:hover': { borderColor: '#3bb8c1' },
                    }}
                  >
                    Rate Product
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" mt={2}>
            No products found.
          </Typography>
        )}
      </Grid>

      {isMobile && sortedProducts.length > 0 && (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={3}>
          <Button
            variant="outlined"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            sx={{
              color: buttonColor,
              borderColor: buttonColor,
              '&:hover': { borderColor: buttonColor },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </Button>
          <Typography color={textColor}>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            sx={{
              color: buttonColor,
              borderColor: buttonColor,
              '&:hover': { borderColor: buttonColor },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </Stack>
      )}
    </Box>
  );
}

