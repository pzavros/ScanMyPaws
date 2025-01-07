using Backend.Dtos;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IPetCardService
    {
        Task<PetCardDto> CreatePetCard(PetCardDto petCardDto);
        Task<PetCardDto> GetPetCardByPetId(int petId);
    }
}