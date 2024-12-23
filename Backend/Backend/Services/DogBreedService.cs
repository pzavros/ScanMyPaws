using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTOs;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class DogBreedService : IDogBreedService
    {
        private readonly ApplicationDbContext _context;

        public DogBreedService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<DogBreedDto>> GetAllBreedsAsync()
        {
            return await _context.DogBreeds
                .Select(b => new DogBreedDto
                {
                    BreedID = b.BreedID,
                    BreedName = b.BreedName
                })
                .ToListAsync();
        }
    }
}