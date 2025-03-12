using System.Threading.Tasks;
using Backend.DTOs;
using System.Collections.Generic;

namespace Backend.Interfaces
{
    public interface IChatService
    {
        Task<ChatSessionDto> CreateChatSessionAsync(
            int petId,
            int ownerUserId,
            string finderEphemeralId,
            string finderName,
            string finderSurname,
            string finderEmail
        );

        Task<ChatSessionDto> GetChatSessionAsync(Guid chatSessionId);

        Task<ChatSessionDto> AddMessageToSessionAsync(Guid chatSessionId, string senderId, string messageContent);

        Task<List<ChatMessageDto>> GetMessagesBySessionId(Guid sessionId);

        Task<bool> SendMessage(Guid sessionId, ChatMessageDto messageDto);
        Task<List<ChatSessionDto>> GetChatSessionsByOwnerId(int ownerUserId);
    }
}