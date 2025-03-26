import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchPetLocationHistory = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetLocation/history/${petId}`);
    return response.data;
  } catch (error) {
    return [];
  }
};
