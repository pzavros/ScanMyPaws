import React from "react";
import ProfileHeader from "../components/HomePage/ProfileHeader";
import UpcomingTasks from "../components/HomePage/UpcomingTasks";
import QuickActions from "../components/HomePage/QuickActions";
import AddPetButton from "../components/HomePage/AddPetButton";
import Page from "../components/ReusableComponents/Page";

const HomePage = () => {
  return (
    <Page>
      <ProfileHeader />
      <UpcomingTasks />
      <QuickActions />
      <AddPetButton />
    </Page>
  );
};

export default HomePage;
