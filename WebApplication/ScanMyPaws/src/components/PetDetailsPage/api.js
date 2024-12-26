import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchPetDetails = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetProfile/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pet details:", error);
    throw error;
  }
};

export const updatePetDetails = async (petId, petDetails) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/PetProfile/${petId}`, petDetails);
      return response.data;
    } catch (error) {
      console.error("Error updating pet details:", error);
      throw error;
    }
  };
  

// Fetch Dog Breeds
export const fetchDogBreeds = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/DogBreed`);
    return response.data;
  };