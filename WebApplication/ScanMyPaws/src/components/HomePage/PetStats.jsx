import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchPetStats } from "./api";

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
      <Text variant="h6" mb={2}>Pet Statistics</Text>
      <Text variant="body1">Age: {stats.age}</Text>
      <Text variant="body1">Weight: {stats.weight}</Text>
      <Text variant="body1">Activity Level: {stats.activity}</Text>
    </Section>
  );
};

export default PetStats;
