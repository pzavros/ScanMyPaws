using System;

namespace Backend.DTOs
{
    public class ChatMessageDto
    {
        public int ChatMessageId { get; set; }
        public int ChatSessionId { get; set; }
        public string SenderId { get; set; }
        public string MessageContent { get; set; }
        public DateTime SentAt { get; set; }
    }
}