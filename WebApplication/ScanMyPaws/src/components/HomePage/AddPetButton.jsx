import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddPetButton = () => {
  return (
    <Box
      position="fixed"
      bottom="20px"
      left="50%"
      style={{ transform: "translateX(-50%)" }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{
          borderRadius: "24px",
          padding: "8px 24px",
          fontSize: "1rem",
        }}
      >
        Add a Pet
      </Button>
    </Box>
  );
};

export default AddPetButton;
