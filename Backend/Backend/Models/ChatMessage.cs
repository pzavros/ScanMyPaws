using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ChatMessage
    {
        public DateTime? DateCreated { get; set; } = DateTime.Now;
        public DateTime? DateModified { get; set; }

        [Key]
        public int ChatMessageId { get; set; }

        public Guid ChatSessionId { get; set; }
        public string SenderId { get; set; }

        public string MessageContent { get; set; }
        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ChatSessionId")]
        public virtual ChatSession ChatSession { get; set; }
    }
}