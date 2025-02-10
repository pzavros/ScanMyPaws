using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly NotificationService _notificationService;

        public NotificationController(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("{userId}")]
        public ActionResult<List<NotificationDto>> GetNotifications(int userId)
        {
            return _notificationService.GetNotificationsByUser(userId).ToList();
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationDto notificationDto)
        {
            await _notificationService.SendNotificationAsync(notificationDto);
            return Ok(new { message = "Notification sent successfully!" });
        }
    }
}