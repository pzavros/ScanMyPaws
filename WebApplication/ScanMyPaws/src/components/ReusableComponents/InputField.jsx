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
          color: "var(--text-color)",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "var(--border-color)",
          },
          "&:hover fieldset": {
            borderColor: "var(--primary-color)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--primary-color)",
          },
        },
        input: {
          color: "var(--text-color)",
        },
      }}
      {...props}
    />
  );
};

export default InputField;
