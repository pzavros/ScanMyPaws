using Backend.DTOs;
using Backend.Interfaces;
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
            var userExists = await _context.Users.AnyAsync(u => u.UserID == userId);
            if (!userExists)
                throw new Exception("User does not exist.");

            var qrCode = await _context.QRCodes.FirstOrDefaultAsync(q => q.QRCodeID == petProfileDto.QRCodeID);
            if (qrCode == null)
                throw new Exception("QR Code does not exist.");

            // Extract UniqueUrl from QRCodeData
            string uniqueUrl = qrCode.QRCodeData?.Split('/').LastOrDefault();
            if (string.IsNullOrEmpty(uniqueUrl))
                throw new Exception("Invalid QRCodeData format. Unique URL not found.");

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
                UniqueUrl = uniqueUrl,
                Weight = petProfileDto.Weight,
                Size = petProfileDto.Size,
            };

            _context.PetProfiles.Add(petProfile);
            await _context.SaveChangesAsync();

            // Update QRCode with pet profile information
            qrCode.PetProfileID = petProfile.PetID;
            qrCode.IsScannedForFirstTime = true;
            qrCode.DateModified = DateTime.Now;
            await _context.SaveChangesAsync();

            petProfileDto.PetID = petProfile.PetID;
            petProfileDto.UniqueUrl = petProfile.UniqueUrl;

            return petProfileDto;
        }

        public async Task<PetProfileDto> GetPetProfileById(int petId)
        {
            var petProfile = await _context.PetProfiles
                .Include(p => p.DogBreed)
                .Include(p => p.QRCode)
                .FirstOrDefaultAsync(p => p.PetID == petId);

            if (petProfile == null) return null;

            return new PetProfileDto
            {
                PetID = petProfile.PetID,
                UserID = petProfile.UserID,
                PetName = petProfile.PetName,
                BreedID = petProfile.BreedID,
                BreedName = petProfile.DogBreed?.BreedName,
                Age = petProfile.Age,
                Sex = petProfile.Sex,
                SpecialNotes = petProfile.SpecialNotes,
                Photo = petProfile.Photo,
                IsHavingCard = petProfile.IsHavingCard,
                UniqueUrl = petProfile.UniqueUrl,
                Weight = petProfile.Weight,
                Size = petProfile.Size
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
                    Age = pet.Age,
                    Sex = pet.Sex,
                    SpecialNotes = pet.SpecialNotes,
                    Weight = pet.Weight,
                    Size = pet.Size
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
            petProfile.Weight = petProfileDto.Weight;
            petProfile.Size = petProfileDto.Size;
            if (petProfileDto.Photo != null)
            {
                petProfile.Photo = petProfileDto.Photo;
            }

            petProfile.DateModified = DateTime.Now;

            _context.PetProfiles.Update(petProfile);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<PetStatsDto> GetPetStats(int petId)
        {
            var pet = await _context.PetProfiles.FindAsync(petId);
            if (pet == null) return null;

            return new PetStatsDto
            {
                Age = $"{pet.Age} Years",
                Weight = $"{pet.Weight} kg",
                Size = pet.Size
            };
        }
    }
}
