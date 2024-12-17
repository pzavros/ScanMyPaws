import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Section from "../ReusableComponents/Section";
import { fetchPetData } from "./api";

const ProfileHeader = () => {
  const [pet, setPet] = useState({});

  useEffect(() => {
    const loadPetData = async () => {
      const data = await fetchPetData();
      setPet(data);
    };

    loadPetData();
  }, []);

  return (
    <Section>
      <Box textAlign="center" mb={3}>
        <img
          src={pet.imageUrl || "https://via.placeholder.com/100"}
          alt={pet.name || "Loading"}
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            marginBottom: "8px",
          }}
        />
        <Text variant="h6">{pet.name || "Loading..."}</Text>
        <Text variant="body2" color="textSecondary">
          Age: {pet.age || "-"}, Breed: {pet.breed || "-"}, Gender: {pet.gender || "-"}
        </Text>
        <Button variant="outlined" color="secondary">
          View Profile
        </Button>
      </Box>
    </Section>
  );
};

export default ProfileHeader;
