import React, { useState, useContext } from 'react';
import {Box,Button,IconButton,InputAdornment,TextField,Typography,Paper,useTheme} from '@mui/material';
import { AlternateEmail, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import pic1 from '../../assets/images/pic1.png';
import logo1 from '../../assets/logo/logo.png';
import axiosAuth from '../../api/axiosAuthInstance';
import { CartContext } from '../../context/CartContext';

function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [showPassword, setShowPassword] = useState(false);
  const { getItems } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axiosAuth.post(`Account/Login`, { email, password });
      return response.data;
    },
    onSuccess: async (data) => {
      localStorage.setItem('userToken', data.token);
      await getItems();
      toast.success('Logged in successfully!', { autoClose: 2000 });
      navigate('/', { replace: true });
    },
    onError: () => {
      toast.error('Failed login', { autoClose: 3000 });
    },
  });

  const onSubmit = (data) => login(data);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: isDarkMode ? '#121212' : '#f9f9f9',
      }}
    >
      {/*   الصورة الجانبية */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: { md: '45%' },
          backgroundImage: `url(${pic1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'relative',
          mx: 4, 
          borderRadius: 2,
        }}
      >
        {/*   شعار فوق الصورة */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          component={Link}
          to="/"
        >
          <img src={logo1} alt="Logo" style={{ width: 45, height: 50 }} />
          <Typography
            variant="h6"
            sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}
          >
            KA STORE
          </Typography>
        </Box>
      </Box>

      {/*   الفورم */}
      <Box
        sx={{
          width: { xs: '100%', md: '55%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 3, sm: 4 },
            width: '100%',
            maxWidth: 500,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Login
          </Typography>

          <Typography variant="body2" color="textSecondary" mb={3}>
            Good to see you again!
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              placeholder="email@example.com"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmail />
                  </InputAdornment>
                ),
              }}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email',
                },
              })}
            />

            <TextField
              label="Password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
              })}
            />

            <Box textAlign="right" mb={2}>
              <Link to="/forgotPassword" style={{ fontSize: '0.875rem' }}>
                Forget Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isValid || isPending}
              sx={{ py: 1.2 }}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2">
                Don’t have an account?{' '}
                <Link to="/register" style={{ color: '#3f51b5', textDecoration: 'none' }}>
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
