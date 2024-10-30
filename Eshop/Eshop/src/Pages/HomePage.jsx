import axios from 'axios';
import React, { useState } from 'react';
import Section from '../Components/ReusableComponents/Section';
import Button from '../Components/ReusableComponents/Button';
import InputField from '../Components/ReusableComponents/InputField';
import Page from '../Components/ReusableComponents/Page';
import HeroSection from '../Components/HomePage/HeroSection';
import WhyScanMyPawsSection from '../Components/HomePage/WhyScanMyPawsSection';

const HomePage = () => {
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [qrCodeId, setQrCodeId] = useState('');

  const generateQRCode = async () => {
    try {
      const postResponse = await axios.post('https://localhost:44330/api/QrCode', {
        qrCodeData: "https://example.com/pet-profile"
      });

      if (postResponse.status === 200) {
        setQrCodeImage(`data:image/png;base64,${postResponse.data.qrCodeImage}`);
      } else {
        console.error("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const fetchQRCode = async () => {
    try {
      const getResponse = await axios.get(`https://localhost:44330/api/QrCode/${qrCodeId}`);
      if (getResponse.status === 200) {
        setQrCodeImage(`data:image/png;base64,${getResponse.data.qrCodeImage}`);
      } else {
        console.error("QR code not found");
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  return (
    <Page>
      <HeroSection />
      <Section>
        <WhyScanMyPawsSection />
      </Section>
      <Section>
        <Button onClick={generateQRCode}>Generate New QR Code</Button>
        <div style={{ marginTop: '20px' }}>
          <InputField 
            label="Enter QR Code ID" 
            value={qrCodeId} 
            onChange={(e) => setQrCodeId(e.target.value)} 
          />
          <Button onClick={fetchQRCode}>Go</Button>
        </div>
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
