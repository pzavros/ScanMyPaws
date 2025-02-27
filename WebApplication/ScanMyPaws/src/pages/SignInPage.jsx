import React from "react";
import SignInForm from "../components/Authentication/SignInForm";
import Page from "../components/ReusableComponents/Page";
import Section from "../components/ReusableComponents/Section";
import Text from "../components/ReusableComponents/Text";

const SignInPage = () => {
  return (
    <Page>
      <SignInForm />
    </Page>
  );
};

export default SignInPage;
