import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

/**
 * Fetch pet data (Mock)
 */
export const fetchPetData = async () => {
  return {
    name: "Muffin",
    age: 3,
    breed: "Tabby",
    gender: "Male",
    imageUrl: "https://via.placeholder.com/100",
  };
};

/**
 * Fetch upcoming tasks from schedules
 * @param {number} petId
 * @returns {Promise<Array>}
 */
export const fetchUpcomingTasks = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/schedules/user/${petId}/upcoming-tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching upcoming tasks:", error);
    return [];
  }
};

/**
 * Fetch quick actions (Mock Data)
 */
export const fetchQuickActions = async () => {
  return [
    { label: "Add Weight", icon: "Add" },
    { label: "Record Video", icon: "Add" },
    { label: "Add a Task", icon: "Add" },
  ];
};

/**
 * Fetch recent notifications for a user
 * @param {number} petId
 * @returns {Promise<Array>}
 */
export const fetchRecentNotifications = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/notifications/user/${petId}/recent`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching recent notifications:", error);
    return [];
  }
};

/**
 * Fetch upcoming notifications for a user
 * @param {number} petId
 * @returns {Promise<Array>}
 */
export const fetchUpcomingNotifications = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/notifications/user/${petId}/upcoming`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching upcoming notifications:", error);
    return [];
  }
};

/**
 * Fetch medical records for a pet
 * @param {number} petId
 * @returns {Promise<Array>}
 */
export const fetchMedicalRecords = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/MedicalRecord/pet/${petId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Medical Records Response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return [];
  }
};

/**
 * Fetch planner highlights for a pet
 * @param {number} petId
 * @returns {Promise<Array>}
 */
export const fetchPlannerHighlights = async (userId) => {
  try {
    console.log(`Fetching planner highlights for user: ${userId}`);
    const response = await axios.get(`${API_BASE_URL}/api/schedules/user/${userId}/planner-highlights`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log("Planner highlights response:", response.data);

    // Ensure we return the actual data array, not the whole object
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching planner highlights:", error.response?.data || error.message);
    return [];
  }
};



/**
 * Fetch pet statistics
 * @param {number} petId
 * @returns {Promise<Object>}
 */
export const fetchPetStats = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetProfile/pet-stats/${petId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data || {};
  } catch (error) {
    console.error("Error fetching pet stats:", error);
    return {};
  }
};


/**
 * Fetch user pets
 * @returns {Promise<Array>}
 */
export const fetchUserPets = async () => {
  console.log("fetchUserPets function invoked");
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetProfile/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("API Response:", response.data);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching user pets:", error);
    return [];
  }
};

/**
 * Mark a notification as read
 * @param {number} notificationId
 * @returns {Promise<void>}
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    await axios.put(`${API_BASE_URL}/api/notifications/read/${notificationId}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};
