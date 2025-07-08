import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Avatar,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const navItems = [
  { label: 'Info', path: 'info', icon: <InfoIcon /> },
  { label: 'Change Password', path: 'change-password', icon: <LockIcon /> },
  { label: 'Orders', path: 'orders', icon: <ShoppingCartIcon /> },
];

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDefault = location.pathname === '/profile';

  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:825px)');
  const showSidebar = !isSmallScreen || isDefault;

  const bgMain = theme.palette.background.default;
  const bgPaper = theme.palette.background.paper;
  const textPrimary = theme.palette.text.primary;
  const textSecondary = theme.palette.text.secondary;

  // ✅ نستخدم لون النافبار نفسه لأفاتار القائمة
  const navbarColor = theme.palette.mode === 'light' ? '#55cbd2' : '#044a4f';
  const navbarText = theme.palette.mode === 'light' ? '#002B5B' : '#ffffff';

  const hoverColor = navbarColor;

  return (
    <Box
      display="flex"
      minHeight="80vh"
      p={2}
      gap={2}
      flexDirection={isSmallScreen ? 'column' : 'row'}
      bgcolor={bgMain}
    >
      {/* Sidebar */}
      {showSidebar && (
        <Paper
          elevation={3}
          sx={{
            width: isSmallScreen ? '100%' : 260,
            borderRadius: 3,
            p: 2,
            bgcolor: bgPaper,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mb: 1,
                bgcolor: navbarColor,
                color: navbarText,
              }}
            >
              <InfoIcon fontSize="large" />
            </Avatar>
            <Typography variant="subtitle1" color={textPrimary}>
              Welcome!
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    '&.active': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: 2,
                    },
                    '&:hover': {
                      bgcolor: hoverColor,
                      color: 'white',
                      borderRadius: 2,
                    },
                  }}
                >
                  {item.icon}
                  <ListItemText primary={item.label} sx={{ ml: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 4,
              borderColor: 'error.main',
              color: 'error.main',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'error.main',
                color: '#fff',
              },
            }}
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
          >
            LOGOUT
          </Button>
        </Paper>
      )}

      {/* Main Content */}
      <Box flex={1}>
        {isSmallScreen && !isDefault && (
          <Box mb={2}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="text"
              onClick={() => navigate('/profile')}
            >
              Back to Menu
            </Button>
          </Box>
        )}

        {isDefault && !isSmallScreen && (
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            bgcolor={bgPaper}
            borderRadius={3}
            p={4}
            color={textPrimary}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              alt="Profile Welcome"
              style={{ width: 140, height: 140, marginBottom: 20 }}
            />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Welcome to your profile
            </Typography>
            <Typography
              variant="body1"
              color={textSecondary}
              align="center"
              maxWidth={420}
            >
              From here, you can manage your account info, change your password, and track your orders easily.
            </Typography>
          </Box>
        )}

        {(!isDefault || isSmallScreen) && <Outlet />}
      </Box>
    </Box>
  );
}

export default Profile;

