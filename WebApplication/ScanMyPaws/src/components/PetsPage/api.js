import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const scanQRCode = async (qrCodeId) => {
  const response = await axios.put(`${API_BASE_URL}/api/QrCode/scan/${qrCodeId}`);
  return response.data;
};

export const createPetProfile = async (formData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/PetProfile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  };
  

export const fetchPetProfile = async (petId) => {
  const response = await axios.get(`${API_BASE_URL}/api/PetProfile/${petId}`);
  return response.data;
};

// Fetch Dog Breeds
export const fetchDogBreeds = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/DogBreed`);
    return response.data;
  };
  
  
  export const fetchUserPets = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/PetProfile/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };