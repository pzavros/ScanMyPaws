import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/ReusableComponents/Page";
import Section from "../components/ReusableComponents/Section";
import CardForm from "../components/CreatePetCardPage/CardForm";
import LoadingIndicator from "../components/ReusableComponents/LoadingIndicator";
import { fetchPetDetails } from "../components/CreatePetCardPage/api";

const CreatePetCardPage = () => {
  const { petId } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!petId) throw new Error("Pet ID is not defined");
        const data = await fetchPetDetails(petId);
        setPetDetails(data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [petId]);

  if (loading) {
    return (
      <Page>
        <LoadingIndicator message="Loading pet details..." />
      </Page>
    );
  }

  return (
    <Page>
      <Section>
        <CardForm petId={petId} petDetails={petDetails} />
      </Section>
    </Page>
  );
};

export default CreatePetCardPage;
