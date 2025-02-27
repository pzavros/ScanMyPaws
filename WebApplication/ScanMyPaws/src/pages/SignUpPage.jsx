import React from "react";
import SignUpForm from "../components/Authentication/SignUpForm";
import Page from "../components/ReusableComponents/Page";
import Section from "../components/ReusableComponents/Section";
import Text from "../components/ReusableComponents/Text";

const SignUpPage = () => {
  return (
    <Page>
      <SignUpForm />
    </Page>
  );
};

export default SignUpPage;
