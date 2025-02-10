import React from "react";
import Page from "../components/ReusableComponents/Page";
import SchedulesHeader from "../components/SchedulesPage/SchedulesHeader";
import SchedulesList from "../components/SchedulesPage/SchedulesList";

const SchedulesPage = () => {
  return (
    <Page>
      <SchedulesHeader />
      <SchedulesList />
    </Page>
  );
};

export default SchedulesPage;
