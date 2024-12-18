import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddPetButton = () => {
  return (
    <Box
      position="fixed"
      bottom="70px" // Move it slightly above the BottomNavbar
      left="50%"
      zIndex={1100} // Higher z-index to ensure it's on top
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
