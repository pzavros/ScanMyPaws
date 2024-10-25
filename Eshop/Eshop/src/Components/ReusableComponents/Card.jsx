// src/Components/ReusableComponents/Card.jsx
import React from 'react';
import { Box, Paper } from '@mui/material';

const Card = ({ children, padding = '16px', elevation = 2, ...props }) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        minHeight: '150px',
        width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' }, 
        backgroundColor: 'var(--card-background)',
        color: 'var(--text-color)',
        mb: 2,
      }}
      {...props}
    >
      <Box
        sx={{
          padding,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default Card;
