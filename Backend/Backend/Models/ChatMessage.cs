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

        public int ChatSessionId { get; set; }

        // Could be "owner" or "finder" or an actual numeric user ID
        public string SenderId { get; set; }

        public string MessageContent { get; set; }
        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        [ForeignKey("ChatSessionId")]
        public virtual ChatSession ChatSession { get; set; }
    }
}