import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, variant = 'contained', ...props }) => {
  return (
    <MuiButton
      variant={variant}
      sx={{
        background:
          "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
        color: "#fff",
        textTransform: "none",
        fontWeight: "bold",
        padding: "6px 16px",
        borderRadius: "50px",
        "&:hover": {
          background:
            "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
        },
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
