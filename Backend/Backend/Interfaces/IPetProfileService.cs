using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IPetProfileService
    {
        Task<PetProfileDto> CreatePetProfile(PetProfileDto petProfileDto, int userId);
        Task<PetProfileDto> GetPetProfileById(int petId);
        Task<bool> DeactivatePetProfile(int petId);
        Task<List<PetProfileDto>> GetUserPets(int userId);
    }
}