import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Section from "../ReusableComponents/Section";
import { fetchUserPets } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";
import Button from "../ReusableComponents/Button"; 
const PetList = () => {
  const [pets, setPets] = useState([]);
  const fetchCalled = useRef(false);
  const navigate = useNavigate();

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
      fetchCalled.current = true;
    }
  }, []);

  return (
    <Section>
      {pets.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "var(--text-color-secondary)", mt: 4 }}
        >
          No pets recorded for this user.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {pets.map((pet) => (
            <Grid
              item
              key={pet.petID}
              xs={12}
              sm={6}
              md={4} // 3 columns on desktops
            >
              <Paper
                elevation={2}
                sx={{
                  padding: "16px",
                  backgroundColor: "var(--card-background)",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                {pet.photo && (
                  <Box
                    sx={{
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%",
                      position: "relative",
                      borderRadius: "8px",
                      overflow: "hidden",
                      marginBottom: "16px",
                    }}
                  >
                    <Box
                      component="img"
                      src={`data:image/jpeg;base64,${pet.photo}`}
                      alt={pet.petName}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", 
                      }}
                    />
                  </Box>
                )}
                <SectionTitle variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                  {pet.petName}
                </SectionTitle>
                <Box sx={{ textAlign: "center" }}>
                  <Button onClick={() => navigate(`/pets/${pet.petID}`)}>
                    View Details
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Section>
  );
};

export default PetList;
