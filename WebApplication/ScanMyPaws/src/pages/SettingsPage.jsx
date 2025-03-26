import React from "react";
import Page from "../components/ReusableComponents/Page";
import ThemeToggle from "../components/SettingsPage/ThemeToggle";
import NotificationSettings from "../components/SettingsPage/NotificationSettings";
import LanguageSettings from "../components/SettingsPage/LanguageSettings";
import PrivacySettings from "../components/SettingsPage/PrivacySettings";

const SettingsPage = () => {
  return (
    <Page title="Settings">
      <ThemeToggle />
      <NotificationSettings />
      <LanguageSettings />
      <PrivacySettings />
    </Page>
  );
};

export default SettingsPage;
