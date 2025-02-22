using System.Threading.Tasks;
using Backend.Dtos;

namespace Backend.Interfaces
{
    public interface IPetCardSettingService
    {
        Task<PetCardSettingDto> CreatePetCardSettingAsync(int petId);
        Task<PetCardSettingDto> GetPetCardSettingAsync(int petId);
        Task<PetCardSettingDto> UpdatePetCardSettingAsync(int petCardSettingId, PetCardSettingDto petCardSettingDto);
    }
}