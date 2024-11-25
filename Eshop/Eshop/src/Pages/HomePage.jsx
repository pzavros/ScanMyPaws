import axios from 'axios';
import React, { useState } from 'react';
import Section from '../Components/ReusableComponents/Section';
import Button from '../Components/ReusableComponents/Button';
import InputField from '../Components/ReusableComponents/InputField';
import Page from '../Components/ReusableComponents/Page';
import HeroSection from '../Components/HomePage/HeroSection';
import WhyScanMyPawsSection from '../Components/HomePage/WhyScanMyPawsSection';
import QRCodeManager from '../Components/HomePage/QRCodeManager';

const HomePage = () => {
  return (
    <Page>
      <HeroSection />
      <Section>
        <WhyScanMyPawsSection />
      </Section>
      <Section>
        <QRCodeManager />
      </Section>
    </Page>
  );
};

export default HomePage;
