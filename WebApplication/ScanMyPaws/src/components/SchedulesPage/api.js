import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

/**
 * Decode JWT token to extract UserID.
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
 * Fetch schedules for the logged-in user.
 */
export const fetchSchedules = async () => {
  const userID = getUserIDFromToken();

  if (!userID) {
    console.error("User ID is missing. Please log in.");
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/schedules/user/${userID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return [];
  }
};

/**
 * Create a new schedule entry.
 */
export const createSchedule = async (scheduleData) => {
  const userID = getUserIDFromToken();
  if (!userID) {
    console.error("User ID is missing. Cannot create schedule.");
    throw new Error("User ID is missing.");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/schedules`,
      { ...scheduleData, userID }, // Ensure userID is included
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating schedule:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a schedule.
 */
export const deleteSchedule = async (scheduleID) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/schedules/${scheduleID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error deleting schedule:", error.response?.data || error.message);
    throw error;
  }
};
