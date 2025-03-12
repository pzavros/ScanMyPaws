import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../components/ReusableComponents/LoadingIndicator";
import { fetchPublicPetCard } from "../components/PetCardPage/api";
import PetCard from "../components/PetCardPage/PetCard";
import { Button, Box } from "@mui/material";
import StartChatModal from "../components/PetCardPage/StartChatModal";

const PublicPetCardPage = () => {
  const { uniqueUrl } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openChatModal, setOpenChatModal] = useState(false); 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchPublicPetCard(uniqueUrl);
        setPetDetails(data);
      } catch (error) {
        console.error("Error fetching public pet card details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [uniqueUrl]);

  if (loading) {
    return (
      <div>
        <LoadingIndicator message="Loading pet card details..." />
      </div>
    );
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <PetCard petDetails={petDetails} readOnly />
      
      {/* "Start Chat" button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenChatModal(true)}
          sx={{
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
          }}
        >
          Start Chat
        </Button>
      </Box>

      {/* Start Chat Modal */}
      <StartChatModal
        open={openChatModal}
        onClose={() => setOpenChatModal(false)}
        petId={petDetails?.petID} // Send pet ID for chat initiation
      />
    </div>
  );
};

export default PublicPetCardPage;
