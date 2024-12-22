import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Section from "../ReusableComponents/Section";
import { fetchPetData } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

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
      <Box
        textAlign="center"
        mb={4}
        sx={{
          padding: "16px",
          backgroundColor: "var(--card-background)",
          borderRadius: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Pet Image */}
        <img
          src={pet.imageUrl || "https://via.placeholder.com/150"}
          alt={pet.name || "Loading"}
          style={{
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            marginBottom: "16px",
            border: "3px solid var(--primary-color)", // Add border color
          }}
        />

        {/* Pet Name */}
        <SectionTitle
          sx={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "var(--text-color)",
          }}
        >
          {pet.name || "Loading..."}
        </SectionTitle>

        {/* Pet Details */}
        <Text
          variant="body1"
          sx={{
            color: "var(--text-color)",
            marginBottom: "16px",
            fontSize: "1rem",
          }}
        >
          Age: {pet.age || "-"}, Breed: {pet.breed || "-"}, Gender:{" "}
          {pet.gender || "-"}
        </Text>

        {/* View Profile Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "24px",
            padding: "8px 24px",
            fontSize: "1rem",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "var(--button-hover-background)",
            },
          }}
        >
          View Profile
        </Button>
      </Box>
    </Section>
  );
};

export default ProfileHeader;
