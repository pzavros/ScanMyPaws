  import React, { useState } from "react";
  import { Typography, Box } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import Page from "../components/ReusableComponents/Page";
  import Section from "../components/ReusableComponents/Section";
  import PetList from "../components/PetsPage/PetList";
  import QRCodeScanner from "../components/PetsPage/QRCodeScanner";
  import PetProfileForm from "../components/PetsPage/PetProfileForm";
  import Button from "../components/ReusableComponents/Button";

  const PetsPage = () => {
    const [view, setView] = useState("list");
    const [qrCodeId, setQrCodeId] = useState(null);
    const navigate = useNavigate();

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
      navigate(`/pets/${petId}`);
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
                <Button onClick={handleAddPet}>Add New Pet</Button>
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
            <Button onClick={handleBackToList}>Back to Pet List</Button>

            <PetProfileForm qrCodeId={qrCodeId} onSuccess={handleBackToList} />
          </>
        )}
      </Page>
    );
  };

  export default PetsPage;
