using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.DTOs;

namespace Backend.Interfaces
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationDto>> GetRecentNotifications(int userId);
        Task<IEnumerable<NotificationDto>> GetUpcomingNotifications(int userId);
        Task<Dictionary<string, List<NotificationDto>>> GetNotificationsByUser(int userId);
        Task SendNotificationAsync(NotificationDto notificationDto);
        Task<bool> MarkNotificationAsRead(int notificationId); 
    }
}