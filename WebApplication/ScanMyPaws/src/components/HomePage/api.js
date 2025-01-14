// Updated components/HomePage/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchPetData = async () => {
  return {
    name: "Muffin",
    age: 3,
    breed: "Tabby",
    gender: "Male",
    imageUrl: "https://via.placeholder.com/100",
  };
};

export const fetchUpcomingTasks = async (petId) => {
  return [
    { title: "Vet Visit", description: `In 2 days for pet ${petId}` },
    { title: "Dental Care", description: "Due in 4 days" },
  ];
};

export const fetchQuickActions = async () => {
  return [
    { label: "Add Weight", icon: "Add" },
    { label: "Record Video", icon: "Add" },
    { label: "Add a Task", icon: "Add" },
  ];
};

export const fetchRecentNotifications = async (petId) => {
  return [
    { id: 1, title: `Vet Visit Reminder for pet ${petId}`, time: "1 hour ago" },
    { id: 2, title: "Weight Update Needed", time: "3 days ago" },
  ];
};

export const fetchMedicalRecords = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/MedicalRecord/pet/${petId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Medical Records Response:", response.data); // Debug log
    return response.data || [];
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return [];
  }
};


export const fetchPlannerHighlights = async (petId) => {
  return [
    { id: 1, title: `Grooming Appointment for pet ${petId}`, date: "June 10" },
    { id: 2, title: "Dental Cleaning", date: "June 15" },
  ];
};

export const fetchPetStats = async (petId) => {
  return { age: "3 Years", weight: "12 kg", activity: "High" };
};

export const fetchUserPets = async () => {
  console.log("fetchUserPets function invoked"); // Debug log
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetProfile/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("API Response:", response.data); // Debug log
    return response.data?.data || [];
  } catch (error) {
    console.error("Error in fetchUserPets:", error);
    return [];
  }
};


//delay
// export const fetchUserPets = async () => {
//   console.log("fetchUserPets function invoked"); // Debug log
//   try {
//     // Simulating a delay
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     const response = await axios.get(`${API_BASE_URL}/api/PetProfile/user`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     console.log("API Response:", response.data); // Debug log
//     return response.data?.data || [];
//   } catch (error) {
//     console.error("Error in fetchUserPets:", error);
//     return [];
//   }
// };
