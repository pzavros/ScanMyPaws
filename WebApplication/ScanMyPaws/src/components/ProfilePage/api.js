import axios from "axios";

const API_BASE_URL = "https://localhost:44330/api/User";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/profile`, userData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const fetchUserNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    throw error;
  }
};
