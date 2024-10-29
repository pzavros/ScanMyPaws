using Backend.Interfaces;
using Backend.DTOs;
using Backend.Models;
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

        public async Task<PetProfileDto> CreatePetProfile(PetProfileDto petProfileDto)
        {
            var petProfile = new PetProfile
            {
                DateCreated = DateTime.Now, // Always include this at the start
                UserID = petProfileDto.UserID,
                PetName = petProfileDto.PetName,
                Breed = petProfileDto.Breed,
                Age = petProfileDto.Age,
                IsTransferred = petProfileDto.IsTransferred,
                IsActive = petProfileDto.IsActive,
                IsDeleted = petProfileDto.IsDeleted,
                QRCodeID = petProfileDto.QRCodeID // QRCode relation
            };

            _context.PetProfiles.Add(petProfile);
            await _context.SaveChangesAsync();

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
                QRCodeID = petProfile.QRCodeID
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
    }
}
