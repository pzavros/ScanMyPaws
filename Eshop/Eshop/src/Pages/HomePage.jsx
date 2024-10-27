// src/Pages/HomePage.jsx
import React from 'react';
import Section from '../Components/ReusableComponents/Section';
import Container from '../Components/ReusableComponents/Container';
import Row from '../Components/ReusableComponents/Row';
import Card from '../Components/ReusableComponents/Card';
import Button from '../Components/ReusableComponents/Button';
import InputField from '../Components/ReusableComponents/InputField';
import Page from '../Components/ReusableComponents/Page';
import Text from '../Components/ReusableComponents/Text';
import HeroSection from '../Components/HomePage/HeroSection';
import WhyScanMyPawsSection from '../Components/HomePage/WhyScanMyPawsSection';

const HomePage = () => {
  return (
    <Page>
      <HeroSection />

      <Section>
      <WhyScanMyPawsSection />
      </Section>

      <Section backgroundColor="#e0e0e0">
        <Text variant="h5" gutterBottom>
          Subscribe to our newsletter
        </Text>
        <InputField label="Email Address" />
        <Button>Subscribe</Button>
      </Section>
    </Page>
  );
};

export default HomePage;
