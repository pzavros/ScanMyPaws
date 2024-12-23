import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ name, label, placeholder, value, onChange, ...props }) => {
  return (
    <TextField
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      InputLabelProps={{
        style: {
          color: "var(--text-color)", // Ensures the label color adapts to dark mode
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "var(--border-color)", // Adapt border color to theme
          },
          "&:hover fieldset": {
            borderColor: "var(--primary-color)", // Highlight border on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--primary-color)", // Highlight border on focus
          },
        },
        input: {
          color: "var(--text-color)", // Ensures the input text color adapts to dark mode
        },
      }}
      {...props}
    />
  );
};

export default InputField;
