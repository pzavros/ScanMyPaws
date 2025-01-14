import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchUserPets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/PetProfile/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching user pets:", error);
    return [];
  }
};

export const fetchMedicalRecords = async (petID) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/MedicalRecord/pet/${petID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = response.data.map(record => ({
      ...record,
      id: record.medicalRecordID,
    }));
    return data;
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return [];
  }
};


export const createMedicalRecord = async (medicalRecordData) => {
  try {
    const payload = {
      petID: parseInt(medicalRecordData.petID, 10),
      typeID: parseInt(medicalRecordData.typeID, 10),
      date: medicalRecordData.date,
      nextDueDate: medicalRecordData.nextDueDate || null,
      description: medicalRecordData.description,
      notes: medicalRecordData.notes || null,
      vetClinicName: medicalRecordData.vetClinicName || null,
    };

    const response = await axios.post(`${API_BASE_URL}/api/MedicalRecord`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating medical record:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteMedicalRecord = async (medicalRecordID) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/MedicalRecord/${medicalRecordID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting medical record:", error);
    throw error;
  }
};
  

export const updateMedicalRecord = async (medicalRecordData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/MedicalRecord/${medicalRecordData.id}`,
      medicalRecordData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating medical record:", error);
    throw error;
  }
};
