using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalRecordController : ControllerBase
    {
        private readonly IMedicalRecordService _medicalRecordService;

        public MedicalRecordController(IMedicalRecordService medicalRecordService)
        {
            _medicalRecordService = medicalRecordService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMedicalRecord([FromBody] MedicalRecordDto medicalRecordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdRecord = await _medicalRecordService.CreateMedicalRecord(medicalRecordDto);
                return CreatedAtAction(nameof(GetMedicalRecordById), new { id = createdRecord.PetID }, createdRecord);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMedicalRecord(int id, [FromBody] MedicalRecordDto updatedRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                // Call the updated service method
                var result = await _medicalRecordService.UpdateMedicalRecord(id, updatedRecord);
                if (result == null)
                    return NotFound("Medical record not found.");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedicalRecordById(int id)
        {
            try
            {
                var record = await _medicalRecordService.GetMedicalRecordById(id);
                return Ok(record);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("pet/{petId}")]
        public async Task<IActionResult> GetMedicalRecordsByPetId(int petId)
        {
            try
            {
                var records = await _medicalRecordService.GetMedicalRecordsByPetId(petId);
                return Ok(records);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalRecord(int id)
        {
            try
            {
                var success = await _medicalRecordService.DeleteMedicalRecord(id);
                return Ok("Deleted");
            }
            catch (Exception e)
            {
                return BadRequest(new { Error = e.Message });
            }
        }
    }
}
