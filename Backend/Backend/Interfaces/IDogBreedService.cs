using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.DTOs;

namespace Backend.Interfaces
{
    public interface IDogBreedService
    {
        Task<List<DogBreedDto>> GetAllBreedsAsync();
    }
}