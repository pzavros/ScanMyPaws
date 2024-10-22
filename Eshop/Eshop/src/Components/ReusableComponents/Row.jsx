// src/Components/ReusableComponents/Row.jsx
import React from 'react';
import { Box } from '@mui/material';

const Row = ({ children, gap = 2, alignItems = 'center', justifyContent = 'space-between', ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: 1, sm: 2, md: gap },
        alignItems,
        justifyContent,
        flexWrap: 'wrap',
        width: '100%',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Row;
