using Backend.DTOs;
using Backend.Interfaces;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using Backend.Hubs;

namespace Backend.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly NotificationService _notificationService;
        
        public ScheduleService(ApplicationDbContext context, IHubContext<NotificationHub> hubContext, NotificationService notificationService)
        {
            _context = context;
            _hubContext = hubContext;
            _notificationService = notificationService;
        }

        public async Task<IEnumerable<ScheduleDto>> GetUserSchedules(int userID)
        {
            return await _context.Schedules
                .Where(s => s.UserID == userID)
                .Select(s => new ScheduleDto
                {
                    ScheduleID = s.ScheduleID,
                    UserID = s.UserID,
                    Title = s.Title,
                    Date = s.Date,
                    Description = s.Description,
                    IsCompleted = s.IsCompleted
                })
                .ToListAsync();
        }

        public async Task<ScheduleDto> GetScheduleById(int scheduleID)
        {
            var schedule = await _context.Schedules.FindAsync(scheduleID);
            if (schedule == null) return null;

            return new ScheduleDto
            {
                ScheduleID = schedule.ScheduleID,
                UserID = schedule.UserID,
                Title = schedule.Title,
                Date = schedule.Date,
                Description = schedule.Description,
                IsCompleted = schedule.IsCompleted
            };
        }

        public async Task<ScheduleDto> CreateSchedule(ScheduleDto scheduleDto)
        {
            var schedule = new Schedule
            {
                UserID = scheduleDto.UserID,
                Title = scheduleDto.Title,
                Date = scheduleDto.Date,
                Time = scheduleDto.Time,
                Description = scheduleDto.Description,
                IsCompleted = scheduleDto.IsCompleted
            };

            _context.Schedules.Add(schedule);
            await _context.SaveChangesAsync();

            await _notificationService.SendNotificationAsync(new NotificationDto
            {
                UserID = schedule.UserID,
                Title = "Upcoming Schedule",
                Message = $"Reminder: {schedule.Title} is scheduled on {schedule.Date.ToShortDateString()} at {schedule.Time}.",
                Type = "Schedule Reminder",
                ReferenceID = schedule.ScheduleID,
                ScheduledTime = schedule.Date.Add(schedule.Time)
            });


            scheduleDto.ScheduleID = schedule.ScheduleID;
            return scheduleDto;
        }


        public async Task<bool> UpdateSchedule(int scheduleID, ScheduleDto scheduleDto)
        {
            var schedule = await _context.Schedules.FindAsync(scheduleID);
            if (schedule == null) return false;

            schedule.Title = scheduleDto.Title;
            schedule.Date = scheduleDto.Date;
            schedule.Description = scheduleDto.Description;
            schedule.IsCompleted = scheduleDto.IsCompleted;
            schedule.DateModified = System.DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSchedule(int scheduleID)
        {
            var schedule = await _context.Schedules.FindAsync(scheduleID);
            if (schedule == null) return false;

            _context.Schedules.Remove(schedule);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
