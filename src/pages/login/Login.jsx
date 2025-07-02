import React, { useState } from 'react';
import {Box,Button,Grid,IconButton,InputAdornment,TextField,Typography} from '@mui/material';
import { AlternateEmail, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuthInstance';

function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [showPassword, setShowPassword] = useState(false);

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
    onSuccess: (data) => {
      localStorage.setItem('userToken', data.token);
      toast.success('Logged in successfully!', { autoClose: 2000 });
      navigate('/', { replace: true });
    },
    onError: () => {
      toast.error('Failed login', { autoClose: 3000 });
    },
  });

  const onSubmit = (data) => login(data);

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left side - image (hidden on small screens) */}
      <Grid
        item
        md={6}
        sx={{
          display: { xs: 'none', md: 'block' },
          height: '100%',
        }}
      >
    <Box sx={{ position: 'relative', height: '100%'  }}>
          <img
            src="/images/pic1.png"
            alt="Visual"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Logo - clickable */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            component={Link}
            to="/"
          >
            <img
              src="/logo/logo1.png"
              alt="Logo"
              style={{ width: 45, height: 50 }}
            />
            <Typography
              variant="h6"
              sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              KA STORE
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* Right side - form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkMode ? '#1e1e1e' : '#fefefe',
          px: 2,
          pr: { md: 4, lg: 6, xl: 8 },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%',
            maxWidth: 500,
            textAlign: 'center',
            px: 4,
            py: 4,
            pl: { md: 6, lg: 8, xl: 10 },
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={1.5}>
            Login
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Good to see you again!
          </Typography>

          <TextField
            label="Email Address"
            placeholder="email@example.com"
            fullWidth
            margin="normal"
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
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
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

          <Box textAlign="right" mt={1}>
            <Link to="/forgotPassword" style={{ fontSize: '0.875rem' }}>
              Forget Password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            disabled={!isValid || isPending}
            sx={{
              mt: 3,
              backgroundColor: '#4dc3c1',
              color: '#fff',
              py: 1.3,
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': { backgroundColor: '#36b2b1' },
            }}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>

          <Typography variant="body2" mt={3}>
            Don’t Have an Account?{' '}
            <Link to="/register" style={{ color: '#6c63ff', fontWeight: 'bold' }}>
              Create Account
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
