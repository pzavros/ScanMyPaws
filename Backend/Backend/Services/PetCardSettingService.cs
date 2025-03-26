using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using ScanMyPaws.Models;

namespace Backend.Services
{
    public class PetCardSettingService : IPetCardSettingService
    {
        private readonly ApplicationDbContext _context;

        public PetCardSettingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PetCardSettingDto> CreatePetCardSettingAsync(int petId)
        {
            // Create a new PetCardSetting with default visibility values.
            var petCardSetting = new PetCardSetting
            {
                PetId = petId,
                PetName = true,
                BreedName = true,
                Sex = true,
                Age = true,
                Weight = true,
                MobilePhone1 = true,
                MobilePhone2 = true,
                Address = true,
                AlternativeContact = true,
                DateCreated = DateTime.UtcNow,
                DateModified = DateTime.UtcNow
            };

            _context.PetCardSettings.Add(petCardSetting);
            await _context.SaveChangesAsync();

            return new PetCardSettingDto
            {
                PetCardSettingId = petCardSetting.PetCardSettingId,
                PetId = petCardSetting.PetId,
                PetName = petCardSetting.PetName,
                BreedName = petCardSetting.BreedName,
                Sex = petCardSetting.Sex,
                Age = petCardSetting.Age,
                Weight = petCardSetting.Weight,
                MobilePhone1 = petCardSetting.MobilePhone1,
                MobilePhone2 = petCardSetting.MobilePhone2,
                Address = petCardSetting.Address,
                AlternativeContact = petCardSetting.AlternativeContact,
                DateCreated = petCardSetting.DateCreated,
                DateModified = petCardSetting.DateModified
            };
        }

        public async Task<PetCardSettingDto> GetPetCardSettingAsync(int petId)
        {
            var setting = await _context.PetCardSettings.FirstOrDefaultAsync(x => x.PetId == petId);
            if (setting == null) return null;

            return new PetCardSettingDto
            {
                PetCardSettingId = setting.PetCardSettingId,
                PetId = setting.PetId,
                PetName = setting.PetName,
                BreedName = setting.BreedName,
                Sex = setting.Sex,
                Age = setting.Age,
                Weight = setting.Weight,
                MobilePhone1 = setting.MobilePhone1,
                MobilePhone2 = setting.MobilePhone2,
                Address = setting.Address,
                AlternativeContact = setting.AlternativeContact,
                DateCreated = setting.DateCreated,
                DateModified = setting.DateModified
            };
        }

        public async Task<PetCardSettingDto> UpdatePetCardSettingAsync(int petCardSettingId, PetCardSettingDto petCardSettingDto)
        {
            var setting = await _context.PetCardSettings.FirstOrDefaultAsync(x => x.PetCardSettingId == petCardSettingId);
            if (setting == null) return null;

            // Update fields
            setting.PetName = petCardSettingDto.PetName;
            setting.BreedName = petCardSettingDto.BreedName;
            setting.Sex = petCardSettingDto.Sex;
            setting.Age = petCardSettingDto.Age;
            setting.Weight = petCardSettingDto.Weight;
            setting.MobilePhone1 = petCardSettingDto.MobilePhone1;
            setting.MobilePhone2 = petCardSettingDto.MobilePhone2;
            setting.Address = petCardSettingDto.Address;
            setting.AlternativeContact = petCardSettingDto.AlternativeContact;
            setting.DateModified = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return petCardSettingDto;
        }
    }
}
