using Backend.Models;
using Backend.DTOs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Backend.Hubs;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class NotificationService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationService(ApplicationDbContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task SendNotificationAsync(NotificationDto notificationDto)
        {
            var notification = new Notification
            {
                UserID = notificationDto.UserID,
                Title = notificationDto.Title,
                Message = notificationDto.Message,
                DateCreated = DateTime.UtcNow,
                DateModified = DateTime.UtcNow,
                Type = notificationDto.Type,
                ReferenceID = notificationDto.ReferenceID,
                ScheduledTime = notificationDto.ScheduledTime
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.User(notificationDto.UserID.ToString())
                .SendAsync("ReceiveNotification", notificationDto.Title, notificationDto.Message);
        }


        public async Task<Dictionary<string, List<NotificationDto>>> GetNotificationsByUser(int userId)
        {
            var now = DateTime.UtcNow;

            var allNotifications = await _context.Notifications
                .Where(n => n.UserID == userId)
                .Select(n => new NotificationDto
                {
                    NotificationID = n.NotificationID,
                    DateCreated = n.DateCreated,
                    DateModified = n.DateModified,
                    UserID = n.UserID,
                    Title = n.Title,
                    Message = n.Message,
                    IsRead = n.IsRead,
                    ScheduledTime = n.ScheduledTime
                }).ToListAsync();

            var upcoming = allNotifications
                .Where(n => n.ScheduledTime.HasValue && n.ScheduledTime > now && !n.IsRead)
                .ToList();

            var past = allNotifications
                .Where(n => n.IsRead || (n.ScheduledTime.HasValue && n.ScheduledTime <= now))
                .OrderByDescending(n => n.ScheduledTime)
                .ToList();

            return new Dictionary<string, List<NotificationDto>>
            {
                { "upcoming", upcoming },
                { "past", past }
            };
        }

        
        public async Task<bool> MarkNotificationAsRead(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null) return false;

            notification.IsRead = true;
            notification.DateModified = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

    }
}