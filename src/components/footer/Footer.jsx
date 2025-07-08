import React from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Link as MuiLink,
  useTheme,
  IconButton,
} from '@mui/material';
import {
  Instagram,
  Pinterest,
  Twitter,
  Email,
  AccessTime,
  LocationOn,
} from '@mui/icons-material';

function Footer() {
  const theme = useTheme();
  const textColor = theme.palette.common.white;
  const iconColor = '#4ecdd5';

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#111',
        color: textColor,
        mt: 10,
        px: { xs: 2, sm: 3 },
        pt: 4,
        pb: 2,
        fontFamily: 'monospace',
      }}
    >
      <Container maxWidth="lg">
        {/* الأقسام الرئيسية */}
        <Grid container spacing={4} justifyContent="space-between">
          {/* Follow Us */}
          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 200 }}>
            <Typography fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex" gap={1.5} mt={1}>
              {[Instagram, Pinterest, Twitter, Email].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    border: `1px solid ${iconColor}`,
                    color: iconColor,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: iconColor,
                      color: '#111',
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Our Product */}
          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 200 }}>
            <Typography fontWeight="bold" gutterBottom>
              Our Product
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5}>
              {[
                'Laptops',
                'Mobile',
                'Beauty & Personal Care',
                'Books & Stationery',
                'Sports & Outdoors',
              ].map((item) => (
                <MuiLink
                  key={item}
                  underline="none"
                  sx={{
                    color: textColor,
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    '&:hover': { color: iconColor },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 200 }}>
            <Typography fontWeight="bold" gutterBottom>
              Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5}>
              {['Terms & Conditions', 'Privacy Policy', 'Refund Policy'].map(
                (item) => (
                  <MuiLink
                    key={item}
                    underline="none"
                    sx={{
                      color: textColor,
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      '&:hover': { color: iconColor },
                    }}
                  >
                    {item}
                  </MuiLink>
                )
              )}
            </Box>
          </Grid>

          {/* Site Pages */}
          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 200 }}>
            <Typography fontWeight="bold" gutterBottom>
              Site Pages
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5}>
              {['Homepage', 'About KA Store'].map((item) => (
                <MuiLink
                  key={item}
                  underline="none"
                  sx={{
                    color: textColor,
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    '&:hover': { color: iconColor },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ bgcolor: '#444', my: 3 }} />

        {/* Bottom bar */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: 'center', sm: 'left' }}
          gap={2}
        >
          {/* ساعات العمل */}
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime sx={{ fontSize: 18, color: '#aaa' }} />
            <Typography variant="body2" color="#ccc">
              Sunday to Thursday
              <Box component="span" ml={1} fontWeight="bold">
                09 AM — 07 PM
              </Box>
            </Typography>
          </Box>

          {/* أيقونات إضافية */}
          <Box display="flex" gap={2} alignItems="center">
            <Email sx={{ fontSize: 18, color: '#aaa' }} />
            <LocationOn sx={{ fontSize: 18, color: '#aaa' }} />
          </Box>

          {/* الحقوق */}
          <Typography variant="body2" color="#aaa">
            KA Store © {new Date().getFullYear()} | All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;


