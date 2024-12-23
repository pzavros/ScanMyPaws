using Backend.Interfaces;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
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
                Breed = petProfileDto.Breed,
                Age = petProfileDto.Age,
                IsTransferred = petProfileDto.IsTransferred,
                IsActive = petProfileDto.IsActive,
                IsDeleted = petProfileDto.IsDeleted,
                QRCodeID = petProfileDto.QRCodeID,
                Sex = petProfileDto.Sex,
                PhotoURL = petProfileDto.PhotoURL, // Save Base64 or URL
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
            var petProfile = await _context.PetProfiles.FindAsync(petId);
            if (petProfile == null) return null;

            return new PetProfileDto
            {
                PetID = petProfile.PetID,
                UserID = petProfile.UserID,
                PetName = petProfile.PetName,
                Breed = petProfile.Breed,
                Age = petProfile.Age,
                IsTransferred = petProfile.IsTransferred,
                IsActive = petProfile.IsActive,
                IsDeleted = petProfile.IsDeleted,
                DateCreated = petProfile.DateCreated,
                QRCodeID = petProfile.QRCodeID,
                Sex = petProfile.Sex,
                PhotoURL = petProfile.PhotoURL,
                SpecialNotes = petProfile.SpecialNotes
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
            var petProfiles = await _context.PetProfiles
                .Where(p => p.UserID == userId && p.IsActive && !p.IsDeleted)
                .ToListAsync();

            return petProfiles.Select(pet => new PetProfileDto
            {
                PetID = pet.PetID,
                UserID = pet.UserID,
                PetName = pet.PetName,
                Breed = pet.Breed,
                Age = pet.Age,
                IsTransferred = pet.IsTransferred,
                IsActive = pet.IsActive,
                IsDeleted = pet.IsDeleted,
                DateCreated = pet.DateCreated,
                QRCodeID = pet.QRCodeID,
                Sex = pet.Sex,
                PhotoURL = pet.PhotoURL,
                SpecialNotes = pet.SpecialNotes
            }).ToList();
        }

    }
}
