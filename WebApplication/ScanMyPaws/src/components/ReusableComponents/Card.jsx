import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Card = ({
  children,
  padding = '16px',
  elevation = 4, // Slightly higher default elevation for more depth
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
        borderRadius: '16px', // Increased roundness for a smoother look
        overflow: 'hidden', // Ensures child elements stay within the rounded corners
        transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Smooth transition for hover
        '&:hover': {
          transform: 'translateY(-4px)', // Subtle lift effect on hover
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)', // Stronger shadow on hover
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
