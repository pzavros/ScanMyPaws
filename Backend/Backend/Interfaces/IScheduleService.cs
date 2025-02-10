using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.DTOs;

namespace Backend.Interfaces
{
    public interface IScheduleService
    {
        Task<IEnumerable<ScheduleDto>> GetUserSchedules(int userID);
        Task<ScheduleDto> GetScheduleById(int scheduleID);
        Task<ScheduleDto> CreateSchedule(ScheduleDto scheduleDto);
        Task<bool> UpdateSchedule(int scheduleID, ScheduleDto scheduleDto);
        Task<bool> DeleteSchedule(int scheduleID);
    }
}