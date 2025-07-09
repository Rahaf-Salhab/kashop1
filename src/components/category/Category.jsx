import {Button,Typography,useTheme,Grid,Box,} from '@mui/material';
import axiosAuth from '../../api/axiosAuthInstance';
import { useQuery } from '@tanstack/react-query';
import Loader from '../shared/Loader';
import { useNavigate } from 'react-router-dom';

export default function Category() {
  const theme = useTheme();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const { data } = await axiosAuth.get(`/categories`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <Loader />;

  const isDark = theme.palette.mode === 'dark';
  const navbarColor = isDark ? '#044a4f' : '#55cbd2';
  const navbarHover = isDark ? '#03363c' : '#3bbabe';

  const cardStyle = {
    height: 180,
    borderRadius: 2,
    p: 2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.3s ease',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 2px 8px rgba(255, 255, 255, 0.08)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 6px 12px rgba(255, 255, 255, 0.15)'
          : '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
  };

  return (
    <Box width="100%" py={4}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ margin: 0, width: '100%' }}
      >
        {data.map((category) => (
          <Grid
            item
            key={category.id}
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            sx={{ px: 0 }}
          >
            <Box sx={cardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                fontFamily="monospace"
              >
                {category.name}
              </Typography>

              <Button
                variant="contained"
                size="small"
                onClick={() => navigate(`/category/${category.id}/products`)}
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  borderRadius: 3,
                  px: 3,
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  backgroundColor: navbarColor,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: navbarHover,
                  },
                }}
              >
                View Products
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
