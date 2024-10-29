using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IPetProfileService
    {
        Task<PetProfileDto> CreatePetProfile(PetProfileDto petProfileDto);
        Task<PetProfileDto> GetPetProfileById(int petId);
        Task<bool> DeactivatePetProfile(int petId);
    }
}