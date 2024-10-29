import axios from 'axios';
import React, { useState } from 'react';
import Section from '../Components/ReusableComponents/Section';
import Button from '../Components/ReusableComponents/Button';
import Page from '../Components/ReusableComponents/Page';
import HeroSection from '../Components/HomePage/HeroSection';
import WhyScanMyPawsSection from '../Components/HomePage/WhyScanMyPawsSection';

const HomePage = () => {
  const [qrCodeImage, setQrCodeImage] = useState(null);

  const generateQRCode = async () => {
    try {
      const postResponse = await axios.post('https://localhost:44330/api/QrCode', {
        qrCodeData: "https://example.com/pet-profile"
      });

      if (postResponse.status === 200) {
        const qrCodeId = postResponse.data.qrCodeID;

        // Fetch the QR code image using the ID
        const getResponse = await axios.get(`https://localhost:44330/api/QrCode/${qrCodeId}`);
        if (getResponse.status === 200) {
          setQrCodeImage(`data:image/png;base64,${getResponse.data.qrCodeImage}`);
        } else {
          console.error("Failed to retrieve QR code image");
        }
      } else {
        console.error("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating or retrieving QR code:", error);
    }
  };

  return (
    <Page>
      <HeroSection />
      <Section>
        <WhyScanMyPawsSection />
      </Section>
      <Section>
        <Button onClick={generateQRCode}>Generate QR Code</Button>
        {qrCodeImage && (
          <div style={{ marginTop: '20px' }}>
            <img src={qrCodeImage} alt="Generated QR Code" />
          </div>
        )}
      </Section>
    </Page>
  );
};

export default HomePage;
