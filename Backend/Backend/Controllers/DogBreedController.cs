using System.Threading.Tasks;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DogBreedController : ControllerBase
    {
        private readonly IDogBreedService _dogBreedService;

        public DogBreedController(IDogBreedService dogBreedService)
        {
            _dogBreedService = dogBreedService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBreeds()
        {
            var breeds = await _dogBreedService.GetAllBreedsAsync();
            return Ok(breeds);
        }
    }
}