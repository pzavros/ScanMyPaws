using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/schedules")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet("user/{userID}")]
        public async Task<ActionResult<IEnumerable<ScheduleDto>>> GetUserSchedules(int userID)
        {
            var schedules = await _scheduleService.GetUserSchedules(userID);
            return Ok(schedules);
        }

        [HttpGet("{scheduleID}")]
        public async Task<ActionResult<ScheduleDto>> GetScheduleById(int scheduleID)
        {
            var schedule = await _scheduleService.GetScheduleById(scheduleID);
            if (schedule == null) return NotFound();
            return Ok(schedule);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSchedule([FromBody] ScheduleDto scheduleDto)
        {
            if (scheduleDto == null)
            {
                return BadRequest(new { message = "Invalid request. Schedule data is required." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdSchedule = await _scheduleService.CreateSchedule(scheduleDto);

            if (createdSchedule == null || createdSchedule.ScheduleID == 0)
            {
                return BadRequest(new { message = "Schedule creation failed." });
            }

            return Ok(createdSchedule);
        }

        [HttpPut("{scheduleID}")]
        public async Task<IActionResult> UpdateSchedule(int scheduleID, [FromBody] ScheduleDto scheduleDto)
        {
            if (scheduleDto == null)
            {
                return BadRequest(new { message = "Schedule data is missing." });
            }

            Console.WriteLine($"Updating schedule {scheduleID}...");

            var success = await _scheduleService.UpdateSchedule(scheduleID, scheduleDto);

            if (!success)
            {
                Console.WriteLine($"Schedule {scheduleID} not found.");
                return NotFound(new { message = "Schedule not found." });
            }

            Console.WriteLine($"Schedule {scheduleID} updated successfully.");
            return Ok(new { message = "Update successful" }); // ✅ Ensure API sends response
        }




        [HttpDelete("{scheduleID}")]
        public async Task<IActionResult> DeleteSchedule(int scheduleID)
        {
            var success = await _scheduleService.DeleteSchedule(scheduleID);
            if (!success) return NotFound();
            return NoContent();
        }
        
        [HttpGet("user/{userId}/upcoming-tasks")]
        public async Task<ActionResult<IEnumerable<ScheduleDto>>> GetUpcomingTasks(int userId)
        {
            var tasks = await _scheduleService.GetUpcomingTasks(userId);
            return Ok(tasks);
        }

    }
}
