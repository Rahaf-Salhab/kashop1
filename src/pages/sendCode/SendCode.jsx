import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { AlternateEmail, Lock } from '@mui/icons-material';
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
        navigate('/login');
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 64px)" // إذا كان في Navbar ثابت
      sx={{ backgroundColor: '#f9f9f9', px: 2 }}
    >
      <Box
        component="form"
        className={styles.formContainer}
        onSubmit={handleSubmit(sendPass)}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#6c63ff"
          mb={1}
          fontSize={{ xs: '1rem', sm: '1.1rem' }}
        >
          Step 2
        </Typography>

        <Typography
          fontWeight="bold"
          mb={2}
          fontSize={{ xs: '1.5rem', sm: '1.8rem' }}
        >
          Enter Verification Code
        </Typography>

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
                <Lock />
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
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mt: 3,
            py: 1.6,
            fontWeight: 'bold',
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            backgroundColor: '#4dc6cd',
            textTransform: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          Reset Password
        </Button>
      </Box>
    </Box>
  );
}

export default SendCode;
