import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Page from "../components/ReusableComponents/Page";
import MedicalRecordsHeader from "../components/MedicalRecordsPage/MedicalRecordsHeader";
import MedicalRecordsList from "../components/MedicalRecordsPage/MedicalRecordsList";
import MedicalRecordForm from "../components/MedicalRecordsPage/MedicalRecordForm";
import MedicalRecordDetail from "../components/MedicalRecordsPage/MedicalRecordDetail";
import { fetchMedicalRecords, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord } from "../components/MedicalRecordsPage/api";

const MedicalRecordsPage = () => {
  const { petID } = useParams();

  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editableRecord, setEditableRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
      if (!petID) {
        console.error("No petID provided. Skipping API call.");
        return;
      }
      setLoading(true);
      try {
        const data = await fetchMedicalRecords(petID);
        setRecords(data);
      } catch (error) {
        console.error("Error fetching medical records:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [petID]);

  const handleRecordSelect = (record) => {
    setSelectedRecord(record);
  };

  const handleBackToList = () => {
    setSelectedRecord(null);
  };

  const handleAddRecord = () => {
    setEditableRecord(null);
    setIsFormOpen(true);
  };

  const handleEditRecord = (record) => {
    setEditableRecord(record);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSaveRecord = async (record) => {
    try {
      if (record.id || record.medicalRecordId) {
        const updatedRecord = await updateMedicalRecord(record);
        setRecords((prev) =>
          prev.map((item) =>
            item.id === updatedRecord.id || item.medicalRecordId === updatedRecord.medicalRecordId
              ? updatedRecord
              : item
          )
        );
      } else {
        const newRecord = await createMedicalRecord(record);
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {
      console.error("Error saving record:", error);
    } finally {
      setIsFormOpen(false);
    }
  };

  const handleDeleteRecord = async (record) => {
    try {
      await deleteMedicalRecord(record.medicalRecordID);
      setRecords((prev) => prev.filter((item) => item.medicalRecordID !== record.medicalRecordID));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };


  return (
    <Page>
      {loading ? (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <CircularProgress />
          <Typography sx={{ marginTop: 2, color: "var(--text-color)" }}>
            Loading medical records...
          </Typography>
        </Box>
      ) : selectedRecord ? (
        <MedicalRecordDetail
          record={selectedRecord}
          onBack={handleBackToList}
        />
      ) : isFormOpen ? (
        <MedicalRecordForm
          petID={petID}
          onClose={handleFormClose}
          onSave={handleSaveRecord}
          editableRecord={editableRecord}
        />
      ) : (
        <>
          <MedicalRecordsList
            records={records}
            onRecordSelect={handleRecordSelect}
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddRecord}
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              background:
                "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
              color: "#fff",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
              },
            }}
          >
            <AddIcon />
          </Fab>
        </>
      )}
    </Page>
  );
};

export default MedicalRecordsPage;
