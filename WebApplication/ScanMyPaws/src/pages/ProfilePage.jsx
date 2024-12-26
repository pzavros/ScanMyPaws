import React from "react";
import Page from "../components/ReusableComponents/Page";
import ProfileForm from "../components/ProfilePage/ProfileForm";
import Notifications from "../components/ProfilePage/Notifications";

const ProfilePage = () => {
  return (
    <Page style={{ padding: "32px 16px", maxWidth: "500px", margin: "0 auto" }}>
      <ProfileForm />
      <Notifications />
    </Page>
  );
};

export default ProfilePage;
