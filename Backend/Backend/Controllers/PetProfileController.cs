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
        public async Task<IActionResult> CreatePetProfile([FromForm] PetProfileDto petProfileDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                // Extract UserID from token
                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserID");
                if (userIdClaim == null)
                    return Unauthorized("UserID claim is missing from the token.");

                var userId = int.Parse(userIdClaim.Value); // Parse UserID from token

                // Handle the file upload
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];
                    if (file.Length > 0)
                    {
                        // Save file to a location or convert to Base64
                        using (var memoryStream = new MemoryStream())
                        {
                            await file.CopyToAsync(memoryStream);
                            petProfileDto.PhotoURL = Convert.ToBase64String(memoryStream.ToArray());
                        }
                    }
                }

                // Call service to create the pet profile
                var petProfile = await _petProfileService.CreatePetProfile(petProfileDto, userId);
                return CreatedAtAction(nameof(GetPetProfileById), new { petId = petProfile.PetID }, petProfile);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpGet("{petId}")]
        public async Task<IActionResult> GetPetProfileById(int petId)
        {
            try
            {
                var petProfile = await _petProfileService.GetPetProfileById(petId);
                if (petProfile == null)
                    return NotFound();

                return Ok(petProfile);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{petId}/deactivate")]
        public async Task<IActionResult> DeactivatePetProfile(int petId)
        {
            try
            {
                var result = await _petProfileService.DeactivatePetProfile(petId);
                if (!result)
                    return NotFound();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        
        [HttpGet("user")]
        public async Task<IActionResult> GetUserPets()
        {
            try
            {
                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserID");
                if (userIdClaim == null)
                    return Unauthorized("UserID claim is missing from the token.");

                var userId = int.Parse(userIdClaim.Value);

                // Fetch user pets
                var pets = await _petProfileService.GetUserPets(userId);

                // Log result (debugging purposes)
                Console.WriteLine($"Fetched {pets.Count} pets for user ID {userId}.");

                if (pets.Count == 0)
                    return Ok(new List<PetProfileDto>()); // Return an empty list if no pets found

                return Ok(pets);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
