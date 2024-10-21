// src/Components/ReusableComponents/Button.jsx
import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, variant = 'contained', color = 'primary', ...props }) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      sx={{
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        paddingX: { xs: 2, sm: 3, md: 4 }, 
        paddingY: { xs: 1, sm: 1.5 },
        fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' },
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
