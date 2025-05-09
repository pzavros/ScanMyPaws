import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Page from "../components/ReusableComponents/Page";
import LoadingIndicator from "../components/ReusableComponents/LoadingIndicator";
import { fetchPetDetails, updatePetDetails } from "../components/PetCardPage/api";
import PetCard from "../components/PetCardPage/PetCard";

const PetCardPage = () => {
  const { petId } = useParams();
  const location = useLocation();
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const isPublicView = location.pathname.startsWith("/public-petcard/");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchPetDetails(petId);
        console.log("Fetched pet details:", data);
        setPetDetails(data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [petId]);

  const handleSave = async (updatedDetails) => {
    if (isPublicView) return;
    try {
      const updatedData = await updatePetDetails(updatedDetails.petCardID, updatedDetails);
      setPetDetails(updatedData);
    } catch (error) {
      console.error("Error updating pet details:", error);
    }
  };

  if (loading) {
    return (
      <Page>
        <LoadingIndicator message="Loading pet details..." />
      </Page>
    );
  }

  return (
    <Page>
      <PetCard petDetails={petDetails} onSave={handleSave} readOnly={isPublicView} />
    </Page>
  );
};

export default PetCardPage;
