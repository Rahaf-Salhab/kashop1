import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ThemeContext } from '../../context/ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';
import logoImg from '../../assets/logo/logo.png';

const pagesGuest = ['Register', 'Login'];
const pagesAuth = ['Cart', 'Profile', 'Logout'];

function Navbar() {
  const { cartItems } = React.useContext(CartContext);
  const { mode, toggleTheme } = React.useContext(ThemeContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('userToken'));

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const logoFilter = mode === 'light' ? 'brightness(0.7)' : 'none';

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 3,
          backgroundColor: mode === 'light' ? '#55cbd2' : '#044a4f',
          color: mode === 'light' ? '#002B5B' : '#ffffff',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* الشعار */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: mode === 'light' ? '#002B5B' : '#ffffff',
                mr: 2,
              }}
            >
              <img
                src={logoImg}
                alt="KA Shop Logo"
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                  filter: logoFilter,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: mode === 'light' ? '#002B5B' : '#ffffff',
                }}
              >
                KA Store
              </Typography>
            </Box>

             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {(isLoggedIn ? pagesAuth : pagesGuest).map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    if (page === 'Logout') handleLogout();
                    else navigate(`/${page.toLowerCase()}`);
                  }}
                  sx={{
                    color: mode === 'light' ? '#002B5B' : '#ffffff',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    mx: 1,
                    '&:hover': {
                      backgroundColor: mode === 'light' ? '#ffffff44' : '#ffffff22',
                    },
                  }}
                >
                  {page === 'Cart' ? `Cart (${cartItems})` : page}
                </Button>
              ))}
            </Box>

            {/* قائمة الموبايل */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                size="large"
                aria-label="open main menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: mode === 'light' ? '#002B5B' : '#ffffff' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {(isLoggedIn ? pagesAuth : pagesGuest).map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page === 'Logout') handleLogout();
                      else navigate(`/${page.toLowerCase()}`);
                    }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ color: mode === 'light' ? '#002B5B' : '#ffffff' }}
                    >
                      {page === 'Cart' ? `Cart (${cartItems})` : page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* الوضع الليلي + الصورة الرمزية */}
            <Box sx={{ flexGrow: 0, ml: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleTheme} sx={{ mr: 1, color: '#ffffff' }}>
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate('/profile');
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

       <Box sx={{ height: '70px' }} />
    </>
  );
}

export default Navbar;




