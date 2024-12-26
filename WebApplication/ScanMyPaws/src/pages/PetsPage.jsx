import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Page from "../components/ReusableComponents/Page"; // Adjusted path
import Section from "../components/ReusableComponents/Section"; // Adjusted path
import PetList from "../components/PetsPage/PetList"; // Adjusted path
import QRCodeScanner from "../components/PetsPage/QRCodeScanner"; // Adjusted path
import PetProfileForm from "../components/PetsPage/PetProfileForm"; // Adjusted path
import Button from "../components/ReusableComponents/Button"; // Import reusable Button

const PetsPage = () => {
  const [view, setView] = useState("list"); // "list", "scanner", "form"
  const [qrCodeId, setQrCodeId] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleAddPet = () => setView("scanner");

  const handleScanSuccess = (scannedCode) => {
    setQrCodeId(scannedCode);
    setView("form");
  };

  const handleBackToList = () => {
    setView("list");
    setQrCodeId(null);
  };

  const handleViewDetails = (petId) => {
    navigate(`/pets/${petId}`); // Navigate to PetDetailsPage with the petId
  };

  return (
    <Page>
      {view === "list" && (
        <>
          <Section>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "var(--text-color-primary)",
                }}
              >
                My Pets
              </Typography>
              <Button
                onClick={handleAddPet}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  borderRadius: "24px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": { backgroundColor: "var(--secondary-color)" },
                }}
              >
                Add New Pet
              </Button>
            </Box>
          </Section>
          <PetList onViewDetails={handleViewDetails} />
        </>
      )}

      {view === "scanner" && (
        <QRCodeScanner onScanSuccess={handleScanSuccess} onCancel={handleBackToList} />
      )}

      {view === "form" && (
        <>
          <Button
            onClick={handleBackToList}
            sx={{
              mb: 2,
              backgroundColor: "var(--primary-color)",
              color: "white",
              borderRadius: "24px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              "&:hover": { backgroundColor: "var(--primary-color-hover)" },
            }}
          >
            Back to Pet List
          </Button>
          <PetProfileForm qrCodeId={qrCodeId} onSuccess={handleBackToList} />
        </>
      )}
    </Page>
  );
};

export default PetsPage;
