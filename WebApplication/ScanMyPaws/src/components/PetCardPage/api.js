import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchPetDetails = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetCard/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pet details:", error);
    throw error;
  }
};

export const updatePetDetails = async (petId, petDetails) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/PetCard/${petId}`, petDetails);
    return response.data;
  } catch (error) {
    console.error("Error updating pet details:", error);
    throw error;
  }
};

export const fetchPublicPetCard = async (uniqueUrl) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetCard/public/${uniqueUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching public pet card:", error);
    throw error;
  }
};

// Create a PetCardSetting for a given pet (usually called during pet card creation)
export const createPetCardSetting = async (petId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/PetCardSetting/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating pet card setting:", error);
    throw error;
  }
};

// Fetch the PetCardSetting by PetId
export const fetchPetCardSetting = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetCardSetting/${petId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pet card setting:", error);
    throw error;
  }
};

// Update the PetCardSetting by its setting ID
export const updatePetCardSetting = async (petCardSettingId, settingData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/PetCardSetting/${petCardSettingId}`, settingData);
    return response.data;
  } catch (error) {
    console.error("Error updating pet card setting:", error);
    throw error;
  }
};

export const createChatSession = async (payload) => {
  console.log("Sending chat session request with payload:", payload);

  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat/session`, payload);
    console.log("API Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error creating chat session:", error.response?.data || error.message);
    throw error;
  }
};
