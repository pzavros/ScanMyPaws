using Backend.Dtos;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetCardSettingController : ControllerBase
    {
        private readonly IPetCardSettingService _petCardSettingService;

        public PetCardSettingController(IPetCardSettingService petCardSettingService)
        {
            _petCardSettingService = petCardSettingService;
        }

        [HttpPost("{petId}")]
        public async Task<IActionResult> CreatePetCardSetting(int petId)
        {
            var result = await _petCardSettingService.CreatePetCardSettingAsync(petId);
            return Ok(result);
        }

        [HttpGet("{petId}")]
        public async Task<IActionResult> GetPetCardSetting(int petId)
        {
            var result = await _petCardSettingService.GetPetCardSettingAsync(petId);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPut("{petCardSettingId}")]
        public async Task<IActionResult> UpdatePetCardSetting(int petCardSettingId, [FromBody] PetCardSettingDto petCardSettingDto)
        {
            var result = await _petCardSettingService.UpdatePetCardSettingAsync(petCardSettingId, petCardSettingDto);
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}