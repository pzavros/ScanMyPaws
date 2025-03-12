using System;
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

        public async Task JoinChatSession(Guid chatSessionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatSessionId.ToString());
        }

        public async Task SendMessage(Guid chatSessionId, string senderId, string message)
        {
            var updatedSession = await _chatService.AddMessageToSessionAsync(chatSessionId, senderId, message);

            if (updatedSession != null)
            {
                await Clients.Group(chatSessionId.ToString())
                    .SendAsync("ReceiveMessage", updatedSession);
            }
        }
    }
}