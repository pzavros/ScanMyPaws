import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchUserPets } from "../components/MedicalRecordsPage/api";
import Page from "../components/ReusableComponents/Page";
import LoadingIndicator from "../components/ReusableComponents/LoadingIndicator";

const SelectPetPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPets = async () => {
      try {
        const userPets = await fetchUserPets();
        setPets(userPets);
        if (userPets.length === 1) {
          navigate(`/medical-records/${userPets[0].petID}`);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, []);

  const handlePetSelect = (petID) => {
    navigate(`/medical-records/${petID}`);
  };

  if (loading) {
    return (
      <Page>
        <LoadingIndicator message="Loading your pets..." />
      </Page>
    );
  }

  if (pets.length === 0) {
    return (
      <Page>
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography sx={{ color: "var(--text-color)" }}>
            No pets found. Please add a pet first.
          </Typography>
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 3,
            color: "var(--text-color)",
          }}
        >
          Select Your Pet
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {pets.map((pet) => (
            <Paper
              key={pet.petID}
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "12px",
                boxShadow:
                  "0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.1)",
                background: "var(--card-background)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "var(--text-color)",
                }}
              >
                {pet.petName}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handlePetSelect(pet.petID)}
                sx={{
                  background:
                    "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  padding: "6px 16px",
                  borderRadius: "50px",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
                  },
                }}
              >
                View Records
              </Button>
            </Paper>
          ))}
        </Box>
      </Box>
    </Page>
  );
};

export default SelectPetPage;
