import React from "react";
import SignUpForm from "../components/Authentication/SignUpForm";
import Page from "../components/ReusableComponents/Page";
import Section from "../components/ReusableComponents/Section";
import Text from "../components/ReusableComponents/Text";

const SignUpPage = () => {
  return (
    <Page>
      <Section>
        <Text variant="h4" textAlign="center" mb={3}>
          Sign Up
        </Text>
      </Section>
      <SignUpForm />
    </Page>
  );
};

export default SignUpPage;
