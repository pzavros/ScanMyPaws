// src/Components/ReusableComponents/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{ width: 250, backgroundColor: 'var(--color-bg)', height: '100%' }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {['Home', 'Shop', 'Profile', 'Help'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemText primary={text} sx={{ color: 'var(--color-text)' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'var(--color-bg)',
        boxShadow: 'none',
        borderBottom: '1px solid var(--color-input-border)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: '1200px', mx: 'auto', width: '100%' }}>
        {/* Logo and Mobile Menu Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: 'var(--color-text)' }}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box component="img" src="/path/to/logo.png" alt="Logo" sx={{ height: 32, mr: 1 }} />
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'var(--color-text)' }}>
            Scan My Paws
          </Typography>
        </Box>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button component={Link} to="/" sx={{ color: 'var(--color-text)' }}>Home</Button>
          <Button component={Link} to="/shop" sx={{ color: 'var(--color-text)' }}>Shop</Button>
          <Button component={Link} to="/profile" sx={{ color: 'var(--color-text)' }}>Profile</Button>
          <Button component={Link} to="/help" sx={{ color: 'var(--color-text)' }}>Help</Button>
        </Box>

        {/* Icon Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: 'var(--color-text)' }}>
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ color: 'var(--color-text)' }}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton sx={{ color: 'var(--color-text)' }}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton sx={{ color: 'var(--color-text)' }}>
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
