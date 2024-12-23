import React, { useEffect, useState, useRef } from "react";
import { Box, Paper, Button } from "@mui/material";
import Section from "../ReusableComponents/Section";
import { fetchUserPets } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";
import Text from "../ReusableComponents/Text";

const PetList = ({ onViewDetails }) => {
  const [pets, setPets] = useState([]);
  const fetchCalled = useRef(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const userPets = await fetchUserPets();
        setPets(userPets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    if (!fetchCalled.current) {
      fetchPets();
      fetchCalled.current = true; // Mark fetch as called
    }
  }, []);

  return (
    <Section>
      {pets.map((pet) => (
        <Paper
          key={pet.petID}
          elevation={2}
          sx={{
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "var(--card-background)",
          }}
        >
          <SectionTitle variant="h6">{pet.petName}</SectionTitle>
          <Text>Breed: {pet.breed}</Text>
          <Text>Age: {pet.age}</Text>
          <Text>Sex: {pet.sex}</Text>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => onViewDetails(pet)}
          >
            View Details
          </Button>
        </Paper>
      ))}
    </Section>
  );
};

export default PetList;
