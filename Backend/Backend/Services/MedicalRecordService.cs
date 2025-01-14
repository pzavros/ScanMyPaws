using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class MedicalRecordService : IMedicalRecordService
    {
        private readonly ApplicationDbContext _context;

        public MedicalRecordService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MedicalRecordDto> CreateMedicalRecord(MedicalRecordDto medicalRecordDto)
        {
            // Validate related entities
            var petExists = await _context.PetProfiles.AnyAsync(p => p.PetID == medicalRecordDto.PetID);
            if (!petExists)
                throw new Exception($"PetProfile with ID {medicalRecordDto.PetID} does not exist.");

            var typeExists = await _context.MedicalRecordTypes.AnyAsync(t => t.TypeID == medicalRecordDto.TypeID);
            if (!typeExists)
                throw new Exception($"MedicalRecordType with ID {medicalRecordDto.TypeID} does not exist.");

            // Map DTO to Model
            var medicalRecord = new MedicalRecord
            {
                PetID = medicalRecordDto.PetID,
                TypeID = medicalRecordDto.TypeID,
                Date = medicalRecordDto.Date,
                NextDueDate = medicalRecordDto.NextDueDate,
                Description = medicalRecordDto.Description,
                Notes = medicalRecordDto.Notes,
                VetClinicName = medicalRecordDto.VetClinicName,
                DateCreated = DateTime.Now
            };

            _context.MedicalRecords.Add(medicalRecord);
            await _context.SaveChangesAsync();

            medicalRecordDto.PetID = medicalRecord.PetID; // Return updated ID
            return medicalRecordDto;
        }

        public async Task<MedicalRecordDto> UpdateMedicalRecord(int medicalRecordID, MedicalRecordDto updatedRecord)
        {
            var existingRecord = await _context.MedicalRecords.FindAsync(medicalRecordID);

            if (existingRecord == null)
                throw new Exception("Medical record not found.");

            // Update the existing record with the new data
            existingRecord.TypeID = updatedRecord.TypeID;
            existingRecord.Date = updatedRecord.Date;
            existingRecord.NextDueDate = updatedRecord.NextDueDate;
            existingRecord.Description = updatedRecord.Description;
            existingRecord.Notes = updatedRecord.Notes;
            existingRecord.VetClinicName = updatedRecord.VetClinicName;
            existingRecord.DateModified = DateTime.Now;

            await _context.SaveChangesAsync();

            // Fetch the updated TypeName
            var typeName = await _context.MedicalRecordTypes
                .Where(t => t.TypeID == updatedRecord.TypeID)
                .Select(t => t.TypeName)
                .FirstOrDefaultAsync();

            // Return the updated DTO with the Type field
            return new MedicalRecordDto
            {
                MedicalRecordID = existingRecord.MedicalRecordID,
                PetID = existingRecord.PetID,
                TypeID = existingRecord.TypeID,
                Type = typeName,
                Date = existingRecord.Date,
                NextDueDate = existingRecord.NextDueDate,
                Description = existingRecord.Description,
                Notes = existingRecord.Notes,
                VetClinicName = existingRecord.VetClinicName
            };
        }


        public async Task<MedicalRecordDto> GetMedicalRecordById(int medicalRecordID)
        {
            var record = await _context.MedicalRecords
                .Include(m => m.MedicalRecordType)
                .Include(m => m.PetProfile)
                .FirstOrDefaultAsync(m => m.MedicalRecordID == medicalRecordID);

            if (record == null)
                return null;

            return new MedicalRecordDto
            {
                MedicalRecordID = record.MedicalRecordID,
                PetID = record.PetID,
                TypeID = record.TypeID,
                Type = record.MedicalRecordType.TypeName,
                Date = record.Date,
                NextDueDate = record.NextDueDate,
                Description = record.Description,
                Notes = record.Notes,
                VetClinicName = record.VetClinicName
            };
        }

        public async Task<List<MedicalRecordDto>> GetMedicalRecordsByPetId(int petID)
        {
            var records = await _context.MedicalRecords
                .Where(m => m.PetID == petID && !m.IsDeleted)
                .Include(m => m.MedicalRecordType)
                .ToListAsync();

            return records.Select(record => new MedicalRecordDto
            {
                MedicalRecordID = record.MedicalRecordID,
                PetID = record.PetID,
                TypeID = record.TypeID,
                Type = record.MedicalRecordType.TypeName,
                Date = record.Date,
                NextDueDate = record.NextDueDate,
                Description = record.Description,
                Notes = record.Notes,
                VetClinicName = record.VetClinicName
            }).ToList();
        }

        public async Task<bool> DeleteMedicalRecord(int medicalRecordID)
        {
            var record = await _context.MedicalRecords.FindAsync(medicalRecordID);

            if (record == null)
                return false;

            record.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
