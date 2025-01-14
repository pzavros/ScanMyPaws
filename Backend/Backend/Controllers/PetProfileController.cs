using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTOs;
using System;
using System.IO;
using System.Linq;
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
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];
                    if (file.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await file.CopyToAsync(memoryStream);
                            petProfileDto.Photo = memoryStream.ToArray(); // Save binary data
                        }
                    }
                }

                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserID");
                if (userIdClaim == null)
                    return Unauthorized("UserID claim is missing from the token.");

                var userId = int.Parse(userIdClaim.Value);

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

                return Ok("Pet Profile Deactivated");
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
                    return Unauthorized(new { Message = "UserID claim is missing from the token." });

                if (!int.TryParse(userIdClaim.Value, out var userId))
                    return BadRequest(new { Message = "Invalid UserID format in the token." });

                var pets = await _petProfileService.GetUserPets(userId);

                if (pets == null || !pets.Any())
                {
                    return Ok(new { Message = "No pets found.", Data = new List<object>() });
                }

                return Ok(new { Message = "Pets fetched successfully.", Data = pets });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching pets: {ex.Message}");
                return StatusCode(500, new { Message = "Internal server error.", Details = ex.Message });
            }
        }


        [HttpPut("{petId}")]
        public async Task<IActionResult> UpdatePetProfile(int petId, [FromForm] PetProfileDto petProfileDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];
                    if (file.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await file.CopyToAsync(memoryStream);
                            petProfileDto.Photo = memoryStream.ToArray();
                        }
                    }
                }

                var result = await _petProfileService.UpdatePetProfile(petId, petProfileDto);
                if (!result) return NotFound();

                var updatedProfile = await _petProfileService.GetPetProfileById(petId);
                return Ok(updatedProfile);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
