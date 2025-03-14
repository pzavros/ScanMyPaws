using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.DTOs;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

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
        [AllowAnonymous]
        [HttpPost("send/{sessionId}")]
        public async Task<ActionResult> SendMessage(Guid sessionId, [FromBody] ChatMessageDto messageDto)
        {
            // If the user is logged in, override SenderId from token.
            var userIdClaim = User.FindFirst("UserId");
            if (userIdClaim != null && User.Identity.IsAuthenticated)
            {
                messageDto.SenderId = userIdClaim.Value;
            }
            else
            {
                // If not logged in (anonymous), then we rely on the body for senderId.
                if (string.IsNullOrWhiteSpace(messageDto.SenderId))
                {
                    return BadRequest(new { message = "SenderId is required for anonymous user." });
                }
            }

            if (string.IsNullOrWhiteSpace(messageDto.MessageContent))
            {
                return BadRequest(new { message = "Message content cannot be empty." });
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
        public async Task<ActionResult> MarkMessagesAsRead(Guid sessionId)
        {
            var userIdClaim = User.FindFirst("UserId");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "User ID not found in token" });
            }

            var userId = userIdClaim.Value;

            await _chatService.MarkMessagesAsRead(sessionId, userId);
            return Ok(new { message = "Messages marked as read." });
        }
        [HttpDelete("sessions/{sessionId}")]
        public async Task<IActionResult> DeleteChatSession(Guid sessionId)
        {
            // Optionally: ensure user is authenticated
            var userIdClaim = User.FindFirst("UserId");
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "User ID not found in token" });
            }

            // Optionally: confirm the user is the owner of this session 
            // or an admin. For simplicity, we'll skip that check here.

            var success = await _chatService.DeleteChatSessionAsync(sessionId);
            if (!success)
            {
                return NotFound(new { message = "Chat session not found or couldn't be deleted." });
            }

            return Ok(new { message = "Chat session deleted successfully." });
        }

    }
}