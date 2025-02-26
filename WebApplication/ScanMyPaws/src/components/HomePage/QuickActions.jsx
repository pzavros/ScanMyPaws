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
          backgroundColor: "var(--card-background)",
          color: "var(--text-color)",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2} 
        >
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                justifyContent: "flex-start",
                borderRadius: "8px",
                textTransform: "capitalize", 
                fontWeight: "bold",
                padding: "12px 16px",
                color: "var(--primary-color)", 
                borderColor: "var(--primary-color)", 
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
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
