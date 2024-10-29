using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetProfileController : ControllerBase
    {
        private readonly IPetProfileService _petProfileService;

        public PetProfileController(IPetProfileService petProfileService)
        {
            _petProfileService = petProfileService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePetProfile([FromBody] PetProfileDto petProfileDto)
        {
            var petProfile = await _petProfileService.CreatePetProfile(petProfileDto);
            return CreatedAtAction(nameof(GetPetProfileById), new { petId = petProfile.PetID }, petProfile);
        }

        [HttpGet("{petId}")]
        public async Task<IActionResult> GetPetProfileById(int petId)
        {
            var petProfile = await _petProfileService.GetPetProfileById(petId);
            if (petProfile == null)
                return NotFound();

            return Ok(petProfile);
        }

        [HttpPut("{petId}/deactivate")]
        public async Task<IActionResult> DeactivatePetProfile(int petId)
        {
            var result = await _petProfileService.DeactivatePetProfile(petId);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}