import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '../ReusableComponents/Button';
import InputField from '../ReusableComponents/InputField';
import { generateQRCode, fetchQRCodeById } from './api';

const QRCodeManager = () => {
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [qrCodeId, setQrCodeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQRCode = async () => {
    setLoading(true);
    setError('');
    try {
      const qrCode = await generateQRCode();
      alert('QR Code ID: ' + qrCode.qrCodeID);
      setQrCodeImage(`data:image/png;base64,${qrCode.qrCodeImage}`);
    } catch (err) {
      setError('Error generating QR Code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchQRCode = async () => {
    if (!qrCodeId) {
      setError('Please enter a QR Code ID.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const qrCode = await fetchQRCodeById(qrCodeId);
      setQrCodeImage(`data:image/png;base64,${qrCode.qrCodeImage}`);
    } catch (err) {
      setError('QR Code not found. Please check the ID and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
        QR Code Manager
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <Button onClick={handleGenerateQRCode} disabled={loading}>
          {loading ? 'Generating...' : 'Generate New QR Code'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <InputField
          label="Enter QR Code ID"
          placeholder="e.g., 12345"
          value={qrCodeId}
          onChange={(e) => setQrCodeId(e.target.value)}
        />
        <Button onClick={handleFetchQRCode} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch QR Code'}
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

{qrCodeImage && (
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="h6">Generated QR Code</Typography>
          <img
            src={qrCodeImage}
            alt="Generated QR Code"
            style={{
              width: '200px',
              height: '200px',
              marginTop: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default QRCodeManager;
