import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

/**
 * Get User ID from Token
 */
const getUserIDFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.UserID || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Fetch User Notifications
 */
export const fetchUserNotifications = async () => {
  const userID = getUserIDFromToken();
  if (!userID) {
    console.error("User ID is missing.");
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/notifications/${userID}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error.response?.data || error.message);
    return [];
  }
};

/**
 * Mark Notification as Read
 */
export const markNotificationAsRead = async (notificationID) => {
  try {
    await axios.put(`${API_BASE_URL}/api/notifications/read/${notificationID}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
    console.error("Error marking notification as read:", error.response?.data || error.message);
  }
};
