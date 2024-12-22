import React, { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Text from "../ReusableComponents/Text";
import Section from "../ReusableComponents/Section";
import { fetchQuickActions } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const QuickActions = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const loadActions = async () => {
      const data = await fetchQuickActions();
      setActions(data);
    };

    loadActions();
  }, []);

  return (
    <Section>
      <SectionTitle mb={2}>Quick Actions</SectionTitle>
      <Paper
        elevation={2}
        sx={{
          padding: "16px",
          borderRadius: "12px",
          backgroundColor: "var(--card-background)", // Consistent card background
          color: "var(--text-color)", // Adapt text color to theme
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2} // Add spacing between actions
        >
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                justifyContent: "flex-start",
                borderRadius: "8px",
                textTransform: "capitalize", // Make text more readable
                fontWeight: "bold",
                padding: "12px 16px",
                color: "var(--primary-color)", // Match primary theme color
                borderColor: "var(--primary-color)", // Match border with theme
                "&:hover": {
                  backgroundColor: "var(--primary-color)", // Subtle hover effect
                  color: "var(--button-background)",
                },
              }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </Paper>
    </Section>
  );
};

export default QuickActions;
