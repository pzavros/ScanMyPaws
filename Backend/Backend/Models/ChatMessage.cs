using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ChatMessage
    {
        [Key]
        public int ChatMessageId { get; set; }

        [ForeignKey("ChatSession")]
        public Guid ChatSessionId { get; set; }

        public string SenderId { get; set; }

        public string MessageContent { get; set; }

        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        public bool IsRead { get; set; } = false;
    }
}