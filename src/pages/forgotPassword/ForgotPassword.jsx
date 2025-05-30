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
      navigate('/send-code'); // ✅ تأكد من كتابة المسار الصحيح
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  return (
    <Box component="form" className={styles.formContainer} onSubmit={handleSubmit(userPass)}>
      <Typography variant="h5" fontWeight="bold" mb={1}>Forget Password</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
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
        sx={{ backgroundColor: '#4dc6cd', mt: 2 }}
      >
        Send Code
      </Button>

      <Typography variant="body2" textAlign="center" mt={2}>
        Remembered your password?{' '}
        <Link to="/login" style={{ textDecoration: 'none', color: '#6c63ff' }}>
          Log in
        </Link>
      </Typography>
    </Box>
  );
}

export default ForgotPassword;



