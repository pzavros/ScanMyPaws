import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import Page from "../components/ReusableComponents/Page"; // Adjusted path
import Section from "../components/ReusableComponents/Section"; // Adjusted path
import PetList from "../components/PetsPage/PetList"; // Adjusted path
import QRCodeScanner from "../components/PetsPage/QRCodeScanner"; // Adjusted path
import PetProfileForm from "../components/PetsPage/PetProfileForm"; // Adjusted path
import PetDetails from "../components/PetsPage/PetDetails"; // Adjusted path

const PetsPage = () => {
  const [view, setView] = useState("list"); // "list", "scanner", "form", "details"
  const [selectedPet, setSelectedPet] = useState(null);
  const [qrCodeId, setQrCodeId] = useState(null);

  const handleAddPet = () => setView("scanner");

  const handleScanSuccess = (scannedCode) => {
    setQrCodeId(scannedCode);
    setView("form");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedPet(null);
    setQrCodeId(null);
  };

  return (
    <Page>
      {view === "list" && (
        <>
          <Section>
            <Typography variant="h4" sx={{ mb: 3 }}>
              My Pets
            </Typography>
            <Button
              variant="contained"
              onClick={handleAddPet}
              sx={{
                mb: 3,
                backgroundColor: "var(--primary-color)",
                "&:hover": { backgroundColor: "var(--secondary-color)" },
              }}
            >
              Add New Pet
            </Button>
          </Section>
          <PetList onViewDetails={(pet) => setSelectedPet(pet) || setView("details")} />
        </>
      )}

      {view === "scanner" && (
        <QRCodeScanner onScanSuccess={handleScanSuccess} onCancel={handleBackToList} />
      )}

      {view === "form" && (
        <>
          <Button onClick={handleBackToList} sx={{ mb: 2 }}>
            Back to Pet List
          </Button>
          <PetProfileForm qrCodeId={qrCodeId} onSuccess={handleBackToList} />
        </>
      )}

      {view === "details" && selectedPet && (
        <>
          <Button onClick={handleBackToList} sx={{ mb: 2 }}>
            Back to Pet List
          </Button>
          <PetDetails pet={selectedPet} />
        </>
      )}
    </Page>
  );
};

export default PetsPage;
