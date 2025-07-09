import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuthInstance';
import {Box,Typography,CircularProgress,Avatar,useTheme,Fade,Divider,Stack,} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const fetchUserInfo = async () => {
  const { data } = await axiosAuth.get('/Account/userinfo');
  return data;
};

function Info() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });

  const theme = useTheme();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Typography color="error">⚠️ حدث خطأ أثناء جلب البيانات.</Typography>
      </Box>
    );
  }

  return (
    <Fade in timeout={600}>
      <Box
        px={{ xs: 2, sm: 4 }}
        py={5}
        bgcolor={theme.palette.background.default}
        minHeight="80vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {/* Header */}
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h4" fontWeight="bold">
          Welcome Back 
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          <EmojiEmotionsIcon
            fontSize="small"
            sx={{ verticalAlign: 'middle', mr: 0.5 }}
          />
          Here's everything we know about you
        </Typography>

        <Divider sx={{ width: '100%', maxWidth: 500, mb: 4 }} />

        <Stack spacing={3} width="100%" maxWidth={500}>
          <Box display="flex" alignItems="center">
            <PersonIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Username
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {data?.userName || 'غير متوفر'}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            <EmailIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {data?.email || 'غير متوفر'}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            <CakeIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Birthdate
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {data?.birthOfDate
                  ? new Date(data.birthOfDate).toLocaleDateString()
                  : 'غير متوفر'}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            <WcIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Gender
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {data?.gender || 'غير متوفر'}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Fade>
  );
}

export default Info;


