import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

/**
 * Fetch  pet data
 */
export const fetchPetData = async (petId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/api/petprofile/pet-stats/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { age, weight, size } = response.data;

    return {
      age,
      weight,
      size
    };
  } catch (error) {
    console.error("Failed to fetch pet data:", error);
    return null;
  }
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
    return response.data || [];
  } catch (error) {
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
    const response = await axios.get(`${API_BASE_URL}/api/schedules/user/${userId}/planner-highlights`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return response.data?.data || [];
  } catch (error) {
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
    return {};
  }
};


/**
 * Fetch user pets
 * @returns {Promise<Array>}
 */
export const fetchUserPets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetProfile/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data?.data || [];
  } catch (error) {
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
    throw error;
  }
};
