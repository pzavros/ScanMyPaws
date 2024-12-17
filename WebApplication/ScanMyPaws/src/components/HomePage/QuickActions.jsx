import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Text from "../ReusableComponents/Text";
import Section from "../ReusableComponents/Section";
import { fetchQuickActions } from "./api";

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
      <Box mb={3}>
        <Text variant="h6" mb={1}>
          Quick Actions
        </Text>
        <Box display="flex" flexDirection="column" gap={1}>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="text"
              startIcon={<AddIcon />}
              style={{ justifyContent: "flex-start" }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Section>
  );
};

export default QuickActions;
