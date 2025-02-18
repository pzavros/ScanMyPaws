import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Section from "../ReusableComponents/Section";
import { fetchPetStats } from "./api"; // ✅ Correct import
import SectionTitle from "../ReusableComponents/SectionTitle";

const PetStats = ({ petId }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      if (petId) {
        const data = await fetchPetStats(petId); // ✅ Ensure it calls the correct function
        setStats(data);
      }
    };
    loadStats();
  }, [petId]);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Pet Stats</SectionTitle>
        {stats ? (
          <>
            <Text variant="body1">Age: {stats.age}</Text>
            <Text variant="body1">Weight: {stats.weight}</Text>
            <Text variant="body1">Activity Level: {stats.activity}</Text>
          </>
        ) : (
          <Text>No stats available.</Text>
        )}
      </Box>
    </Section>
  );
};

export default PetStats;
