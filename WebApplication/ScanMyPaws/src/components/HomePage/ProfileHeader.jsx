import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Section from "../ReusableComponents/Section";
import SectionTitle from "../ReusableComponents/SectionTitle";

const ProfileHeader = ({ pet, pets = [], currentPetIndex, onDotClick }) => {
  const navigate = useNavigate();

  if (!pet) {
    return <div>Loading pets...</div>;
  }

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SectionTitle
          sx={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "var(--text-color)",
            textAlign: "center",
          }}
        >
          {pet.petName || "Unknown"}
        </SectionTitle>

        {pet.photo && (
          <img
            src={`data:image/jpeg;base64,${pet.photo}`}
            alt={pet.petName || "Pet"}
            style={{
              borderRadius: "50%",
              width: "120px",
              height: "120px",
              marginBottom: "16px",
              border: "3px solid var(--primary-color)",
            }}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/pets/${pet.petID}`)}
          sx={{
            borderRadius: "24px",
            padding: "8px 24px",
            fontSize: "1rem",
            textTransform: "capitalize",
            marginTop: "16px",
            "&:hover": {
              backgroundColor: "var(--button-hover-background)",
            },
          }}
        >
          View Profile
        </Button>

        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {pets.map((_, index) => (
            <Box
              key={index}
              onClick={() => onDotClick(index)}
              sx={{
                width: "10px",
                height: "10px",
                margin: "0 5px",
                borderRadius: "50%",
                backgroundColor: currentPetIndex === index ? "var(--primary-color)" : "gray",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>
    </Section>
  );
};

export default ProfileHeader;
