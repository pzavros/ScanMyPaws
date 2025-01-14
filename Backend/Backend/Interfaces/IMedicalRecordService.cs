using Backend.DTOs;
using Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IMedicalRecordService
    {
        Task<MedicalRecordDto> CreateMedicalRecord(MedicalRecordDto medicalRecordDto);
        Task<MedicalRecordDto> UpdateMedicalRecord(int medicalRecordID, MedicalRecordDto updatedRecord);
        Task<MedicalRecordDto> GetMedicalRecordById(int medicalRecordID);
        Task<List<MedicalRecordDto>> GetMedicalRecordsByPetId(int petID);
        Task<bool> DeleteMedicalRecord(int medicalRecordID);
    }
}