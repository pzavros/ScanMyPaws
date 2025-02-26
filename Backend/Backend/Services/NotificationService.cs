using Backend.Models;
using Backend.Interfaces;
using Backend.DTOs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Backend.Hubs;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class NotificationService : INotificationService
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

            Console.WriteLine($"Notification Created: {notification.Title} for User {notification.UserID}");

            try
            {
                await _hubContext.Clients.All.SendAsync("ReceiveNotification", new
                {
                    notification.Title,
                    notification.Message,
                    notification.DateCreated
                });

                Console.WriteLine($"SignalR Notification Sent: {notification.Title}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending SignalR notification: {ex.Message}");
            }
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
        
        public async Task<IEnumerable<NotificationDto>> GetRecentNotifications(int userId)
        {
            return await _context.Notifications
                .Where(n => n.UserID == userId && n.DateCreated >= DateTime.UtcNow.AddDays(-7))
                .OrderByDescending(n => n.DateCreated)
                .Select(n => new NotificationDto
                {
                    NotificationID = n.NotificationID,
                    DateCreated = n.DateCreated,
                    DateModified = n.DateModified,
                    UserID = n.UserID,
                    Title = n.Title,
                    Message = n.Message,
                    IsRead = n.IsRead,
                    Type = n.Type,
                    ReferenceID = n.ReferenceID,
                    ScheduledTime = n.ScheduledTime
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<NotificationDto>> GetUpcomingNotifications(int userId)
        {
            return await _context.Notifications
                .Where(n => n.UserID == userId && n.ScheduledTime > DateTime.UtcNow)
                .OrderBy(n => n.ScheduledTime)
                .Select(n => new NotificationDto
                {
                    NotificationID = n.NotificationID,
                    DateCreated = n.DateCreated,
                    DateModified = n.DateModified,
                    UserID = n.UserID,
                    Title = n.Title,
                    Message = n.Message,
                    IsRead = n.IsRead,
                    Type = n.Type,
                    ReferenceID = n.ReferenceID,
                    ScheduledTime = n.ScheduledTime
                })
                .ToListAsync();
        }

    }
}