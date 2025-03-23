using Backend.Dtos;
using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IPetLocationService
    {
        Task<PetLocationHistory> SubmitLocationAsync(PetLocationDto dto);
    }
}