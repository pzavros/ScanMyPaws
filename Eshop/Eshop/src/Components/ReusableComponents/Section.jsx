// src/Components/ReusableComponents/Section.jsx
import React from 'react';
import { Box } from '@mui/material';

const Section = ({
  children,
  backgroundColor = 'var(--color-bg)',
  padding = '32px 16px',
  ...props
}) => {
  return (
    <Box
      sx={{
        backgroundColor,
        width: '100%',
        py: { xs: 2, sm: 4, md: 6 },
        ...props.sx,
      }}
      {...props}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Section;
