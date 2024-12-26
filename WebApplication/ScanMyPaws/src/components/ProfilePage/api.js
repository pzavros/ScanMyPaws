import axios from "axios";

// Use the environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Helper: Authorization Header
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Fetch User Profile
export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/User/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Update User Profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/User/profile`, userData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Fetch User Notifications
export const fetchUserNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/User/notifications`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    throw error;
  }
};
