import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { AlternateEmail } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuthInstance';
import React from 'react';

// ✅ استيراد الصورة بشكل صحيح
import pic2 from '../../assets/images/pic2.png';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (values) => {
      const { data } = await axiosAuth.post(`Account/ForgotPassword`, values);
      return data;
    },
    onSuccess: () => {
      navigate('/send-code');
    },
    onError: () => {
      alert("Failed to send verification code");
    },
  });

  const submitEmail = (values) => {
    mutation.mutate(values);
  };

  const textFieldStyle = {
    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
    input: {
      color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
    borderRadius: 1,
  };

  return (
    <Box display="flex" minHeight="80vh">
       <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${pic2})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' },
          mx: 2, 
          borderRadius: 2,
        }}
      />

      {/* الفورم في المنتصف */}
      <Box
        flex={1}
        sx={{
          backgroundColor: 'background.default',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(submitEmail)}
          sx={{
            width: '100%',
            maxWidth: 450,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="primary" mb={1}>
            Step 1
          </Typography>

          <Typography fontWeight="bold" mb={1} fontSize={{ xs: '1.5rem', sm: '1.8rem' }}>
            Forget Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={3}
            fontSize={{ xs: '0.9rem', sm: '1rem' }}
          >
            Please enter your email address and we’ll send you a recovery code.
          </Typography>

          <TextField
            {...register('email', { required: "Email is required" })}
            type="email"
            label="Email Address"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={mutation.isPending}
            sx={{
              backgroundColor: '#4dc6cd',
              textTransform: 'none',
              fontWeight: 'bold',
              mt: 3,
              py: 1.6,
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#3cb5bd',
              },
            }}
          >
            {mutation.isPending ? 'Sending...' : 'Send Code'}
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            mt={3}
            fontSize={{ xs: '0.85rem', sm: '0.95rem' }}
          >
            Remembered your password?{' '}
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                color: '#6c63ff',
                fontWeight: 500,
              }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;


