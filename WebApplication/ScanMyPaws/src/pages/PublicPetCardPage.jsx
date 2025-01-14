import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../components/ReusableComponents/LoadingIndicator";
import { fetchPublicPetCard } from "../components/PetCardPage/api";
import PetCard from "../components/PetCardPage/PetCard";

const PublicPetCardPage = () => {
  const { uniqueUrl } = useParams(); // Extract unique URL.
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
    </div>
  );
};

export default PublicPetCardPage;
