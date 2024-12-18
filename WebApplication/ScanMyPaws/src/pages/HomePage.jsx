import React from "react";
import ProfileHeader from "../components/HomePage/ProfileHeader";
import UpcomingTasks from "../components/HomePage/UpcomingTasks";
import QuickActions from "../components/HomePage/QuickActions";
import RecentNotifications from "../components/HomePage/RecentNotifications";
import MedicalRecordsSummary from "../components/HomePage/MedicalRecordsSummary";
import PlannerHighlights from "../components/HomePage/PlannerHighlights";
import PetStats from "../components/HomePage/PetStats";
import AddPetButton from "../components/HomePage/AddPetButton";
import Page from "../components/ReusableComponents/Page";

const HomePage = () => {
  return (
    <Page>
      <ProfileHeader />
      <UpcomingTasks />
      <RecentNotifications />
      <MedicalRecordsSummary />
      <PlannerHighlights />
      <PetStats />
      <QuickActions />
      <AddPetButton />
    </Page>
  );
};

export default HomePage;
