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

        private readonly INotificationService _notificationService;

        public ChatService(ApplicationDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
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
            if (ownerUserId == 0) 
            {
                throw new ArgumentException($"OwnerUserID cannot be 0. PetID: {petId} might not have a valid owner.");
            }   

            await _notificationService.SendNotificationAsync(new NotificationDto
            {
                UserID = ownerUserId,
                Title = "New Chat Started",
                Message = $"A person named {finderName} {finderSurname} has started a chat about your pet.",
                Type = "ChatStarted",
                ReferenceID = petId
            });
            
            var chatSession = new ChatSession
            {
                ChatSessionId = Guid.NewGuid(), 
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
        public async Task<ChatSessionDto> GetChatSessionAsync(Guid chatSessionId)
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
                    ChatMessageId = m.ChatMessageId,
                    ChatSessionId = m.ChatSessionId,
                    SenderId = m.SenderId,
                    MessageContent = m.MessageContent,
                    SentAt = m.SentAt
                }).ToList()
            };
        }

        /// <summary>
        /// Adds a message to the session and returns updated chat session
        /// </summary>
        public async Task<ChatSessionDto> AddMessageToSessionAsync(Guid chatSessionId, string senderId, string messageContent)
        {
            var session = await _context.ChatSessions
                .Include(s => s.Messages)
                .FirstOrDefaultAsync(s => s.ChatSessionId == chatSessionId);

            if (session == null) return null;

            var newMessage = new ChatMessage
            {
                ChatSessionId = chatSessionId,
                SenderId = senderId,
                MessageContent = messageContent,
                SentAt = DateTime.UtcNow
            };

            _context.ChatMessages.Add(newMessage);
            session.Messages.Add(newMessage);
            session.DateModified = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetChatSessionAsync(chatSessionId);
        }

        /// <summary>
        /// Fetches all messages for a given session
        /// </summary>
        public async Task<List<ChatMessageDto>> GetMessagesBySessionId(Guid sessionId)
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
                    SentAt = m.SentAt,
                    IsRead = m.IsRead
                })
                .ToListAsync();

            return messages;
        }

        /// <summary>
        /// Sends a message within an existing chat session
        /// </summary>
        public async Task<bool> SendMessage(Guid sessionId, ChatMessageDto messageDto)
        {
            var sessionExists = await _context.ChatSessions.AnyAsync(s => s.ChatSessionId == sessionId);
            if (!sessionExists) return false;

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
        public async Task<List<ChatSessionDto>> GetChatSessionsByOwnerId(int ownerUserId)
        {
            Console.WriteLine($"Querying chat sessions for ownerUserId: {ownerUserId}");

            var sessions = await _context.ChatSessions
                .Where(s => s.OwnerUserID == ownerUserId)
                .Include(s => s.Messages)
                .ToListAsync();

            Console.WriteLine($"Database returned {sessions.Count} sessions for ownerUserId: {ownerUserId}");

            return sessions.Select(s => new ChatSessionDto
            {
                ChatSessionId = s.ChatSessionId,
                PetID = s.PetID,
                OwnerUserID = s.OwnerUserID,
                FinderEphemeralId = s.FinderEphemeralId,
                FinderName = s.FinderName,
                FinderSurname = s.FinderSurname,
                FinderEmail = s.FinderEmail,
                DateCreated = s.DateCreated,
                DateModified = s.DateModified,
                Messages = s.Messages.Select(m => new ChatMessageDto
                {
                    ChatMessageId = m.ChatMessageId,
                    ChatSessionId = m.ChatSessionId,
                    SenderId = m.SenderId,
                    MessageContent = m.MessageContent,
                    SentAt = m.SentAt,
                    IsRead = m.IsRead
                }).ToList()
            }).ToList();
        }
        public async Task<bool> MarkMessagesAsRead(Guid chatSessionId, string userId)
        {
            var messages = await _context.ChatMessages
                .Where(m => m.ChatSessionId == chatSessionId && !m.IsRead && m.SenderId != userId)
                .ToListAsync();

            if (!messages.Any())
            {
                return false;
            }

            foreach (var message in messages)
            {
                message.IsRead = true;
            }

            await _context.SaveChangesAsync();
            return true; 
        }
        public async Task<bool> DeleteChatSessionAsync(Guid sessionId)
        {
            // Load the session, including its messages
            var session = await _context.ChatSessions
                .Include(s => s.Messages)
                .FirstOrDefaultAsync(s => s.ChatSessionId == sessionId);

            if (session == null) 
                return false; // session not found

            // Remove all messages
            _context.ChatMessages.RemoveRange(session.Messages);

            // Remove the session itself
            _context.ChatSessions.Remove(session);

            await _context.SaveChangesAsync();

            return true;
        }


    }
}
