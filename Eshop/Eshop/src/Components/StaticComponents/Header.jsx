// src/Components/ReusableComponents/Header.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Select,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Translate from '../ReusableComponents/Translate'; // Import the Translate hook

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, changeLanguage, currentLanguage } = Translate();

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
        {['home', 'shop', 'profile', 'help'].map((key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton component={Link} to={`/${key}`}>
              <ListItemText primary={t(`menu.${key}`)} sx={{ color: 'var(--color-text)' }} />
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
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        mt: 2,
        transform: 'translateY(-10px)',
        zIndex: 1100,
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

          {/* Clickable Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src="/media/ScanMyPaws.png"
              alt="Logo"
              sx={{ height: 100, width: 100 }}
            />
          </Box>
        </Box>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button component={Link} to="/" sx={{ color: 'var(--color-text)' }}>
            {t('menu.home')}
          </Button>
          <Button component={Link} to="/shop" sx={{ color: 'var(--color-text)' }}>
            {t('menu.shop')}
          </Button>
          <Button component={Link} to="/profile" sx={{ color: 'var(--color-text)' }}>
            {t('menu.profile')}
          </Button>
          <Button component={Link} to="/help" sx={{ color: 'var(--color-text)' }}>
            {t('menu.help')}
          </Button>
        </Box>

        {/* Icon Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: 'var(--color-text)' }}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton sx={{ color: 'var(--color-text)' }}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton sx={{ color: 'var(--color-text)' }}>
            <ShoppingCartIcon />
          </IconButton>

          {/* Language Selection Dropdown */}
          <Select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            sx={{
              ml: 2,
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              borderRadius: '8px',
              '& .MuiSelect-icon': { color: 'var(--color-text)' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
            }}
          >
            <MenuItem value="en">
              <Box
                component="img"
                src="/media/Header/en.png"
                alt="English"
                sx={{ height: 24, width: 24, marginRight: 1 }}
              />
            </MenuItem>
            <MenuItem value="gr">
              <Box
                component="img"
                src="/media/Header/gr.png"
                alt="Greek"
                sx={{ height: 24, width: 24, marginRight: 1 }}
              />
            </MenuItem>
          </Select>
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
            borderTopRightRadius: '24px',
            borderBottomRightRadius: '24px',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            padding: 2,
          },
        }}
      >
        {/* Drawer Content */}
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
