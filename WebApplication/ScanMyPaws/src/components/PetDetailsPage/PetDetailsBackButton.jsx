import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PetDetailsBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/pets")}
      sx={{
        mb: 2,
        backgroundColor: "var(--primary-color)",
        "&:hover": { backgroundColor: "var(--secondary-color)" },
      }}
    >
      Back to Pet List
    </Button>
  );
};

export default PetDetailsBackButton;
