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
        backgroundColor: 'var(--color-input-bg)',
        input: {
          color: 'var(--color-text)',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'var(--color-input-border)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--color-primary)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--color-primary)',
          },
        },
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default InputField;
