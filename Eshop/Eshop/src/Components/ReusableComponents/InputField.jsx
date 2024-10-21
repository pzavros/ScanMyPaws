// src/Components/ReusableComponents/InputField.jsx
import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ label, variant = 'outlined', fullWidth = true, ...props }) => {
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      sx={{
        marginBottom: { xs: 2, sm: 3 },
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default InputField;
