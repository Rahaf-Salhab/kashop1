import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import pho3 from '../../assets/images/pho3.png';
import pho4 from '../../assets/images/pho4.png';

export default function Pictures() {
  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 6 } }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Apple Watch */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 648,
              minHeight: 335,
              borderRadius: 3,
              backgroundColor: '#3DD7E6',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              px: 4,
              py: 3,
              boxShadow: 3,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            {/* النص */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Apple Watch
              </Typography>
              <Typography variant="body1" gutterBottom>
                Stay on top of your day–Apple Watch, your perfect companion for health, fitness, and staying connected.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  width: 130,
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#eee',
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>

            {/* الصورة */}
            <Box
              component="img"
              src={pho3}
              alt="Apple Watch"
              sx={{
                width: 180,
                height: 'auto',
                mt: { xs: 3, sm: 0 },
                ml: { xs: 0, sm: 2 },
              }}
            />
          </Box>
        </Grid>

        {/* AirPods */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 648,
              minHeight: 335,
              borderRadius: 3,
              backgroundColor: '#3DD7E6',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, // أهم تعديل
              alignItems: 'center',
              px: 4,
              py: 3,
              boxShadow: 3,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            {/* النص */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                AirPods Pro 2
              </Typography>
              <Typography variant="body1" gutterBottom>
                Enjoy the freedom of real wireless audio for long hours and less charging. AirPods. The sound of innovation.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  width: 130,
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#eee',
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>

            {/* الصورة */}
            <Box
              component="img"
              src={pho4}
              alt="AirPods Pro"
              sx={{
                width: 180,
                height: 'auto',
                mt: { xs: 3, sm: 0 },
                ml: { xs: 0, sm: 2 },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}


