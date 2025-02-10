using Backend.Models;
using Backend.DTOs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Backend.Hubs;
using System.Linq;

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
                DateModified = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.User(notificationDto.UserID.ToString()).SendAsync("ReceiveNotification", notificationDto.Title, notificationDto.Message);
        }

        public IQueryable<NotificationDto> GetNotificationsByUser(int userId)
        {
            return _context.Notifications
                .Where(n => n.UserID == userId)
                .Select(n => new NotificationDto
                {
                    NotificationID = n.NotificationID,
                    DateCreated = n.DateCreated,
                    DateModified = n.DateModified,
                    UserID = n.UserID,
                    Title = n.Title,
                    Message = n.Message,
                    IsRead = n.IsRead
                });
        }
    }
}