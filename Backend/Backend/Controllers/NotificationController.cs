using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;

namespace Backend.Controllers
{
    [Route("api/notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }


        [HttpGet("{userId}")]
        public async Task<ActionResult<Dictionary<string, List<NotificationDto>>>> GetNotifications(int userId)
        {
            var notifications = await _notificationService.GetNotificationsByUser(userId);
            if (notifications["upcoming"].Count == 0 && notifications["past"].Count == 0)
            {
                return NoContent();
            }
            return notifications;
        }



        [HttpPost("send")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationDto notificationDto)
        {
            await _notificationService.SendNotificationAsync(notificationDto);
            return Ok(new { message = "Notification sent successfully!" });
        }
        
        [HttpPut("read/{notificationId}")]
        public async Task<IActionResult> MarkNotificationAsRead(int notificationId)
        {
            var success = await _notificationService.MarkNotificationAsRead(notificationId);
            if (!success)
            {
                return NotFound(new { message = "Notification not found." });
            }
            return Ok(new { message = "Notification marked as read." });
        }
        
        [HttpGet("user/{userId}/recent")]
        public async Task<ActionResult<IEnumerable<NotificationDto>>> GetRecentNotifications(int userId)
        {
            var notifications = await _notificationService.GetRecentNotifications(userId);
            return Ok(notifications);
        }

        [HttpGet("user/{userId}/upcoming")]
        public async Task<ActionResult<IEnumerable<NotificationDto>>> GetUpcomingNotifications(int userId)
        {
            var notifications = await _notificationService.GetUpcomingNotifications(userId);
            return Ok(notifications);
        }
    }
}