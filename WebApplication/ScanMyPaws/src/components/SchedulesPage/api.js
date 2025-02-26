import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

/**
 * Decode JWT token to extract UserID.
 */
export const getUserIDFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
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
  try {
    const response = await axios.post(`${API_BASE_URL}/api/schedules`, scheduleData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating schedule:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing schedule.
 */
export const updateSchedule = async (scheduleData) => {
  if (!scheduleData || !scheduleData.scheduleID) {
    console.error("Error: Schedule ID is missing in update request", scheduleData);
    throw new Error("Schedule ID is required for update.");
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/schedules/${scheduleData.scheduleID}`,
      {
        scheduleDto: {
          scheduleID: scheduleData.scheduleID,
          userID: scheduleData.userID,
          title: scheduleData.title,
          date: scheduleData.date,
          time: scheduleData.time,
          description: scheduleData.description,
          isCompleted: scheduleData.isCompleted,
        },
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating schedule:", error.response?.data || error.message);
    throw error;
  }
};



/**
 * Delete a schedule.
 */
export const deleteSchedule = async (scheduleID) => {
  if (!scheduleID) {
    console.error("Error: Schedule ID is missing in delete request");
    throw new Error("Schedule ID is required for deletion.");
  }

  try {
    await axios.delete(`${API_BASE_URL}/api/schedules/${scheduleID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting schedule:", error.response?.data || error.message);
    throw error;
  }
};
