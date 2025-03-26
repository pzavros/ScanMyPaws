import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

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

export const fetchQuickActions = async () => {
  return [
    { label: "Add Weight", icon: "Add" },
    { label: "Record Video", icon: "Add" },
    { label: "Add a Task", icon: "Add" },
  ];
};

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
