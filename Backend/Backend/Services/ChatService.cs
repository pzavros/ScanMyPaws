using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.DTOs;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Services
{
    public class ChatService : IChatService
    {
        private readonly ApplicationDbContext _context;

        public ChatService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ChatSessionDto> CreateChatSessionAsync(
            int petId, 
            int ownerUserId, 
            string finderEphemeralId,
            string finderName,
            string finderSurname,
            string finderEmail)
        {
            // Create a new chat session
            var chatSession = new ChatSession
            {
                PetID = petId,
                OwnerUserID = ownerUserId,
                FinderEphemeralId = finderEphemeralId,
                FinderName = finderName,
                FinderSurname = finderSurname,
                FinderEmail = finderEmail,
                DateCreated = DateTime.Now
            };

            _context.ChatSessions.Add(chatSession);
            await _context.SaveChangesAsync();

            // Return a DTO
            return new ChatSessionDto
            {
                ChatSessionId = chatSession.ChatSessionId,
                PetID = chatSession.PetID,
                OwnerUserID = chatSession.OwnerUserID,
                FinderEphemeralId = chatSession.FinderEphemeralId,
                FinderName = chatSession.FinderName,
                FinderSurname = chatSession.FinderSurname,
                FinderEmail = chatSession.FinderEmail,
                DateCreated = chatSession.DateCreated,
                DateModified = chatSession.DateModified,
                Messages = new List<ChatMessageDto>()
            };
        }

        public async Task<ChatSessionDto> GetChatSessionAsync(int chatSessionId)
        {
            var session = await _context.ChatSessions
                .Include(s => s.Messages)
                .FirstOrDefaultAsync(s => s.ChatSessionId == chatSessionId);

            if (session == null) return null;

            // Map to DTO
            return new ChatSessionDto
            {
                ChatSessionId = session.ChatSessionId,
                PetID = session.PetID,
                OwnerUserID = session.OwnerUserID,
                FinderEphemeralId = session.FinderEphemeralId,
                FinderName = session.FinderName,
                FinderSurname = session.FinderSurname,
                FinderEmail = session.FinderEmail,
                DateCreated = session.DateCreated,
                DateModified = session.DateModified,
                Messages = session.Messages.Select(m => new ChatMessageDto
                {
                    ChatMessageId = m.ChatMessageId,
                    ChatSessionId = m.ChatSessionId,
                    SenderId = m.SenderId,
                    MessageContent = m.MessageContent,
                    SentAt = m.SentAt
                }).ToList()
            };
        }

        public async Task<ChatSessionDto> AddMessageToSessionAsync(int chatSessionId, string senderId, string messageContent)
        {
            // Find the session
            var session = await _context.ChatSessions
                .FirstOrDefaultAsync(s => s.ChatSessionId == chatSessionId);

            if (session == null) return null;

            // Create a new message
            var newMessage = new ChatMessage
            {
                ChatSessionId = chatSessionId,
                SenderId = senderId,
                MessageContent = messageContent,
                SentAt = DateTime.UtcNow
            };

            _context.ChatMessages.Add(newMessage);
            session.DateModified = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            // Return updated session with messages
            return await GetChatSessionAsync(chatSessionId);
        }
    }
}
