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

        /// <summary>
        /// Creates a new chat session
        /// </summary>
        public async Task<ChatSessionDto> CreateChatSessionAsync(
            int petId, 
            int ownerUserId, 
            string finderEphemeralId,
            string finderName,
            string finderSurname,
            string finderEmail)
        {
            var chatSession = new ChatSession
            {
                PetID = petId,
                OwnerUserID = ownerUserId,
                FinderEphemeralId = finderEphemeralId,
                FinderName = finderName,
                FinderSurname = finderSurname,
                FinderEmail = finderEmail,
                DateCreated = DateTime.UtcNow,
                DateModified = DateTime.UtcNow
            };

            _context.ChatSessions.Add(chatSession);
            await _context.SaveChangesAsync();

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

        /// <summary>
        /// Retrieves an existing chat session
        /// </summary>
        public async Task<ChatSessionDto> GetChatSessionAsync(int chatSessionId)
        {
            var session = await _context.ChatSessions
                .Include(s => s.Messages)
                .FirstOrDefaultAsync(s => s.ChatSessionId == chatSessionId);

            if (session == null) return null;

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
                    ChatMessageId = m.ChatMessageId, // Ensure your model has this field
                    ChatSessionId = m.ChatSessionId,
                    SenderId = m.SenderId,
                    MessageContent = m.MessageContent, // Ensure consistency with your model
                    SentAt = m.SentAt
                }).ToList()
            };
        }
        public async Task<ChatSessionDto> AddMessageToSessionAsync(int chatSessionId, string senderId, string messageContent)
        {
            // Find the chat session
            var session = await _context.ChatSessions
                .Include(s => s.Messages) // Ensure messages are loaded
                .FirstOrDefaultAsync(s => s.ChatSessionId == chatSessionId);

            if (session == null)
            {
                return null; // Chat session does not exist
            }

            // Create and add the new message
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

            // Return the updated chat session with messages
            return await GetChatSessionAsync(chatSessionId);
        }


        /// <summary>
        /// Fetches all messages for a given session
        /// </summary>
        public async Task<List<ChatMessageDto>> GetMessagesBySessionId(int sessionId)
        {
            var messages = await _context.ChatMessages
                .Where(m => m.ChatSessionId == sessionId)
                .OrderBy(m => m.SentAt)
                .Select(m => new ChatMessageDto
                {
                    ChatMessageId = m.ChatMessageId,
                    ChatSessionId = m.ChatSessionId,
                    SenderId = m.SenderId,
                    MessageContent = m.MessageContent,
                    SentAt = m.SentAt
                })
                .ToListAsync();

            return messages;
        }

        /// <summary>
        /// Sends a message within an existing chat session
        /// </summary>
        public async Task<bool> SendMessage(int sessionId, ChatMessageDto messageDto)
        {
            var sessionExists = await _context.ChatSessions.AnyAsync(s => s.ChatSessionId == sessionId);
            if (!sessionExists)
            {
                return false; // Chat session doesn't exist
            }

            var message = new ChatMessage
            {
                ChatSessionId = sessionId,
                SenderId = messageDto.SenderId,
                MessageContent = messageDto.MessageContent,
                SentAt = DateTime.UtcNow
            };

            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
