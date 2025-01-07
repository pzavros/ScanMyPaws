using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Backend.Interfaces;

namespace Backend.Services
{
    public class PetCardService : IPetCardService
    {
        private readonly ApplicationDbContext _context;

        public PetCardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PetCardDto> CreatePetCard(PetCardDto petCardDto)
        {
            // Log UserID for debugging
            Console.WriteLine($"UserID: {petCardDto.UserID}");

            // Validate that the UserID exists
            var userExists = await _context.Users.AnyAsync(u => u.UserID == petCardDto.UserID);
            if (!userExists)
            {
                throw new Exception("Invalid UserID. User does not exist.");
            }

            // Proceed with creating the PetCard
            var petCard = new PetCard
            {
                PetID = petCardDto.PetID,
                UserID = petCardDto.UserID,
                FullName = petCardDto.FullName,
                MobilePhone1 = petCardDto.MobilePhone1,
                MobilePhone2 = petCardDto.MobilePhone2,
                Address = petCardDto.Address,
                AlternativeContactName = petCardDto.AlternativeContactName,
                AlternativeContactPhone = petCardDto.AlternativeContactPhone,
                ImportantInformation = petCardDto.ImportantInformation,
                AdditionalInfo = petCardDto.AdditionalInfo,
                PetName = petCardDto.PetName,
                BreedName = petCardDto.BreedName,
                Age = petCardDto.Age,
                Sex = petCardDto.Sex,
                SpecialNotes = petCardDto.SpecialNotes,
                Photo = petCardDto.Photo,
            };

            _context.PetCards.Add(petCard);

            // Update the PetProfile to set IsHavingCard = true
            var petProfile = await _context.PetProfiles.FirstOrDefaultAsync(p => p.PetID == petCardDto.PetID);
            if (petProfile != null)
            {
                petProfile.IsHavingCard = true;
            }

            await _context.SaveChangesAsync();

            petCardDto.PetCardID = petCard.PetCardID;
            return petCardDto;
        }

        public async Task<PetCardDto> GetPetCardByPetId(int petId)
        {
            var petCard = await _context.PetCards
                .Include(pc => pc.PetProfile)
                .ThenInclude(pp => pp.DogBreed)
                .FirstOrDefaultAsync(pc => pc.PetID == petId);

            if (petCard == null) return null;

            return new PetCardDto
            {
                PetCardID = petCard.PetCardID,
                PetID = petCard.PetID,
                PetName = petCard.PetProfile.PetName,
                BreedName = petCard.PetProfile.DogBreed?.BreedName,
                Age = petCard.PetProfile.Age,
                Sex = petCard.PetProfile.Sex,
                SpecialNotes = petCard.PetProfile.SpecialNotes,
                Photo = petCard.PetProfile.Photo,
                FullName = petCard.FullName,
                MobilePhone1 = petCard.MobilePhone1,
                MobilePhone2 = petCard.MobilePhone2,
                ImportantInformation = petCard.ImportantInformation,
                AdditionalInfo = petCard.AdditionalInfo,
                Address = petCard.Address,
                AlternativeContactName = petCard.AlternativeContactName,
                AlternativeContactPhone = petCard.AlternativeContactPhone
            };
        }
    }
}
