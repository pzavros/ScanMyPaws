using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.DTOs;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/chat")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly IPetProfileService _petProfileService;

        public ChatController(IChatService chatService, IPetProfileService petProfileService)
        {
            _chatService = chatService;
            _petProfileService = petProfileService;
        }

        /// <summary>
        /// Creates a new chat session
        /// </summary>
        [HttpPost("session")]
        public async Task<ActionResult<ChatSessionDto>> CreateSession([FromBody] StartChatRequest request)
        {
            var petProfile = await _petProfileService.GetPetProfileById(request.PetId);
            if (petProfile == null)
            {
                return NotFound(new { message = "Pet not found." });
            }

            if (petProfile.UserID == 0 || petProfile.UserID == null)
            {
                return BadRequest(new { message = "Invalid owner. Ensure the pet has an assigned user." });
            }

            int ownerUserId = petProfile.UserID;
            var finderId = Guid.NewGuid().ToString();

            var chatSessionDto = await _chatService.CreateChatSessionAsync(
                request.PetId,
                ownerUserId,
                finderId,
                request.FinderName,
                request.FinderSurname,
                request.FinderEmail
            );

            return Ok(chatSessionDto);
        }

        /// <summary>
        /// Fetches chat messages for a given session
        /// </summary>
        [HttpGet("messages/{sessionId}")]
        public async Task<ActionResult<IEnumerable<ChatMessageDto>>> GetChatMessages(Guid sessionId)
        {
            var messages = await _chatService.GetMessagesBySessionId(sessionId);
            return Ok(new { messages });
        }
        
        /// <summary>
        /// Sends a message in a chat session
        /// </summary>
        [HttpPost("send/{sessionId}")]
        public async Task<ActionResult> SendMessage(Guid sessionId, [FromBody] ChatMessageDto messageDto)
        {
            if (string.IsNullOrWhiteSpace(messageDto.MessageContent))
            {
                return BadRequest(new { message = "Message content cannot be empty" });
            }

            var success = await _chatService.SendMessage(sessionId, messageDto);
            if (!success)
            {
                return BadRequest(new { message = "Failed to send message." });
            }

            return Ok(new { message = "Message sent successfully" });
        }
        [HttpGet("sessions/user")]
        public async Task<ActionResult<IEnumerable<ChatSessionDto>>> GetOwnerChatSessions()
        {
            var userIdClaim = User.FindFirst("UserId");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "User ID not found in token" });
            }

            int ownerUserId = int.Parse(userIdClaim.Value);
            var sessions = await _chatService.GetChatSessionsByOwnerId(ownerUserId);
    
            return Ok(sessions);
        }
        [HttpPost("mark-read/{sessionId}")]
        public async Task<ActionResult> MarkMessagesAsRead(Guid sessionId, [FromBody] string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { message = "User ID is required." });
            }

            await _chatService.MarkMessagesAsRead(sessionId, userId);
            return Ok(new { message = "Messages marked as read." });
        }

    }
}
