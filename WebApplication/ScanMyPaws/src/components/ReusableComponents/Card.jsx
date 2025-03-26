import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Card = ({
  children,
  padding = '16px',
  elevation = 4, 
  header = null,
  footer = null,
  ...props
}) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        minHeight: '150px',
        width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' },
        backgroundColor: 'var(--card-background)',
        color: 'var(--text-color)',
        mb: 2,
        borderRadius: '16px',
        overflow: 'hidden', 
        transition: 'transform 0.2s ease, box-shadow 0.2s ease', 
        '&:hover': {
          transform: 'translateY(-4px)', 
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)', 
        },
      }}
      {...props}
    >
      {/* Optional Header */}
      {header && (
        <Box
          sx={{
            padding: '12px 16px',
            backgroundColor: 'var(--primary-color)',
            color: '#ffffff',
            borderBottom: '1px solid var(--input-border-color)',
          }}
        >
          <Typography variant="h6" component="div">
            {header}
          </Typography>
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          padding,
        }}
      >
        {children}
      </Box>

      {/* Optional Footer */}
      {footer && (
        <Box
          sx={{
            padding: '12px 16px',
            backgroundColor: 'var(--background-color)',
            borderTop: '1px solid var(--input-border-color)',
          }}
        >
          {footer}
        </Box>
      )}
    </Paper>
  );
};

export default Card;
