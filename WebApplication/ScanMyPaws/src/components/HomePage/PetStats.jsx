// Updated PetStats.js
import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchPetStats } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const PetStats = ({ petId }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      if (petId) {
        const data = await fetchPetStats(petId);
        setStats(data);
      }
    };

    loadStats();
  }, [petId]);

  return (
    <Section>
      <SectionTitle mb={2}>Pet Statistics</SectionTitle>
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
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
