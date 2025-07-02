import React from 'react';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Paper,
  useTheme,
  Typography
} from '@mui/material';
import {
  AccountCircle,
  AlternateEmail,
  InsertInvitation,
  Password
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import axiosAuth from '../../api/axiosAuthInstance';

function Register() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailPattern =
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+\.)*[a-zA-Z]+$/;

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,?-]).{8,}$/;

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (values) => {
      const response = await axiosAuth.post(`/Account/Register`, values);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Registration successful!', { autoClose: 2000 });
    },
    onError: (error) => {
      console.error('Register error:', error);
      toast.error('❌ Failed registration', { autoClose: 3000 });
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* الصورة الجانبية */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          backgroundImage: 'url(/images/pic2.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: { xs: 200, md: '100%' },
        }}
      />

      {/* فورم التسجيل */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
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
            maxWidth: 550,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Create New Account
          </Typography>

          <Box
            component="form"
            className={styles.formContainer}
            onSubmit={handleSubmit((data) => registerUser(data))}
          >
            <TextField
              {...register('firstName', { required: 'First name is required' })}
              label="First Name"
              sx={{ mb: 2 }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              {...register('lastName', { required: 'Last name is required' })}
              label="Last Name"
              sx={{ mb: 2 }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              {...register('userName', { required: 'Username is required' })}
              label="Username"
              sx={{ mb: 2 }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />

            <TextField
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: emailPattern,
                  message: 'Invalid email',
                },
              })}
              label="Email"
              type="email"
              sx={{ mb: 2 }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmail />
                  </InputAdornment>
                ),
              }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: passwordPattern,
                  message:
                    'Must be 8+ chars with upper, lower, number & symbol',
                },
              })}
              label="Password"
              type="password"
              sx={{ mb: 2 }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              {...register('confirmPassword', {
                required: 'Confirm password is required',
              })}
              label="Confirm Password"
              type="password"
              sx={{ mb: 2 }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <TextField
              {...register('birthOfDate', {
                required: 'Birth Date is required',
              })}
              label="Birth Date"
              type="date"
              sx={{ mb: 3 }}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertInvitation />
                  </InputAdornment>
                ),
              }}
              error={!!errors.birthOfDate}
              helperText={errors.birthOfDate?.message}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isPending}
            >
              {isPending ? 'Registering...' : 'Create Account'}
            </Button>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2">
                Already have an Account?{' '}
                <Link to="/login" style={{ color: '#3f51b5', textDecoration: 'none' }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Register;
