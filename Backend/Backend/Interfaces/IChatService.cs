using System.Threading.Tasks;
using Backend.DTOs;

namespace Backend.Interfaces
{
    public interface IChatService
    {
        // Creates a new chat session for a given pet, owner, and finder data
        Task<ChatSessionDto> CreateChatSessionAsync(
            int petId,
            int ownerUserId,
            string finderEphemeralId,
            string finderName,
            string finderSurname,
            string finderEmail
        );

        // Loads a chat session by ID (including messages)
        Task<ChatSessionDto> GetChatSessionAsync(int chatSessionId);

        // Adds a message to the session
        Task<ChatSessionDto> AddMessageToSessionAsync(int chatSessionId, string senderId, string messageContent);
    }
}