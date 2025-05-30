import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { AlternateEmail, Password } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './sendCode.module.css';
import { useNavigate } from 'react-router-dom';

function SendCode() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const sendPass = async (values) => {
    try {
      const response = await axios.patch(`http://mytshop.runasp.net/api/Account/SendCode`, values);
      console.log(response);

      if (response.status === 200) {
        alert("Password has been reset successfully.");
        navigate('/login'); // تحويل لصفحة تسجيل الدخول بعد النجاح
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      if (error.response?.data) {
        alert(`Error: ${error.response.data}`);
      } else {
        alert("Failed to reset password. Please check the code and try again.");
      }
    }
  };

  return (
    <Box component="form" className={styles.formContainer} onSubmit={handleSubmit(sendPass)}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Enter Verification Code</Typography>

      <TextField
        {...register('email')}
        type="email"
        label="Email"
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
        {...register('code')}
        label="Code"
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
        label="New Password"
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

      <TextField
        {...register('confirmPassword')}
        type="password"
        label="Confirm Password"
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

      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Reset Password
      </Button>
    </Box>
  );
}

export default SendCode;

