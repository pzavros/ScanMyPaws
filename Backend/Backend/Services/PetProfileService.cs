using Backend.Interfaces;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class PetProfileService : IPetProfileService
    {
        private readonly ApplicationDbContext _context;

        public PetProfileService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PetProfileDto> CreatePetProfile(PetProfileDto petProfileDto, int userId)
        {
            // Validate that the UserID exists
            var userExists = await _context.Users.AnyAsync(u => u.UserID == userId);
            if (!userExists)
                throw new Exception("User does not exist.");

            // Validate that the QRCodeID exists
            var qrCodeExists = await _context.QRCodes.AnyAsync(q => q.QRCodeID == petProfileDto.QRCodeID);
            if (!qrCodeExists)
                throw new Exception("QR Code does not exist.");

            var petProfile = new PetProfile
            {
                DateCreated = DateTime.Now,
                UserID = userId,
                PetName = petProfileDto.PetName,
                BreedID = petProfileDto.BreedID,
                Age = petProfileDto.Age,
                IsTransferred = petProfileDto.IsTransferred,
                IsActive = true,
                IsDeleted = false,
                QRCodeID = petProfileDto.QRCodeID,
                Sex = petProfileDto.Sex,
                Photo = petProfileDto.Photo,
                SpecialNotes = petProfileDto.SpecialNotes,
            };

            _context.PetProfiles.Add(petProfile);
            await _context.SaveChangesAsync();

            // Update the QR code with the pet profile information
            var qrCode = await _context.QRCodes.FindAsync(petProfileDto.QRCodeID);
            if (qrCode != null)
            {
                qrCode.PetProfileID = petProfile.PetID;
                qrCode.IsScannedForFirstTime = true;
                qrCode.QRCodeData = $"http://localhost:5173/pet/{petProfile.PetID}";
                qrCode.DateModified = DateTime.Now;

                await _context.SaveChangesAsync();
            }

            petProfileDto.PetID = petProfile.PetID;
            return petProfileDto;
        }

        public async Task<PetProfileDto> GetPetProfileById(int petId)
        {
            var petProfile = await _context.PetProfiles
                .Include(p => p.DogBreed)
                .FirstOrDefaultAsync(p => p.PetID == petId);

            if (petProfile == null) return null;

            return new PetProfileDto
            {
                PetID = petProfile.PetID,
                PetName = petProfile.PetName,
                BreedID = petProfile.BreedID,
                BreedName = petProfile.DogBreed != null ? petProfile.DogBreed.BreedName : null,
                Age = petProfile.Age,
                Sex = petProfile.Sex,
                SpecialNotes = petProfile.SpecialNotes,
                Photo = petProfile.Photo,
            };
        }

        public async Task<bool> DeactivatePetProfile(int petId)
        {
            var petProfile = await _context.PetProfiles.FindAsync(petId);
            if (petProfile == null) return false;

            petProfile.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<PetProfileDto>> GetUserPets(int userId)
        {
            return await _context.PetProfiles
                .Where(p => p.UserID == userId && p.IsActive && !p.IsDeleted)
                .AsNoTracking()
                .Select(pet => new PetProfileDto
                {
                    PetID = pet.PetID,
                    PetName = pet.PetName,
                    Photo = pet.Photo,
                    BreedName = pet.DogBreed != null ? pet.DogBreed.BreedName : null,
                    Age = pet.Age != null ? pet.Age : null,
                    Sex = pet.Sex,
                    SpecialNotes = pet.SpecialNotes != null ? pet.SpecialNotes : null
                })
                .ToListAsync();
        }


        public async Task<bool> UpdatePetProfile(int petId, PetProfileDto petProfileDto)
        {
            var petProfile = await _context.PetProfiles.FindAsync(petId);
            if (petProfile == null) return false;

            petProfile.PetName = petProfileDto.PetName;
            petProfile.BreedID = petProfileDto.BreedID;
            petProfile.Age = petProfileDto.Age;
            petProfile.Sex = petProfileDto.Sex;
            petProfile.SpecialNotes = petProfileDto.SpecialNotes;

            if (petProfileDto.Photo != null)
            {
                petProfile.Photo = petProfileDto.Photo;
            }

            petProfile.DateModified = DateTime.Now;

            _context.PetProfiles.Update(petProfile);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
