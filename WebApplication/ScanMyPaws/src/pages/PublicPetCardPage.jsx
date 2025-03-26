import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../components/ReusableComponents/LoadingIndicator";
import { fetchPublicPetCard } from "../components/PetCardPage/api";
import PetCard from "../components/PetCardPage/PetCard";
import { Button, Box } from "@mui/material";
import StartChatModal from "../components/PetCardPage/StartChatModal";
import SendLocationModal from "../components/PetCardPage/SendLocationModal";

const PublicPetCardPage = () => {
  const { uniqueUrl } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openChatModal, setOpenChatModal] = useState(false);

  const [openLocationModal, setOpenLocationModal] = useState(false);

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

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 3,
          mb: 3,
          flexWrap: "wrap",
          px: 2,
        }}
      >
        {/* Start Chat Button */}
        <Button
          onClick={() => setOpenChatModal(true)}
          sx={{
            background: "linear-gradient(to right, #00c6ff, #0072ff)",
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 24px",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(0, 114, 255, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(to right, #0072ff, #00c6ff)",
              boxShadow: "0px 8px 16px rgba(0, 114, 255, 0.4)",
            },
          }}
        >
          Start Chat
        </Button>

        {/* Send Location Button */}
        <Button
          onClick={() => setOpenLocationModal(true)}
          sx={{
            background: "linear-gradient(to right, #ff6f61, #ff9478)",
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 24px",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(255, 111, 97, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(to right, #ff9478, #ff6f61)",
              boxShadow: "0px 8px 16px rgba(255, 111, 97, 0.4)",
            },
          }}
        >
          Send Location
        </Button>
      </Box>


      {/* Start Chat Modal */}
      <StartChatModal
        open={openChatModal}
        onClose={() => setOpenChatModal(false)}
        petId={petDetails?.petID}
      />

      {/* Send Location Modal */}
      <SendLocationModal
        open={openLocationModal}
        onClose={() => setOpenLocationModal(false)}
        petCardID={petDetails?.petCardID}
      />
    </div>
  );
};

export default PublicPetCardPage;
