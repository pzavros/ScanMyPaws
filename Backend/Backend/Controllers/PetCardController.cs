using Backend.Dtos;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetCardController : ControllerBase
    {
        private readonly IPetCardService _petCardService;

        public PetCardController(IPetCardService petCardService)
        {
            _petCardService = petCardService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePetCard([FromBody] PetCardDto petCardDto)
        {
            try
            {
                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserID");
                if (userIdClaim == null)
                {
                    return Unauthorized("User ID not found in token.");
                }

                var userId = int.Parse(userIdClaim.Value);
                petCardDto.UserID = userId;

                var result = await _petCardService.CreatePetCard(petCardDto);

                if (result == null)
                {
                    return BadRequest("Unable to create pet card.");
                }

                return Ok(result);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An internal server error occurred.");
            }
        }

        [HttpGet("{petId}")]
        public async Task<IActionResult> GetPetCardByPetId(int petId)
        {
            var result = await _petCardService.GetPetCardByPetId(petId);
            if (result == null)
            {
                return NotFound("Pet card not found.");
            }

            return Ok(result);
        }

        [HttpPut("{petId}")]
        public async Task<IActionResult> UpdatePetCard(int petId, [FromBody] PetCardDto updatedPetCard)
        {
            try
            {
                var result = await _petCardService.UpdatePetCard(petId, updatedPetCard);
                if (result == null)
                {
                    return NotFound("Pet card not found.");
                }

                return Ok(result);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An internal server error occurred.");
            }
        }
    }
}
