using System.Threading.Tasks;
using Backend.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;

        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }

        public async Task JoinChatSession(int chatSessionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatSessionId.ToString());
        }

        public async Task SendMessage(int chatSessionId, string senderId, string message)
        {
            // Store in DB
            var updatedSession = await _chatService.AddMessageToSessionAsync(chatSessionId, senderId, message);

            // Broadcast to everyone in the session’s group
            if (updatedSession != null)
            {
                // Usually you'd broadcast only the new message,
                // but let's keep it simple and broadcast the entire updated session
                await Clients.Group(chatSessionId.ToString())
                    .SendAsync("ReceiveMessage", updatedSession);
            }
        }
    }
}