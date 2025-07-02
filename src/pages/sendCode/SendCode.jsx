import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { AlternateEmail, Lock } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuthInstance';

function SendCode() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const sendCodeMutation = useMutation({
    mutationFn: async (values) => {
      const response = await axiosAuth.patch(`/Account/SendCode`, values);
      return response;
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        alert("Password has been reset successfully.");
        navigate('/login');
      } else {
        alert("Something went wrong. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Error submitting code:", error);
      if (error.response?.data) {
        alert(`Error: ${error.response.data}`);
      } else {
        alert("Failed to reset password. Please check the code and try again.");
      }
    }
  });

  const onSubmit = (data) => {
    sendCodeMutation.mutate(data);
  };

  const textFieldStyle = {
    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
    input: {
      color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
    borderRadius: 1,
  };

  const password = watch('password');

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 64px)"
      sx={{ backgroundColor: 'background.default', px: 2 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#fff' : '#000',
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
          mb={1}
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
          {...register('email', { required: "Email is required" })}
          type="email"
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail />
              </InputAdornment>
            ),
          }}
          sx={textFieldStyle}
        />

        <TextField
          {...register('code', { required: "Code is required" })}
          label="Code"
          fullWidth
          margin="normal"
          error={!!errors.code}
          helperText={errors.code?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail />
              </InputAdornment>
            ),
          }}
          sx={textFieldStyle}
        />

        <TextField
          {...register('password', { required: "Password is required" })}
          type="password"
          label="New Password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          sx={textFieldStyle}
        />

        <TextField
          {...register('confirmPassword', {
            required: "Confirmation is required",
            validate: (value) =>
              value === password || "Passwords do not match"
          })}
          type="password"
          label="Confirm Password"
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          sx={textFieldStyle}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={sendCodeMutation.isLoading}
          sx={{
            mt: 3,
            py: 1.6,
            fontWeight: 'bold',
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            backgroundColor: '#4dc6cd',
            textTransform: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#3cb5bd',
            },
          }}
        >
          {sendCodeMutation.isLoading ? 'Sending...' : 'Reset Password'}
        </Button>
      </Box>
    </Box>
  );
}

export default SendCode;
