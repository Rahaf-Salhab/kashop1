import React from 'react';
import { Box, Typography, useTheme, Button, useMediaQuery } from '@mui/material';
import music from '../../assets/images/music.png';
import pic9 from '../../assets/images/pic9.png';
import pic11 from '../../assets/images/pic11.png';

function HeroSection() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mt: 4, overflowX: 'hidden' }}> {/* يمنع التمرير الأفقي */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        {/* يسار */}
        <Box
          sx={{
            flex: 1.2,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            height: { md: 400 },
          }}
        >
          <Box
            component="img"
            src={pic9}
            alt="Left image"
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '16px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          />
        </Box>

        {/* البانر */}
        <Box
          sx={{
            flex: 6,
            background: isDarkMode
              ? 'linear-gradient(to right, #03363D, #044a4f)'
              : 'linear-gradient(to right, #55CBD2, #A0E6E8)',
            px: { xs: 2, sm: 3, md: 6 },
            py: { xs: 4, md: 6 },
            mx: { md: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 3 },
            borderRadius: { xs: 0, md: '16px' },
            textAlign: { xs: 'center', md: 'start' },
            minHeight: { xs: 300, sm: 350, md: 400 },
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* النصوص */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#fff',
                px: 2,
                py: 0.5,
                borderRadius: 20,
                display: 'inline-block',
                mb: 2,
                color: '#002B5B',
              }}
            >
              30% OFF
            </Typography>

            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              fontWeight="bold"
              gutterBottom
              sx={{ color: isDarkMode ? '#fff' : '#002B5B' }}
            >
              Feel Every Beat. <br /> Hear the Difference.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? '#cceeff' : '#003C57',
                mb: 3,
              }}
            >
              Experience immersive sound with our premium speaker collection
            </Typography>

            <Button
              variant="contained"
              aria-label="Buy speakers now"
              sx={{
                backgroundColor: '#fff',
                color: '#002B5B',
                borderRadius: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: 2,
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Buy now
            </Button>
          </Box>

          {/* صورة السماعة */}
          <Box
            component="img"
            src={music}
            alt="Speakers"
            loading="lazy"
            sx={{
              width: { xs: '90%', sm: '80%', md: 280 },
              maxWidth: 340,
              height: 'auto',
              borderRadius: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          />
        </Box>

        {/* يمين */}
        <Box
          sx={{
            flex: 1.2,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            height: { md: 400 },
          }}
        >
          <Box
            component="img"
            src={pic11}
            alt="Right image"
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '16px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
