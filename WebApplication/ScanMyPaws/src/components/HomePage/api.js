// components/HomePage/api.js

export const fetchPetData = async () => {
    return {
      name: "Muffin",
      age: 3,
      breed: "Tabby",
      gender: "Male",
      imageUrl: "https://via.placeholder.com/100",
    };
  };
  
  export const fetchUpcomingTasks = async () => {
    return [
      { title: "Vet Visit", description: "In 2 days" },
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
  

  // components/HomePage/api.js

// Mock API for notifications
export const fetchRecentNotifications = async () => {
  return [
    { id: 1, title: "Vet Visit Reminder", time: "1 hour ago" },
    { id: 2, title: "Weight Update Needed", time: "3 days ago" },
  ];
};

// Mock API for medical records
export const fetchMedicalRecords = async () => {
  return [
    { id: 1, type: "Vaccination", date: "2024-06-01", vet: "Dr. Smith" },
    { id: 2, type: "Checkup", date: "2024-05-15", vet: "Dr. Adams" },
  ];
};

// Mock API for planner highlights
export const fetchPlannerHighlights = async () => {
  return [
    { id: 1, title: "Grooming Appointment", date: "June 10" },
    { id: 2, title: "Dental Cleaning", date: "June 15" },
  ];
};

// Mock API for pet stats
export const fetchPetStats = async () => {
  return { age: "3 Years", weight: "12 kg", activity: "High" };
};
