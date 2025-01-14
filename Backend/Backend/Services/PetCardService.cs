using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class PetCardService : IPetCardService
    {
        private readonly ApplicationDbContext _context;

        public PetCardService(ApplicationDbContext context)
        {
            _context = context;
        }

        private string GenerateUniqueUrl()
        {
            using (var generator = RandomNumberGenerator.Create())
            {
                byte[] data = new byte[16];
                generator.GetBytes(data);
                return Convert.ToBase64String(data).Replace("/", "").Replace("+", "").Replace("=", "").Substring(0, 20);
            }
        }

        public async Task<PetCardDto> CreatePetCard(PetCardDto petCardDto)
        {
            // Validate if the user exists
            var userExists = await _context.Users.AnyAsync(u => u.UserID == petCardDto.UserID);
            if (!userExists)
                throw new Exception("Invalid UserID. User does not exist.");

            // Validate if the pet profile exists
            var petProfile = await _context.PetProfiles.FirstOrDefaultAsync(p => p.PetID == petCardDto.PetID);
            if (petProfile == null)
                throw new Exception("Pet profile does not exist.");

            // Retrieve or generate a unique URL
            var uniqueUrl = petProfile.UniqueUrl ?? GenerateUniqueUrl();

            // Create the PetCard
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
                Weight = petCardDto.Weight,
                UniqueUrl = uniqueUrl
            };

            _context.PetCards.Add(petCard);

            // Mark the pet profile as having a card
            petProfile.IsHavingCard = true;

            await _context.SaveChangesAsync();

            // Update DTO with newly generated ID and unique URL
            petCardDto.PetCardID = petCard.PetCardID;
            petCardDto.UniqueUrl = uniqueUrl;

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
                AlternativeContactPhone = petCard.AlternativeContactPhone,
                Weight = petCard.Weight,
                UniqueUrl = petCard.UniqueUrl
            };
        }

        public async Task<PetCardDto> UpdatePetCard(int petCardId, PetCardDto updatedPetCard)
        {
            var petCard = await _context.PetCards.FirstOrDefaultAsync(pc => pc.PetCardID == petCardId);
            if (petCard == null)
            {
                return null;
            }

            // Update fields
            petCard.PetName = updatedPetCard.PetName;
            petCard.BreedName = updatedPetCard.BreedName;
            petCard.Age = updatedPetCard.Age;
            petCard.Sex = updatedPetCard.Sex;
            petCard.Weight = updatedPetCard.Weight;
            petCard.MobilePhone1 = updatedPetCard.MobilePhone1;
            petCard.MobilePhone2 = updatedPetCard.MobilePhone2;
            petCard.Address = updatedPetCard.Address;
            petCard.AlternativeContactName = updatedPetCard.AlternativeContactName;
            petCard.AlternativeContactPhone = updatedPetCard.AlternativeContactPhone;
            petCard.ImportantInformation = updatedPetCard.ImportantInformation;
            petCard.AdditionalInfo = updatedPetCard.AdditionalInfo;

            if (updatedPetCard.Photo != null)
            {
                petCard.Photo = updatedPetCard.Photo;
            }

            petCard.DateModified = DateTime.Now;

            await _context.SaveChangesAsync();

            return updatedPetCard;
        }


        public async Task<PetCardDto> GetPublicPetCard(string uniqueUrl)
        {
            var petCard = await _context.PetCards
                .FirstOrDefaultAsync(pc => pc.UniqueUrl == uniqueUrl);

            if (petCard == null) return null;

            return new PetCardDto
            {
                PetCardID = petCard.PetCardID,
                PetID = petCard.PetID,
                PetName = petCard.PetName,
                BreedName = petCard.BreedName,
                Age = petCard.Age,
                Sex = petCard.Sex,
                SpecialNotes = petCard.SpecialNotes,
                Photo = petCard.Photo,
                FullName = petCard.FullName,
                MobilePhone1 = petCard.MobilePhone1,
                MobilePhone2 = petCard.MobilePhone2,
                ImportantInformation = petCard.ImportantInformation,
                AdditionalInfo = petCard.AdditionalInfo,
                Address = petCard.Address,
                AlternativeContactName = petCard.AlternativeContactName,
                AlternativeContactPhone = petCard.AlternativeContactPhone,
                Weight = petCard.Weight,
                UniqueUrl = petCard.UniqueUrl
            };
        }
    }
}
