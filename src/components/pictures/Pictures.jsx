import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import pic20 from '../../assets/images/pic20.png';
import pic30 from '../../assets/images/pic30.png';
import pic40 from '../../assets/images/pic40.png';

export default function Pictures() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 6 },
      }}
    >
      <Grid container spacing={2} maxWidth="md">
        {/* العمود الأيسر */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} direction="column">
            {/* الصورة العلوية (كانت pic40، أصبحت pic30) */}
            <Grid item>
              <Box
                sx={{
                  backgroundImage: `url(${pic30})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  width: '100%',
                  height: 170,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  px: 3,
                  pb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="black">
                  AirPods Pro 2
                </Typography>
                <Typography variant="body2" color="black">
                  More hours, less charging
                </Typography>
              </Box>
            </Grid>

            {/* الصورة السفلية (كانت pic30، أصبحت pic40) */}
            <Grid item>
              <Box
                sx={{
                  backgroundImage: `url(${pic40})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  width: '100%',
                  height: 170,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  px: 3,
                  pt: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="black">
                  Hear it. Share it.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* الصورة الكبيرة على اليمين (pic20) */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundImage: `url(${pic20})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 2,
              width: '100%',
              height: 352,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              px: 3,
              pb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="white">
              Get Yours Now for <b>$250</b>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

