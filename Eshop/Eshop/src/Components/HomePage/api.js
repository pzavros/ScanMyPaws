import axios from 'axios';

// API URL
const API_BASE_URL = 'https://localhost:44330/api/QrCode';

export const generateQRCode = async () => {
  try {
    const response = await axios.post(API_BASE_URL, {});
    return response.data;
  } catch (error) {
    console.error('Error generating QR Code:', error);
    throw error;
  }
};

export const fetchQRCodeById = async (qrCodeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${qrCodeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching QR Code:', error);
    throw error;
  }
};
