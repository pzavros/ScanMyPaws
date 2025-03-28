import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Generate a QR Code
export const generateQRCode = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/QrCode`, {});
    return response.data;
  } catch (error) {
    console.error('Error generating QR Code:', error);
    throw error;
  }
};

// Function to create an order
export const createOrder = async (orderData) => {
  try {
    console.log('Sending order data:', JSON.stringify(orderData, null, 2));

    const response = await axios.post(`${API_BASE_URL}/Order`, orderData, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Response from backend:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

  

  

