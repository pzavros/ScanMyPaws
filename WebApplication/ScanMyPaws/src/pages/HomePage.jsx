import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import ProfileHeader from "../components/HomePage/ProfileHeader";
import UpcomingTasks from "../components/HomePage/UpcomingTasks";
import QuickActions from "../components/HomePage/QuickActions";
import RecentNotifications from "../components/HomePage/RecentNotifications";
import MedicalRecordsSummary from "../components/HomePage/MedicalRecordsSummary";
import PetStats from "../components/HomePage/PetStats";
import Page from "../components/ReusableComponents/Page";
import LoadingIndicator from "../components/ReusableComponents/LoadingIndicator";
import Button from "../components/ReusableComponents/Button";
import { fetchUserPets } from "../components/HomePage/api";

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const userPets = await fetchUserPets();
        setPets(userPets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, []);

  const handleNextPet = () => {
    setCurrentPetIndex((prevIndex) => (prevIndex + 1) % pets.length);
  };

  const handlePrevPet = () => {
    setCurrentPetIndex((prevIndex) =>
      (prevIndex - 1 + pets.length) % pets.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentPetIndex(index);
  };

  const currentPet = pets[currentPetIndex];

  if (loading) {
    return (
      <Page>
        <LoadingIndicator message="Loading pets..." />
      </Page>
    );
  }

  if (pets.length === 0) {
    return (
      <Page>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "stretch",
            justifyContent: "space-around",
            p: 4,
            mt: 8,
            gap: 4,
          }}
        >
          {/* Section 1: Purchase QR Code */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
              p: 2,
            }}
          >
            <Box
              component="img"
              src="/media/HomePage1.jpg" 
              alt="QR Code Illustration"
              sx={{ width: { xs: 200, md: 250 }, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Get Your QR Code
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              You haven't added any pets yet. Purchase a QR code from scanmypaws.com to register your pet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="https://scanmypaws.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Purchase QR Code
            </Button>
          </Box>

          {/* Section 2: Add Pet if QR is already owned */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
              p: 2,
              borderLeft: { md: "1px solid #ccc" },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Already have a QR Code?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              If you already received your QR code, click below to add your pet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/pets"
            >
              Add Your Pet
            </Button>
          </Box>
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      <ProfileHeader
        pet={currentPet}
        pets={pets}
        currentPetIndex={currentPetIndex}
        onNextPet={handleNextPet}
        onPrevPet={handlePrevPet}
        onDotClick={handleDotClick}
      />
      <UpcomingTasks petId={currentPet?.petID} />
      <RecentNotifications petId={currentPet?.petID} />
      <MedicalRecordsSummary petId={currentPet?.petID} />
      <PetStats petId={currentPet?.petID} />
    </Page>
  );
};

export default HomePage;
