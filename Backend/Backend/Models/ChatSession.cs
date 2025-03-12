using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ChatSession
    {
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateModified { get; set; } = DateTime.UtcNow;

        [Key]
        public Guid ChatSessionId { get; set; } = Guid.NewGuid();

        [Required]
        [ForeignKey("PetProfile")]
        public int PetID { get; set; }

        [Required]
        [ForeignKey("User")]
        public int OwnerUserID { get; set; }

        [Required]
        public string FinderEphemeralId { get; set; }

        public string FinderName { get; set; }
        public string FinderSurname { get; set; }
        public string FinderEmail { get; set; }

        public virtual List<ChatMessage> Messages { get; set; } = new();
    }
}