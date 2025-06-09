import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import React from 'react';
import styles from './forgotPassword.module.css';
import { AlternateEmail } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const userPass = async (values) => {
    try {
      const response = await axios.post(`http://mytshop.runasp.net/api/Account/ForgotPassword`, values);
      console.log(response);
      navigate('/send-code');
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 64px)" 
      sx={{ backgroundColor: '#f9f9f9', px: 2 }}
    >
      <Box
        component="form"
        className={styles.formContainer}
        onSubmit={handleSubmit(userPass)}
      >
        <Typography variant="subtitle1" fontWeight="bold" color="#6c63ff" mb={1} fontSize={{ xs: '1rem', sm: '1.1rem' }}>
          Step 1
        </Typography>

        <Typography fontWeight="bold" mb={1} fontSize={{ xs: '1.5rem', sm: '1.8rem' }}>
          Forget Password
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3} fontSize={{ xs: '0.9rem', sm: '1rem' }}>
          Please enter your email address and we’ll send you a recovery code.
        </Typography>

        <TextField
          {...register('email')}
          type="email"
          label="Email Address"
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: '#4dc6cd',
            textTransform: 'none',
            fontWeight: 'bold',
            mt: 3,
            py: 1.6,
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          Send Code
        </Button>

        <Typography variant="body2" textAlign="center" mt={3} fontSize={{ xs: '0.85rem', sm: '0.95rem' }}>
          Remembered your password?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#6c63ff', fontWeight: 500 }}>
            Log in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default ForgotPassword;




