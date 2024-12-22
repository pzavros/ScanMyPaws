import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchPetStats } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const PetStats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchPetStats();
      setStats(data);
    };

    loadStats();
  }, []);

  return (
    <Section>
      <SectionTitle mb={2}>Pet Statistics</SectionTitle>
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px", // Add spacing between stats
          }}
        >
          <Text variant="body1" fontWeight="bold">
            Age: <span style={{ fontWeight: "normal" }}>{stats.age || "-"}</span>
          </Text>
          <Text variant="body1" fontWeight="bold">
            Weight: <span style={{ fontWeight: "normal" }}>{stats.weight || "-"}</span>
          </Text>
          <Text variant="body1" fontWeight="bold">
            Activity Level: <span style={{ fontWeight: "normal" }}>{stats.activity || "-"}</span>
          </Text>
        </Box>
      </Paper>
    </Section>
  );
};

export default PetStats;
