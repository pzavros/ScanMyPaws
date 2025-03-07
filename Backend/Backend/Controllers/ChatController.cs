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
        /// <param name="request"></param>
        /// <returns>Chat session details</returns>
        [HttpPost("session")]
        public async Task<ActionResult<ChatSessionDto>> CreateSession([FromBody] StartChatRequest request)
        {
            // 1. Find the pet's profile
            var petProfile = await _petProfileService.GetPetProfileById(request.PetId);
            if (petProfile == null)
            {
                return NotFound(new { message = "Pet not found." });
            }

            // 2. Generate an ephemeral ID for the finder
            var finderId = Guid.NewGuid().ToString();

            // The "ownerUserId" is the user who created the pet's profile
            int ownerUserId = petProfile.UserID;

            // 3. Create chat session
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
        /// <param name="sessionId"></param>
        /// <returns>List of messages</returns>
        [HttpGet("messages/{sessionId}")]
        public async Task<ActionResult<IEnumerable<ChatMessageDto>>> GetChatMessages(int sessionId)
        {
            var sessionExists = await _chatService.GetChatSessionAsync(sessionId);
            if (sessionExists == null)
            {
                return NotFound(new { message = "Chat session not found." });
            }

            var messages = await _chatService.GetMessagesBySessionId(sessionId);
            if (messages == null || messages.Count == 0)
            {
                return Ok(new { messages = new List<ChatMessageDto>() }); // Return empty list instead of 404
            }

            return Ok(new { messages });
        }


        /// <summary>
        /// Sends a message in a chat session
        /// </summary>
        /// <param name="sessionId"></param>
        /// <param name="messageDto"></param>
        /// <returns>Success message</returns>
        [HttpPost("send/{sessionId}")]
        public async Task<ActionResult> SendMessage(int sessionId, [FromBody] ChatMessageDto messageDto)
        {
            if (messageDto == null)
            {
                return BadRequest(new { message = "Request body is missing" });
            }

            Console.WriteLine($"Received Message: SessionID={sessionId}, SenderID={messageDto.SenderId}, Message={messageDto.MessageContent}");

            if (string.IsNullOrWhiteSpace(messageDto.MessageContent))
            {
                return BadRequest(new { message = "Message content cannot be empty" });
            }

            var success = await _chatService.SendMessage(sessionId, messageDto);
            if (!success)
            {
                return BadRequest(new { message = "Chat session not found or failed to send" });
            }

            return Ok(new { message = "Message sent successfully" });
        }

    }
}
