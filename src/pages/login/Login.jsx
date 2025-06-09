import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import styles from './login.module.css';
import { AlternateEmail, Password } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const { register, handleSubmit } = useForm();
  const loginUser = async (values) => {
    const response = await axios.post(`http://mytshop.runasp.net/api/Account/Login`, values);
    localStorage.setItem("userToken", response.data.token);
    console.log(response);
  };

  return (
    <Box component="form" className={styles.formContainer} onSubmit={handleSubmit(loginUser)}>
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

      <TextField
        {...register('password')}
        type="password"
        label="Password"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Password />
            </InputAdornment>
          ),
        }}
      />

      <Box textAlign="right" mb={2}>
        <Link to="/forgotPassword" style={{ fontSize: '0.875rem', color: '#6c63ff', textDecoration: 'none' }}>
          Forget Password?
        </Link>
      </Box>

      <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: '#4dc6cd' }}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
