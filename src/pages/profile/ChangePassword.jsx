import React, { useState } from 'react';
import {Box,Button,TextField,Typography,Paper,InputAdornment,useTheme,} from '@mui/material';
import { FaLock } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosAuth from '../../api/axiosAuthInstance';

function ChangePassword() {
  const theme = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mutation = useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmPassword }) => {
      const response = await axiosAuth.patch('/Account/ChangePassword', {
        OldPassword: currentPassword,
        NewPassword: newPassword,
        ConfirmNewPassword: confirmPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password changed successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    },
    onError: (error) => {
      let errorMsg = 'Change password failed.';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(' | ');
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 70px)',
        px: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pt: { xs: 4, sm: 5 }, 
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 500 }}>
         <Typography
          variant="h6"
          textAlign="center"
          fontWeight="medium"
          sx={{
            mb: 3,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            fontSize: '1rem',
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.04)',
            color: theme.palette.text.secondary,
            fontFamily: 'Montserrat, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          🔐 "Hackers hate a good password change, Make their day worse."
        </Typography>

        <Paper
          elevation={6}
          sx={{
            width: '100%',
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ fontFamily: 'Montserrat, sans-serif', mb: 3 }}
          >
            🔐 Change Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdPassword />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockPasswordFill />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={mutation.isLoading}
              sx={{
                mt: 4,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: 2,
                backgroundColor:
                  theme.palette.mode === 'dark' ? '#1A5A5F' : '#4ecdd5',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark' ? '#15494D' : '#3bbabe',
                },
              }}
            >
              {mutation.isLoading ? 'Saving...' : 'CHANGE PASSWORD'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default ChangePassword;


