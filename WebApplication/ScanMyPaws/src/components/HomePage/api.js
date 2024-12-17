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
  