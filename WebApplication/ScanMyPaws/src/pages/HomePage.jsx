// Updated HomePage.js
import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/HomePage/ProfileHeader";
import UpcomingTasks from "../components/HomePage/UpcomingTasks";
import QuickActions from "../components/HomePage/QuickActions";
import RecentNotifications from "../components/HomePage/RecentNotifications";
import MedicalRecordsSummary from "../components/HomePage/MedicalRecordsSummary";
import PlannerHighlights from "../components/HomePage/PlannerHighlights";
import PetStats from "../components/HomePage/PetStats";
import Page from "../components/ReusableComponents/Page";
import LoadingIndicator from "../components/ReusableComponents/LoadingIndicator";
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
        <div>No pets available. Please add a pet.</div>
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
      <PlannerHighlights petId={currentPet?.petID} />
      <PetStats petId={currentPet?.petID} />
      <QuickActions petId={currentPet?.petID} />
    </Page>
  );
};

export default HomePage;
