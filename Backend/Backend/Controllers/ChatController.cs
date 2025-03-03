using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
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

        // POST /api/chat/session
        // Body example: 
        // {
        //   "petId": 123,
        //   "finderName": "John",
        //   "finderSurname": "Doe",
        //   "finderEmail": "john.doe@example.com"
        // }
        [HttpPost("session")]
        public async Task<ActionResult<ChatSessionDto>> CreateSession([FromBody] StartChatRequest request)
        {
            // 1. find the pet's profile
            var petProfile = await _petProfileService.GetPetProfileById(request.PetId);
            if (petProfile == null)
            {
                return NotFound("Pet not found.");
            }

            // 2. ephemeral ID
            var finderId = Guid.NewGuid().ToString();

            // The "ownerUserId" is the user who created the pet's profile
            int ownerUserId = petProfile.UserID;

            // 3. create chat session
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
    }
}