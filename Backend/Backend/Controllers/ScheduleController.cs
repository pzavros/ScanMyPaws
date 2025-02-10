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
        public async Task<ActionResult<ScheduleDto>> CreateSchedule(ScheduleDto scheduleDto)
        {
            var createdSchedule = await _scheduleService.CreateSchedule(scheduleDto);
            return CreatedAtAction(nameof(GetScheduleById), new { scheduleID = createdSchedule.ScheduleID }, createdSchedule);
        }

        [HttpPut("{scheduleID}")]
        public async Task<IActionResult> UpdateSchedule(int scheduleID, ScheduleDto scheduleDto)
        {
            var success = await _scheduleService.UpdateSchedule(scheduleID, scheduleDto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{scheduleID}")]
        public async Task<IActionResult> DeleteSchedule(int scheduleID)
        {
            var success = await _scheduleService.DeleteSchedule(scheduleID);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
