import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchPetDetails = async (petId) => {
    if (!petId) {
      throw new Error("petId is required");
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}/api/PetProfile/${petId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  export const createPetCard = async (petCardData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/PetCard`,
        petCardData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  
  
  
