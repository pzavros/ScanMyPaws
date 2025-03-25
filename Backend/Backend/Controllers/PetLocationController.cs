using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetLocationController : ControllerBase
    {
        private readonly IPetLocationService _petLocationService;

        public PetLocationController(IPetLocationService petLocationService)
        {
            _petLocationService = petLocationService;
        }

        // POST: /api/PetLocation
        [HttpPost]
        public async Task<IActionResult> SubmitLocation([FromBody] PetLocationDto dto)
        {
            try
            {
                if (dto == null) 
                    return BadRequest("Invalid location data.");

                var result = await _petLocationService.SubmitLocationAsync(dto);
                return Ok(result); 
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An internal server error occurred.");
            }
        }
        [HttpGet("history/{petId}")]
        public async Task<IActionResult> GetLocationHistoryByPetId(int petId)
        {
            try
            {
                var history = await _petLocationService.GetLocationHistoryByPetIdAsync(petId);
                return Ok(history);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching location history: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving location history.");
            }
        }

    }
}