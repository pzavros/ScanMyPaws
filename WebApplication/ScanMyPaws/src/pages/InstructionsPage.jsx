import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Page from "../components/ReusableComponents/Page";
import Text from "../components/ReusableComponents/Text";
const InstructionsPage = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/signup");
  };

  return (
    <Page>
      <Text>Welcome to Scan My Paws</Text>
    </Page>
  );
};

export default InstructionsPage;
